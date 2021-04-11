<template>
  <Layout
    :title="title"
    :not-found="!loading && !league?.name && $route.path.includes('/edit')"
  >
    <Meta :title="`Munro - ${title}`" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="submit">
      <InputText
        v-model.trim="league.name"
        label="Name:"
        :validators="[RequiredField('a name'), IsValidURLParameter('a name')]"
      />
      <InputNumber
        v-model.number="league.year"
        label="Year:"
        :max="2050"
        class="mt-4"
      />
      <InputText
        v-model.trim="league.description"
        label="Description:"
        class="mt-4"
      />
      <InputText
        v-model.trim="league.website"
        label="Website: (URL)"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="league.coordinator"
        label="Coordinator:"
        class="mt-4"
      />
      <InputDropdown
        v-model="league.scoringMethod"
        :listWithDifferentValue="scoringMethodOptions"
        :include-blank="false"
        label="Scoring Method:"
        class="mt-4"
        :validator="RequiredField('a Scoring Method', true)"
      />
      <InputDropdown
        v-model="league.leagueScoring"
        :listWithDifferentValue="[
          { value: 'course', text: 'Per Course' },
          { value: 'overall', text: 'Overall' },
          { value: 'ageClass', text: 'Age Class' },
        ]"
        :include-blank="false"
        label="League Results:"
        class="mt-4"
      />
      <InputText
        v-model.trim="league.clubRestriction"
        label="Only Include Results from Club:"
        class="mt-4"
      />
      <InputNumber
        v-model.number="league.numberOfCountingEvents"
        :min="1"
        label="Number of Events to Count:"
        class="mt-4"
      />
      <InputText
        v-model.trim="league.courses"
        label="Courses: (Comma Separated)"
        class="mt-4"
      />
      <InputDropdown
        v-model="league.subLeagueOf"
        :list="leaguesSuitableForSubLeague"
        :include-blank="true"
        label="Sub League Of:"
        class="mt-4"
      />
      <InputTextarea
        v-model.trim="league.moreInformation"
        label="More Information:"
        class="mt-4"
      />
      <InputTextarea
        v-model="league.additionalSettings"
        label="Additional Settings: (Advanced Use Only)"
        class="mt-6 text-left"
        :validators="[IsValidJSON('additional settings')]"
      />
      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update League
      </button>
      <button v-else class="mt-8 button-lg">Create League</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Layout from '../../components/Layout.vue'
import InputDropdown from '../../components/InputDropdown.vue'
import InputText from '../../components/InputText.vue'
import InputTextarea from '../../components/InputTextarea.vue'
import InputNumber from '../../components/InputNumber.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import {
  RequiredField,
  IsValidURLParameter,
  IsValidJSON,
} from '../../scripts/inputValidation'

import { useAuthentication } from '../../store/authentication'
import { useMessages } from '../../store/messages'

import {
  useLeagues,
  createLeague as apiCreateLeague,
  updateLeague as apiUpdateLeague,
  useLeague,
} from '../../api/leagues'

const router = useRouter()
const route = useRoute()
const messages = useMessages()
const auth = useAuthentication()

const routeParamsName = computed(() => toSingleString(route.params.name))
const [leagues] = useLeagues()
const [leagueRaw, loading] = useLeague(routeParamsName)
const league = ref<LeagueForm>({
  courses: '',
  coordinator: '',
  description: '',
  dynamicEventResults: true,
  moreInformation: '',
  name: '',
  numberOfCountingEvents: 1,
  scoringMethod: '',
  website: '',
  year: 2000,
  leagueScoring: 'course',
  clubRestriction: '',
  subLeagueOf: '',
  additionalSettings: '',
})

watchEffect(() => {
  if (leagueRaw.value)
    league.value = {
      ...leagueRaw.value,
      courses: leagueRaw.value.courses?.join(',') ?? '',
      moreInformation:
        leagueRaw.value.moreInformation?.replace(/\|\s*/g, '\n') ?? '',
      dynamicEventResults: leagueRaw.value.dynamicEventResults ?? true,
      leagueScoring: leagueRaw.value.leagueScoring ?? 'course',
    } as LeagueForm
})

const validateForm = () => {
  if (league.value.name === '' || league.value.scoringMethod === '') {
    messages.create(
      'Please Ensure Name and Scoring Method Fields are not Blank'
    )
    return false
  } else if (
    league.value.name.includes('/') ||
    league.value.name.includes('\\')
  ) {
    messages.create("Please Ensure Name doesn't Include any Slashes")
    return false
  } else return true
}
const createLeague = () => {
  if (validateForm())
    return apiCreateLeague({
      ...league.value,
      courses: league.value?.courses?.split(',') ?? [],
      moreInformation: league.value?.moreInformation?.replace(/\n/g, '|') ?? '',
    })
      .then(() => router.push(`/leagues/${league.value.name}`))
      .catch(() => false)
}
const updateLeague = () => {
  if (validateForm())
    return apiUpdateLeague({
      ...league.value,
      courses: league.value?.courses?.split(',') ?? [],
      moreInformation: league.value?.moreInformation?.replace(/\n/g, '|') ?? '',
    })
      .then(() => router.push(`/leagues/${league.value.name}`))
      .catch(() => false)
}
const submit = () =>
  route.path.includes('/edit') ? updateLeague() : createLeague()

const title = computed(() =>
  route.path.includes('/edit') ? 'Edit League' : 'Create League'
)

const leaguesSuitableForSubLeague = computed(() =>
  leagues.value
    .filter((l) => l.scoringMethod === league.value.scoringMethod)
    .map((league) => league.name)
)

const scoringMethodOptions = [
  { value: 'position', text: 'Position Based (100 Max)' },
  { value: 'position50', text: 'Position Based (50 Max)' },
  { value: 'position99', text: 'Position Based (99 Max)' },
  {
    value: 'position99average',
    text: 'Position Based (99 Max, Reduced in a Draw)',
  },
  {
    value: 'positionDouble',
    text: 'Position Based (100 Max, Double Points',
  },
  {
    value: 'position50Double',
    text: 'Position Based (50 Max, Double Points)',
  },
  {
    value: 'positionStaggered',
    text: 'Position Based (Staggered, 60 Max)',
  },
  {
    value: 'timeAverage',
    text: 'Relative to Average Time (1000 Average)',
  },
  {
    value: 'timeAverage100',
    text: 'Relative to Average Time (100 Average)',
  },
  { value: 'timeTop3', text: 'Relative to Top 3 Times' },
  {
    value: 'timeTop3Adjusted',
    text: 'Relative to Top 3 Times (Adjusted)',
  },
  { value: 'file', text: 'From Upload File' },
]
</script>
