<template>
  <Layout
    :title="title"
    :not-found="!competitor?.id && $route.path.includes('/edit')"
    thin
  >
    <Meta :title="`Munro - ${title}`" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="submit">
      <InputText
        v-model.trim="competitor.name"
        label="Name:"
        :validators="[RequiredField('a name')]"
      />
      <InputText v-model.trim="competitor.club" label="Club:" class="mt-4" />
      <InputText
        v-model.trim="competitor.ageClass"
        label="Age Class:"
        class="mt-4"
      />
      <InputDropdown
        v-model="competitor.league"
        :list="leagues.map((league) => league.name)"
        label="League:"
        class="mt-4"
        url-parameter="league"
        :validator="RequiredField('a league', true)"
      />
      <InputDropdown
        v-model="competitor.course"
        :list="courses"
        label="Course:"
        class="mt-4"
        :validator="RequiredField('a course', true)"
      />

      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update Competitor
      </button>
      <button v-else class="mt-8 button-lg">Create Competitor</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../../components/Layout.vue'
import InputDropdown from '../../components/InputDropdown.vue'
import InputText from '../../components/InputText.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import { RequiredField } from '../../scripts/inputValidation'

import { useMessages } from '../../store/messages'

import {
  useCompetitor,
  createCompetitor as apiCreateCompetitor,
  updateCompetitor as apiUpdateCompetitor,
} from '../../api/competitors'
import { useLeagues } from '../../api/leagues'

const router = useRouter()
const route = useRoute()
const messages = useMessages()

const routeParamsId = computed(() => toSingleString(route.params.id))
const [leagues] = await useLeagues()
const [competitorRaw] = await useCompetitor(routeParamsId)

const competitor = ref<Competitor>({
  id: 0,
  name: '',
  club: '',
  ageClass: '',
  course: '',
  league: '',
})

watchEffect(() => {
  if (competitorRaw.value) competitor.value = competitorRaw.value
})

const courses = computed(
  () =>
    leagues.value?.find((league) => league.name === competitor.value?.league)
      ?.courses ?? []
)

const validateForm = () => {
  if (
    competitor.value?.name !== '' &&
    competitor.value?.league !== '' &&
    competitor.value?.course !== ''
  )
    return true
  else {
    messages.create(
      'Please Ensure Name, League and Course Fields are not Blank'
    )
    return false
  }
}

const createCompetitor = () => {
  if (competitor.value && validateForm())
    return apiCreateCompetitor(competitor.value)
      .then(() =>
        router.push(`/leagues/${competitor.value.league}/competitors`)
      )
      .catch(() => false)
}
const updateCompetitor = () => {
  if (competitor.value && validateForm())
    return apiUpdateCompetitor(competitor.value)
      .then(() => router.push(`/competitors/${competitor.value.id}`))
      .catch(() => false)
}
const submit = () =>
  route.path.includes('/edit') ? updateCompetitor() : createCompetitor()

const title = computed(() =>
  route.path.includes('/edit') ? 'Edit Competitor' : 'Create Competitor'
)
</script>
