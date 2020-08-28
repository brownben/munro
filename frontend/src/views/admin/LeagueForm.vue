<!--
  League Form

  The form for Creating/ Updating Leagues

  On Create:
    - Show form

  On Edit:
    - Show Form
    - Fetch league data and display it (League Name from URL)
-->

<template>
  <!--  -->
  <Layout
    :title="title"
    :not-found="!loading && !league?.oldName && $route.path.includes('/edit')"
  >
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      :title="`Munro - ${title}`"
      description
    />
    <form class="col-span-2" @submit.prevent="submit">
      <TextInput v-model.trim="league.name" label="Name:" />
      <number-input
        v-model.number="league.year"
        label="Year:"
        :max="2050"
        class="mt-4"
      />
      <TextInput
        v-model.trim="league.description"
        label="Description:"
        class="mt-4"
      />
      <TextInput
        v-model.trim="league.website"
        label="Website: (URL)"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="league.coordinator"
        label="Coordinator:"
        class="mt-4"
      />
      <DropdownInput
        v-model="league.scoringMethod"
        :list="[
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
            value: 'timeAverage',
            text: 'Relative to Average Time (1000 Average)',
          },
          {
            value: 'timeAverage100',
            text: 'Relative to Average Time (100 Average)',
          },
          { value: 'file', text: 'From Upload File' },
        ]"
        :shift="false"
        :option-text-different-to-value="true"
        label="Scoring Method:"
        class="mt-4"
      />
      <number-input
        v-model.number="league.numberOfCountingEvents"
        :min="1"
        label="Number of Events to Count:"
        class="mt-4"
      />
      <TextInput
        v-model.trim="league.courses"
        label="Courses: (Comma Separated)"
        class="mt-4"
      />
      <TextareaInput
        v-model.trim="league.moreInformation"
        label="More Information:"
        class="mt-4"
      />
      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update League
      </button>
      <button v-else class="mt-8 button-lg">Create League</button>
    </form>
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import TextInput from '/@/components/inputs/TextInput.vue'
import TextareaInput from '/@/components/inputs/TextareaInput.vue'
import NumberInput from '/@/components/inputs/NumberInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
    TextareaInput,
    NumberInput,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '/@/scripts/typeHelpers'

import $store from '/@/store/index'
import $router from '/@/router/index'
const { currentRoute: $route } = $router

import {
  League,
  LeagueForm,
  getLeague,
  createLeague as apiCreateLeague,
  updateLeague as apiUpdateLeague,
} from '/@/api/leagues'

const loading = ref(true)
const league = ref<LeagueForm>({
  coordinator: '',
  description: '',
  dynamicEventResults: true,
  moreInformation: '',
  name: '',
  numberOfCountingEvents: 1,
  scoringMethod: '',
  website: '',
  year: 2000,
})

const refreshDetails = async () => {
  const routeParamsName = toSingleString($route.value.params.name)

  loading.value = true
  if (routeParamsName)
    await getLeague(routeParamsName).then((data) => {
      league.value = {
        ...data,
        courses: data?.courses?.join(',') ?? '',
        oldName: data?.name ?? '',
        moreInformation: data?.moreInformation?.replace(/\|\s*/g, '\n') ?? '',
        dynamicEventResults: data.dynamicEventResults ?? true,
      } as LeagueForm
    })
  loading.value = false
}

const validateForm = () => {
  if (league.value.name === '' || league.value.scoringMethod === '') {
    $store.dispatch(
      'createMessage',
      'Please Ensure Name and Scoring Method Fields are not Blank'
    )
    return false
  } else if (
    league.value.name.includes('/') ||
    league.value.name.includes('\\')
  ) {
    $store.dispatch(
      'createMessage',
      "Please Ensure Name doesn't Include any Slashes"
    )
    return false
  } else return true
}
const createLeague = () => {
  if (validateForm())
    return apiCreateLeague({
      ...league.value,
      moreInformation: league.value?.moreInformation?.replace(/\n/g, '|') ?? '',
    })
      .then(() => $router.push(`/leagues/${league.value.name}`))
      .catch(() => false)
}
const updateLeague = () => {
  if (validateForm())
    return apiUpdateLeague({
      ...league.value,
      moreInformation: league.value?.moreInformation?.replace(/\n/g, '|') ?? '',
    })
      .then(() => $router.push(`/leagues/${league.value.name}`))
      .catch(() => false)
}
const submit = () =>
  $route.value.path.includes('/edit') ? updateLeague() : createLeague()

const title = computed(() =>
  $route.value.path.includes('/edit') ? 'Edit League' : 'Create League'
)

watch($route, refreshDetails, { immediate: true })

export { loading, league, submit, title }
</script>
