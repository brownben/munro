<template>
  <Layout title="Transfer Result">
    <Meta
      title="Munro - Transfer Results"
      description=""
      :block-robots="true"
    />
    <form class="col-span-2" @submit.prevent="transferResult">
      <DropdownInput
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
        url-parameter="league"
      />
      <DropdownInput
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
      />
      <DropdownInput
        v-model="choices.course"
        :list="courses"
        :include-blank="true"
        label="Course"
        class="mt-4"
      />
      <DropdownInput
        v-model="choices.result"
        :list-with-different-value="resultsInEvent"
        :include-blank="true"
        label="Result:"
        class="mt-4"
        :validator="RequiredField('a result', true)"
      />
      <DropdownInput
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

      <button class="mt-8 button-lg">Transfer Result</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../../components/Layout.vue'
import DropdownInput from '../../components/InputDropdown.vue'

import { useLeagues } from '../../api/leagues'
import { useEvents } from '../../api/events'
import { useCompetitors } from '../../api/competitors'
import {
  useResults,
  transferResult as apiTransferResult,
} from '../../api/results'

import { useMessages } from '../../store/messages'

import { sortEventResults, SortablePropertiesEvent } from '../../scripts/sort'
import { eventResultWithAgeGender as resultWithAgeGender } from '../../scripts/ageClassSplit'
import { elapsedTime } from '../../scripts/time'
import { RequiredField } from '../../scripts/inputValidation'

const router = useRouter()
const messages = useMessages()

const [leagues] = useLeagues()
const [events] = useEvents()
const [competitors] = useCompetitors()
const [results] = useResults()
const choices = ref({
  league: '',
  event: '',
  course: '',
  competitor: '',
  result: '',
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
    ?.sort((a, b) => (a.name > b.name ? 1 : -1))
)
const resultsInEvent = computed(
  () =>
    results.value
      .filter(
        (result: EventResult) =>
          result.event === choices.value.event &&
          result.course === choices.value.course
      )
      .map(resultWithAgeGender)
      .sort(
        sortEventResults({
          ascending: false,
          by: SortablePropertiesEvent.position,
        })
      )
      .map((result: EventResultWithAgeGender) => ({
        text: `${result.position} - ${elapsedTime(result.time)} (${
          result.name
        })`,
        value: result.id.toString(),
      })) ?? []
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
    choices.value.result !== '' &&
    choices.value.competitor !== ''
  )
    return true
  else {
    messages.create('Please Ensure Result and Competitor Fields are not Blank')
    return false
  }
}

const transferResult = () => {
  if (validateForm())
    apiTransferResult({
      competitor: Number(choices.value.competitor),
      result: Number(choices.value.result),
    })
      .then(() => router.push(`/competitors/${choices.value.competitor}`))
      .catch(() => false)
}
</script>
