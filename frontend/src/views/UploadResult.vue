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
        :list-with-different-value="
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
        :validators="[RequiredField('your name')]"
      />
      <InputText
        v-model.trim="result.time"
        label="Your Time: (MM:SS)"
        class="mt-4"
        :validators="[IsValidTime()]"
      />

      <!-- Only show upload once all fields have been filled -->
      <button class="mt-8 button-lg">Submit Result</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'
import InputDropdown from '../components/InputDropdown.vue'

import { RequiredField, IsValidTime } from '../scripts/inputValidation'

import { useLeagues } from '../api/leagues'
import { useEvents } from '../api/events'
import { uploadResult as apiUploadResult } from '../api/upload'

const router = useRouter()

const [leagues] = useLeagues()
const [rawEvents] = useEvents()
const events = computed(() =>
  rawEvents.value.filter((event) => event.userSubmittedResults)
)
const result = ref<UploadResult>({
  name: '',
  eventId: '',
  course: '',
  time: '',
})

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
