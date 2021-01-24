<template>
  <Layout title="Transfer Result">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Transfer Results"
      description
    />

    <form class="col-span-2" @submit.prevent="transferResult">
      <DropdownInput
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
      />
      <DropdownInput
        v-model="choices.event"
        :listWithDifferentValue="
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
        :listWithDifferentValue="
          resultsInEvent?.map((result) => ({
            text: `${result.position} - ${elapsedTime(result.time)} (${
              result.name
            })`,
            value: result.id.toString(),
          })) ?? []
        "
        :include-blank="true"
        label="Result:"
        class="mt-4"
      />
      <DropdownInput
        v-model="choices.competitor"
        :listWithDifferentValue="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor:"
        class="mt-4"
      />

      <button class="mt-8 button-lg">Transfer Result</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Layout from '../../components/Layout.vue'
import DropdownInput from '../../components/inputs/DropdownInput.vue'

import { getLeagues } from '../../api/leagues'
import { getEvents } from '../../api/events'
import { getCompetitors } from '../../api/competitors'
import {
  getResults,
  transferResult as apiTransferResult,
} from '../../api/results'

import { sortEventResults, SortablePropertiesEvent } from '../../scripts/sort'
import { elapsedTime } from '../../scripts/time'

const store = useStore()
const router = useRouter()
const route = useRoute()

const leagues = ref<League[]>([])
const events = ref<Event[]>([])
const competitors = ref<Competitor[]>([])
const results = ref<EventResult[]>([])
const choices = ref({
  league: '',
  event: '',
  course: '',
  competitor: '',
  result: '',
})

onMounted(async () => {
  leagues.value = (await getLeagues()) ?? []
  events.value = (await getEvents()) ?? []
  results.value = (await getResults()) ?? []
  competitors.value = (await getCompetitors()) ?? []
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
const resultsInEvent = computed(() =>
  results.value
    .filter(
      (result) =>
        result.event === choices.value.event &&
        result.course === choices.value.course
    )
    .sort(
      sortEventResults({
        ascending: false,
        by: SortablePropertiesEvent.position,
      })
    )
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
    store.dispatch(
      'createMessage',
      'Please Ensure Result and Competitor Fields are not Blank'
    )
    return false
  }
}

const transferResult = () =>
  apiTransferResult({
    competitor: choices.value.competitor,
    result: choices.value.result,
  })
    .then(() => router.push(`/results/${choices.value.result}`))
    .catch(() => false)
</script>
