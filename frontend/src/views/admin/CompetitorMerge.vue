<template>
  <Layout title="Merge Competitors" thin>
    <Meta
      title="Munro - Merge Competitors"
      description=""
      :block-robots="true"
    />
    <form class="col-span-2" @submit.prevent="mergeCompetitors">
      <InputDropdown
        v-model="choices.league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
        url-parameter="league"
      />
      <InputDropdown
        v-model="choices.course"
        :list="courses"
        :include-blank="true"
        label="Course"
        class="mt-4"
        url-parameter="course"
      />
      <InputDropdown
        v-model="choices.competitorKeep"
        :list-with-different-value="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor to Keep:"
        class="mt-4"
        url-parameter="competitorToKeep"
        :validator="RequiredField('a competitor to keep', true)"
      />
      <InputDropdown
        v-model="choices.competitorMerge"
        :list-with-different-value="
          competitorsInLeague.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        :include-blank="true"
        label="Competitor to be Merged:"
        class="mt-4"
        :validator="RequiredField('a competitor to be merged', true)"
      />
      <button class="mt-8 button-lg">Merge Competitors</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../../components/Layout.vue'
import InputDropdown from '../../components/InputDropdown.vue'

import { RequiredField } from '../../scripts/inputValidation'

import { useMessages } from '../../store/messages'

import { useLeagues } from '../../api/leagues'
import {
  useCompetitors,
  mergeCompetitors as apiMergeCompetitors,
} from '../../api/competitors'

const messages = useMessages()
const router = useRouter()

const [leagues] = useLeagues()
const [competitors] = useCompetitors()

const choices = ref({
  league: '',
  competitorMerge: '',
  competitorKeep: '',
  course: '',
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
    messages.create('Please Ensure Competitors Are Not The Same')
    return false
  }
}

const mergeCompetitors = () => {
  if (validateForm())
    apiMergeCompetitors({
      competitorMerge: Number(choices.value.competitorMerge),
      competitorKeep: Number(choices.value.competitorKeep),
    })
      .then(() => router.push(`/competitors/${choices.value.competitorKeep}`))
      .catch(() => false)
}
</script>
