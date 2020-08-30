<!--
  Competitor Form

  The form for Creating/ Updating Competitor
-->

<template>
  <Layout
    :title="title"
    :not-found="!loading && !competitor?.id && $route.path.includes('/edit')"
  >
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      :title="`Munro - ${title}`"
      description
    />
    <!-- @submit on submit via enter key in the last field, .prevent prevents page reload -->
    <form class="col-span-2" @submit.prevent="submit">
      <TextInput v-model.trim="competitor.name" label="Name:" />
      <TextInput v-model.trim="competitor.club" label="Club:" class="mt-4" />
      <TextInput
        v-model.trim="competitor.ageClass"
        label="Age Class:"
        class="mt-4"
      />
      <DropdownInput
        v-model="competitor.league"
        :list="leagues.map((league) => league.name)"
        label="League:"
        class="mt-4"
      />
      <DropdownInput
        v-model="competitor.course"
        :list="courses"
        label="Course:"
        class="mt-4"
      />

      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update Competitor
      </button>
      <button v-else class="mt-8 button-lg">Create Competitor</button>
    </form>
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import TextInput from '/@/components/inputs/TextInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '../../scripts/typeHelpers'

import $store from '../../store/index'
import $router from '../../router/index'
const { currentRoute: $route } = $router

import {
  Competitor,
  getCompetitor,
  createCompetitor as apiCreateCompetitor,
  updateCompetitor as apiUpdateCompetitor,
} from '../../api/competitors'
import { League, getLeagues } from '../../api/leagues'

const loading = ref(true)
const leagues = ref<League[]>([])
const competitor = ref<Competitor>({
  id: 0,
  name: '',
  club: '',
  course: '',
  league: '',
})

const refreshDetails = async () => {
  const routeParamsId = toSingleString($route.value.params.id)

  getLeagues().then((data) => (leagues.value = data))

  loading.value = true
  if (routeParamsId)
    await getCompetitor(routeParamsId).then((data) => {
      competitor.value = data
    })
  loading.value = false
}

const courses = computed(
  () =>
    leagues.value?.find((league) => league.name === competitor.value.league)
      ?.courses ?? []
)

const validateForm = () => {
  if (
    competitor.value.name !== '' &&
    competitor.value.league !== '' &&
    competitor.value.course !== ''
  )
    return true
  else {
    $store.dispatch(
      'createMessage',
      'Please Ensure Name, League and Course Fields are not Blank'
    )
    return false
  }
}

const createCompetitor = () => {
  if (validateForm())
    return apiCreateCompetitor(competitor.value)
      .then(() =>
        $router.push(`/leagues/${competitor.value.league}/competitors`)
      )
      .catch(() => false)
}
const updateCompetitor = () => {
  if (validateForm())
    return apiUpdateCompetitor(competitor.value)
      .then(() => $router.push(`/competitors/${competitor.value.id}`))
      .catch(() => false)
}
const submit = () =>
  $route.value.path.includes('/edit') ? updateCompetitor() : createCompetitor()

const title = computed(() =>
  $route.value.path.includes('/edit') ? 'Edit Competitor' : 'Create Competitor'
)

watch($route, refreshDetails, { immediate: true })

export { loading, competitor, leagues, courses, submit, title }
</script>
