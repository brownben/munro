<!--
  Result Transfer

  Change the competitor the result is credited to
-->

<template>
  <Layout title="Manual Points">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Manual Points"
      description
    />

    <form class="col-span-2" @submit.prevent="addResult">
      <DropdownInput
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
      />
      <DropdownInput
        v-model="choices.event"
        :list="
          eventsInLeague.map((event) => ({
            value: event.id,
            text: `${event.name} (${event.date})`,
          }))
        "
        :option-text-different-to-value="true"
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
        v-model="choices.competitor"
        :list="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :option-text-different-to-value="true"
        :include-blank="true"
        label="Competitor:"
        class="mt-4"
      />
      <NumberInput
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
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import NumberInput from '/@/components/inputs/NumberInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
    NumberInput,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '../../scripts/typeHelpers'
import $store from '../../store/index'
import $router from '../../router/index'
const { currentRoute: $route } = $router

import { getLeagues } from '../../api/leagues'
import { getEvents } from '../../api/events'
import { getCompetitors } from '../../api/competitors'
import { createManualResult } from '../../api/results'

const leagues = ref<League[]>([])
const events = ref<Event[]>([])
const competitors = ref<Competitor[]>([])
const choices = ref({
  league: '',
  event: '',
  course: '',
  competitor: '',
  points: 0,
})

onMounted(async () => {
  leagues.value = await getLeagues()
  events.value = await getEvents()
  competitors.value = await getCompetitors()
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
    $store.dispatch(
      'createMessage',
      'Please Ensure Event, Course  and Competitor Fields are not Blank'
    )
    return false
  }
}

const addResult = () =>
  createManualResult({
    competitor: choices.value.competitor,
    event: choices.value.event,
    points: choices.value.points,
  })
    .then(() => $router.push(`/leagues/${choices.value.league}/competitors`))
    .catch(() => false)

export {
  choices,
  leagues,
  courses,
  eventsInLeague,
  competitorsInLeague,
  competitorToText,
  addResult,
}
</script>
