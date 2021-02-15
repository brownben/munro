<template>
  <Layout title="Import MapRun Results">
    <Meta
      title="Munro - Import MapRun Results"
      description="Import results from MapRun to to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/maprun"
      :block-robots="false"
    />
    <div class="col-span-2">
      <InputText v-model.lazy="uploadConfig.eventId" label="Event ID:" />

      <p v-if="event?.name" class="my-4">
        <b class="mr-2 text-main-800">Event Name:</b>
        {{ event.name }}
      </p>

      <InputText
        v-model.trim="uploadConfig.uploadKey"
        label="Upload Key:"
        class="mt-4"
      />
      <InputText
        v-model.trim="maprunId"
        label="MapRun Event Id:"
        class="mt-4"
      />

      <InputDropdown
        v-model="uploadConfig.course"
        label="Course:"
        :list="courses"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="
          uploadConfig.eventId && uploadConfig.uploadKey && uploadConfig.course
        "
        class="mt-6 button-lg"
        @click="uploadFile"
      >
        Import Data
      </button>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'
import InputDropdown from '../components/InputDropdown.vue'

import { getText } from '../api/requests'
import { uploadSimple } from '../api/upload'
import { getEvent } from '../api/events'
import { getLeague } from '../api/leagues'

const store = useStore()
const router = useRouter()

const maprunId = ref('')
const uploadConfig = ref<UploadSimple>({
  eventId: '',
  uploadKey: '',
  file: '',
  course: '',
})
const event = ref<LeagueEvent | null>(null)
const courses = ref<string[]>([])
const eventId = computed(() => uploadConfig.value.eventId)

const getCourses = async () => {
  event.value = await getEvent(uploadConfig.value.eventId)
  const league: League | null = await getLeague(event.value?.league ?? '')

  courses.value = league?.courses ?? []
}

watch(eventId, getCourses, { immediate: true })

const maprunHTMLtoCSV = (html: string | null): string =>
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
        store.dispatch(
          'createMessage',
          'Error: No MapRun Event Found With That Id'
        )
        throw new Error()
      } else {
        uploadConfig.value.file = file
        store.dispatch('createMessage', 'Upload Data Sent')
      }
    })

const uploadFile = () =>
  getMaprunData()
    .then(() => uploadSimple(uploadConfig.value))
    .then(() => router.push(`/events/${eventId.value}/results`))
    .catch(() => false)
</script>
