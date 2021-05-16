<template>
  <Layout title="Import MapRun Results" thin>
    <Meta
      title="Munro - Import MapRun Results"
      description="Import results from MapRun to to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/upload/maprun"
      :block-robots="false"
    />
    <form class="col-span-2" @submit.prevent="uploadFile">
      <InputText
        v-model.lazy="uploadConfig.eventId"
        label="Event ID:"
        :validators="[RequiredField('an event id')]"
      />

      <p v-if="event?.name" class="my-4">
        <b class="mr-2 text-main-800">Event Name:</b>
        {{ event.name }}
      </p>

      <InputText
        v-model.trim="uploadConfig.uploadKey"
        label="Upload Key:"
        class="mt-4"
        :validators="[RequiredField('an upload key')]"
      />
      <InputText
        v-model.trim="maprunId"
        label="MapRun Event Id:"
        class="mt-4"
        :validators="[RequiredField('a MapRun event id')]"
      />

      <InputDropdown
        v-model="uploadConfig.course"
        label="Course:"
        :list="courses"
        class="mt-4"
        :validator="RequiredField('a course')"
      />

      <button class="mt-6 button-lg">Import Data</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'
import InputDropdown from '../components/InputDropdown.vue'

import { RequiredField } from '../scripts/inputValidation'

import { useMessages } from '../store/messages'

import { getText } from '../api/requests'
import { uploadSimple } from '../api/upload'
import { useEvent } from '../api/events'
import { useLeague } from '../api/leagues'

const messages = useMessages()
const router = useRouter()

const maprunId = ref('')
const uploadConfig = ref<UploadSimple>({
  eventId: '',
  uploadKey: '',
  file: '',
  course: '',
})
const eventId = computed(() => uploadConfig.value.eventId)
const [event] = await useEvent(eventId)
const [league] = await useLeague(computed(() => event.value?.league ?? ''))
const courses = computed(() => league?.value?.courses ?? [])

const maprunHTMLtoCSV = (html?: string): string =>
  html
    ?.replace(/\n/g, '')
    .replace(/<\/.*?>/g, '')
    .replace(/'>Track/g, '')
    .replace(/<a href='reitti.cgi.*?pID=/g, '')
    .replace(/<a.*?>/g, '')
    .replace(/\(Rev[0-9]+\)/g, '')
    .split('<tr>')
    .filter((row) => !row.includes('DOCTYPE') && !row.includes('<th'))
    .map((row) =>
      row
        .split(/<td.*?>/g)
        .slice(2, 6)
        .map((string) => string.trim())
        .join()
    )
    .join('\n') ?? ''

const getMaprunData = () =>
  getText({
    apiLocation: `https://www.p.fne.com.au/rg/cgi-bin/SelectResultFileForSplitsBrowserFiltered.cgi?act=fileToSplitsBrowser&eventName=CombinedResults_${maprunId.value}.csv`,
    customErrorMessage: 'Problem Fetching Results From MapRun',
    customErrorHandler: true,
  })
    .then(maprunHTMLtoCSV)
    .then((file: string) => {
      if (!file || file.split('\n').length < 1) {
        messages.create('Error: No MapRun Event Found With That Id')
        throw new Error()
      } else {
        uploadConfig.value.file = file
        messages.create('Upload Data Sent')
      }
    })

const isValid = computed(
  () =>
    uploadConfig.value.eventId &&
    uploadConfig.value.uploadKey &&
    maprunId.value &&
    uploadConfig.value.course
)

const uploadFile = () => {
  if (isValid.value)
    return getMaprunData()
      .then(() => uploadSimple(uploadConfig.value))
      .then(() => router.push(`/events/${eventId.value}/results`))
      .catch(() => false)
}
</script>
