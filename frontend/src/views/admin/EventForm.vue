<!--
  Event Form

  The form for Creating/ Updating Events

  On Create:
    - Show form
  - Fetch Leagues
  - Autofill league if passed in the URL

  On Edit:
    - Show Form
    - Fetch leagues
    - Fetch event data and display it (Event ID from URL)
-->

<template>
  <Layout
    :title="title"
    :not-found="$route.path.includes('/edit') && !loading && !event.id"
  >
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      :title="`Munro - ${title}`"
      description
    />

    <form class="col-span-2" @submit.prevent="submit">
      <TextInput v-model.trim="event.name" label="Name:" />
      <TextInput
        v-model.trim="event.date"
        label="Date: (YYYY-MM-DD)"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.organiser"
        label="Club/ Organiser:"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.website"
        label="Website: (URL)"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.results"
        label="Results: (URL)"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.winsplits"
        label="Winsplits: (URL)"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.routegadget"
        label="Routegadget: (URL)"
        type="url"
        class="mt-4"
      />
      <DropdownInput
        v-model="event.league"
        :list="leagues.map((league) => league.name)"
        label="League:"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.moreInformation"
        label="More Information:"
        class="mt-4"
      />
      <CheckboxInput
        v-model="event.userSubmittedResults"
        label="Allow Users to Submit Results"
        class="mt-6 text-left"
      />
      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update Event
      </button>
      <button v-else class="mt-8 button-lg">Create Event</button>
    </form>
  </Layout>
</template>

<script lang="ts">
import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import TextInput from '/@/components/inputs/TextInput.vue'
import CheckboxInput from '/@/components/inputs/CheckboxInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
    CheckboxInput,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '../../scripts/typeHelpers'

import $store from '../../store/index'
import $router from '../../router/index'
const { currentRoute: $route } = $router

import { League, getLeagues } from '../../api/leagues'
import {
  Event,
  getEvent,
  createEvent as apiCreateEvent,
  updateEvent as apiUpdateEvent,
} from '../../api/events'

const loading = ref(true)
const leagues = ref<League[]>([])
const event = ref<Event>({
  id: '',
  name: '',
  date: '',
  resultUploaded: false,
  organiser: '',
  moreInformation: '',
  website: '',
  results: '',
  winsplits: '',
  routegadget: '',
  userSubmittedResults: false,
  league: '',
})

const refreshDetails = async () => {
  const routeParamsId = toSingleString($route.value.params.id)

  getLeagues().then((data) => {
    leagues.value = data
  })

  if (routeParamsId) {
    loading.value = true
    await getEvent(routeParamsId).then((data) => {
      event.value = data
    })
    loading.value = false
  }
}

const validateForm = () => {
  if (event.value.name === '' || event.value.league === '') {
    $store.dispatch(
      'createMessage',
      'Please Ensure Name and League Fields are not Blank'
    )
    return false
  } else if (
    event.value.name.includes('/') ||
    event.value.name.includes('\\')
  ) {
    $store.dispatch(
      'createMessage',
      "Please Ensure Name doesn't Include any Slashes"
    )
    return false
  } else return true
}
const createEvent = () => {
  if (validateForm())
    return apiCreateEvent(event.value)
      .then(() => $router.push(`/leagues/${event.value.league}`))
      .catch(() => false)
}
const updateEvent = () => {
  if (validateForm())
    return apiUpdateEvent(event.value)
      .then(() => $router.push(`/leagues/${event.value.league}`))
      .catch(() => false)
}
const submit = () =>
  $route.value.path.includes('/edit') ? updateEvent() : createEvent()

const title = computed(() =>
  $route.value.path.includes('/edit') ? 'Edit Event' : 'Create Event'
)

watch($route, refreshDetails, { immediate: true })

export { loading, leagues, event, submit, title }
</script>
