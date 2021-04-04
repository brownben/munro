<template>
  <Layout title="Submit Result">
    <Meta
      title="Munro - Submit Result"
      description="Manually Submit a Result to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/upload/result"
      :block-robots="false"
    />
    <form class="col-span-2" @submit.prevent="uploadResult">
      <InputDropdown
        v-model="result.eventId"
        label="Event:"
        :listWithDifferentValue="
          events.map((event) => ({
            text: `${event.league} - ${event.name}`,
            value: event.id,
          }))
        "
        :validator="RequiredField('an event', true)"
      />
      <InputDropdown
        v-model="result.course"
        label="Your Course:"
        :list="courses"
        class="mt-4"
        :validator="RequiredField('a course', true)"
      />
      <InputText
        v-model.trim="result.name"
        label="Your Name:"
        class="mt-4"
        :validator="RequiredField('your name')"
      />
      <InputText
        v-model.trim="result.time"
        label="Your Time: (MM:SS)"
        class="mt-4"
        :validator="IsValidTime()"
      />

      <!-- Only show upload once all fields have been filled -->
      <button class="mt-8 button-lg">Submit Result</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'
import InputDropdown from '../components/InputDropdown.vue'

import { RequiredField, IsValidTime } from '../scripts/inputValidation'

import { getLeagues } from '../api/leagues'
import { getEvents } from '../api/events'
import { uploadResult as apiUploadResult } from '../api/upload'

const store = useStore()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const leagues = ref<League[]>([])
const events = ref<LeagueEvent[]>([])
const result = ref<UploadResult>({
  name: '',
  eventId: '',
  course: '',
  time: '',
})

const refreshDetails = async () => {
  loading.value = true
  await Promise.all([
    getLeagues().then((data) => {
      leagues.value = data ?? []
    }),
    getEvents().then((data) => {
      events.value =
        data?.filter((event: LeagueEvent) => event.userSubmittedResults) ?? []

      if (events.value.length < 1)
        store.dispatch(
          'createMessage',
          'Sorry, No Events Found to Submit Results'
        )
    }),
  ])
  loading.value = false
}

watch(route, refreshDetails, { immediate: true })

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
    .then(() => router.push(`/events/${result.value.eventId}/results`))
    .catch(() => false)
</script>
