<template>
  <Layout title="Import MapRun Results">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Import MapRun Results"
      description="Import results from MapRun to to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/maprun"
    />

    <div class="col-span-2">
      <TextInput v-model.lazy="uploadConfig.eventId" label="Event ID:" />

      <p v-if="event?.name" class="my-4">
        <b class="mr-2 text-main-800">Event Name:</b>
        {{ event.name }}
      </p>

      <TextInput
        v-model.trim="uploadConfig.uploadKey"
        label="Upload Key:"
        class="mt-4"
      />
      <TextInput
        v-model.trim="maprunId"
        label="MapRun Event Id:"
        class="mt-4"
      />

      <DropdownInput
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
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import TextInput from '/@/components/inputs/TextInput.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'

export default {
  components: {
    Layout,
    TextInput,
    DropdownInput,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '../scripts/typeHelpers'

import $store from '../store/index'
import $router from '../router/index'
const { currentRoute: $route } = $router

import { getText } from '../api/requests'
import { UploadStream, uploadStream } from '../api/upload'
import { Event, getEvent } from '../api/events'
import { League, getLeague } from '../api/leagues'

const maprunId = ref('')
const uploadConfig = ref<UploadStream>({
  eventId: '',
  uploadKey: '',
  file: '',
  course: '',
})
const event = ref<Event | null>(null)
const courses = ref<string[]>([])
const eventId = computed(() => uploadConfig.value.eventId)

const getCourses = async () => {
  event.value = await getEvent(uploadConfig.value.eventId)
  const league: League = await getLeague(event.value?.league ?? '')

  courses.value = league?.courses ?? []
}
watch(eventId, getCourses, { immediate: true })

const maprunHTMLtoCSV = (html: string): string =>
  html
    .replace(/\n/g, '')
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
    .join('\n')
const getMaprunData = () =>
  getText({
    apiLocation: `https://www.p.fne.com.au/rg/cgi-bin/SelectResultFileForSplitsBrowserFiltered.cgi?act=fileToSplitsBrowser&eventName=CombinedResults_${maprunId.value}.csv`,
    customErrorMessage: 'Problem Fetching Results From MapRun',
    customErrorHandler: true,
  })
    .then(maprunHTMLtoCSV)
    .then((file: string) => {
      if (!file || file.split('\n').length < 1) {
        $store.dispatch(
          'createMessage',
          'Error: No MapRun Event Found With That Id'
        )
        throw new Error()
      } else $store.dispatch('createMessage', 'Upload Data Sent')
    })
const uploadFile = () =>
  getMaprunData()
    .then((file) => uploadStream(uploadConfig.value))
    .then(() => $router.push(`/events/${this.eventId}/results`))
    .catch(() => false)

export { maprunId, uploadConfig, event, courses, uploadFile }
</script>
