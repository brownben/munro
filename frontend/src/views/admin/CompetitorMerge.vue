<template>
  <Layout title="Merge Competitors">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Merge Competitors"
      description
    />

    <form class="col-span-2" @submit.prevent="mergeCompetitors">
      <DropdownInput
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
      />
      <DropdownInput
        v-model="choices.course"
        :list="courses"
        :include-blank="true"
        label="Course"
        class="mt-4"
      />
      <DropdownInput
        v-model="choices.competitorKeep"
        :listWithDifferentValue="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor to Keep:"
        class="mt-4"
      />
      <DropdownInput
        v-model="choices.competitorMerge"
        :listWithDifferentValue="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor to be Merged:"
        class="mt-4"
      />
      <button class="mt-8 button-lg">Merge Competitors</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Layout from '../../components/Layout.vue'
import DropdownInput from '../../components/inputs/DropdownInput.vue'

import { getLeagues } from '../../api/leagues'
import {
  getCompetitors,
  mergeCompetitors as apiMergeCompetitors,
} from '../../api/competitors'

const store = useStore()
const router = useRouter()

const leagues = ref<League[]>([])
const competitors = ref<Competitor[]>([])

const choices = ref({
  league: '',
  competitorMerge: '',
  competitorKeep: '',
  course: '',
})

onMounted(async () => {
  leagues.value = (await getLeagues()) ?? []
  competitors.value = (await getCompetitors()) ?? []
})

const courses = computed(
  () =>
    leagues.value?.find((league) => league.name === choices.value.league)
      ?.courses ?? []
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
    choices.value.competitorMerge !== choices.value.competitorKeep &&
    choices.value.competitorMerge !== '' &&
    choices.value.competitorKeep !== ''
  )
    return true
  else {
    store.dispatch(
      'createMessage',
      'Please Ensure Competitors Are Not The Same'
    )
    return false
  }
}

const mergeCompetitors = () =>
  apiMergeCompetitors({
    competitorMerge: Number(choices.value.competitorMerge),
    competitorKeep: Number(choices.value.competitorKeep),
  })
    .then(() => router.push(`/competitors/${choices.value.competitorKeep}`))
    .catch(() => false)
</script>
