<template>
  <Layout title="Manual Points">
    <Meta title="Munro - Manual Points" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="addResult">
      <InputDropdown
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
        url-parameter="league"
      />
      <InputDropdown
        v-model="choices.event"
        :list-with-different-value="
          eventsInLeague.map((event) => ({
            value: event.id,
            text: `${event.name} (${event.date})`,
          }))
        "
        :include-blank="true"
        label="Event:"
        class="mt-4"
        :validator="RequiredField('an event', true)"
      />
      <InputDropdown
        v-model="choices.course"
        :list="courses"
        :include-blank="true"
        label="Course"
        class="mt-4"
        :validator="RequiredField('a course', true)"
      />
      <InputDropdown
        v-model="choices.competitor"
        :list-with-different-value="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor:"
        class="mt-4"
        :validator="RequiredField('a competitor', true)"
      />
      <InputNumber
        v-model.number="choices.points"
        label="Points:"
        class="mt-4"
        :min="0"
        :max="10000"
      />

      <button class="mt-8 button-lg">Add Result</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../../components/Layout.vue'
import InputDropdown from '../../components/InputDropdown.vue'
import InputNumber from '../../components/InputNumber.vue'

import { RequiredField } from '../../scripts/inputValidation'

import { useMessages } from '../../store/messages'

import { useLeagues } from '../../api/leagues'
import { useEvents } from '../../api/events'
import { useCompetitors } from '../../api/competitors'
import { createManualResult } from '../../api/results'

const router = useRouter()
const messages = useMessages()

const [leagues] = useLeagues()
const [events] = useEvents()
const [competitors] = useCompetitors()
const choices = ref({
  league: '',
  event: '',
  course: '',
  competitor: '',
  points: 0,
})

const courses = computed(
  () =>
    leagues.value?.find((league) => league.name === choices.value.league)
      ?.courses ?? []
)
const eventsInLeague = computed(() =>
  events.value?.filter((event) => event.league === choices.value.league)
)
const competitorsInLeague = computed(() =>
  competitors.value
    ?.filter(
      (competitor) =>
        competitor.league === choices.value.league &&
        competitor.course === choices.value.course
    )
    ?.sort((a, b) => (a.name > b.name ? -1 : 1))
)

const competitorToText = (competitor: Competitor) => {
  if (competitor.club && competitor.ageClass)
    return `${competitor.name} (${competitor.ageClass}, ${competitor.club}) [${competitor.id}]`
  else if (competitor.club)
    return `${competitor.name} (${competitor.club}) [${competitor.id}]`
  else if (competitor.ageClass)
    return `${competitor.name} (${competitor.ageClass}) [${competitor.id}]`
  else return `${competitor.name} [${competitor.id}]`
}

const validateForm = () => {
  if (
    choices.value.event !== '' &&
    choices.value.course !== '' &&
    choices.value.competitor !== ''
  )
    return true
  else {
    messages.create(
      'Please Ensure Event, Course  and Competitor Fields are not Blank'
    )
    return false
  }
}

const addResult = () => {
  if (validateForm())
    createManualResult({
      competitor: Number(choices.value.competitor),
      event: choices.value.event,
      points: choices.value.points,
    })
      .then(() => router.push(`/leagues/${choices.value.league}/competitors`))
      .catch(() => false)
}
</script>
