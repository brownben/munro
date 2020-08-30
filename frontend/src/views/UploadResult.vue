<template>
  <Layout title="Submit Result">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Submit Result"
      description="Manually Submit a Result to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/result"
    />

    <div class="col-span-2">
      <DropdownInput
        v-model="result.eventId"
        label="Event:"
        :option-text-different-to-value="true"
        :list="
          events.map((event) => ({
            text: `${event.league} - ${event.name}`,
            value: event.id,
          }))
        "
      />
      <DropdownInput
        v-model="result.course"
        label="Your Course:"
        :list="courses"
        class="mt-4"
      />
      <TextInput v-model.trim="result.name" label="Your Name:" class="mt-4" />
      <TextInput
        v-model.trim="result.time"
        label="Your Time: (HH:MM:SS)"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="result.eventId && result.course && result.name && result.time"
        class="mt-8 button-lg"
        @click="uploadResult"
      >
        Submit Result
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

import { League, getLeagues } from '../api/leagues'
import { Event, getEvents } from '../api/events'
import { UploadResult, uploadResult as apiUploadResult } from '../api/upload'

const loading = ref(true)
const leagues = ref<League[]>([])
const events = ref<Event[]>([])
const result = ref<UploadResult>({
  name: '',
  eventId: '',
  course: '',
  time: '',
})

const refreshDetails = async () => {
  const routeParamsName = toSingleString($route.value.params.name)
  loading.value = true
  await Promise.all([
    getLeagues().then((data) => {
      leagues.value = data
    }),
    getEvents().then((data) => {
      events.value = data.filter((event) => event.userSubmittedResults)

      if (events.value.length < 1)
        $store.dispatch(
          'createMessage',
          'Sorry, No Events Found to Submit Results'
        )
    }),
  ])
  loading.value = false
}

watch($route, refreshDetails, { immediate: true })

const courses = computed(() => {
  const eventSelected = events.value.find(
    (event) => event.id === result.value.eventId
  )
  const leagueOfEvent = leagues.value.find(
    (league) => league?.name === eventSelected?.league
  )

  return leagueOfEvent?.courses
})

const uploadResult = () =>
  apiUploadResult(result.value)
    .then(() => $router.push(`/events/${result.value.eventId}/results`))
    .catch(() => false)

export { loading, events, courses, result, uploadResult, refreshDetails }
</script>
