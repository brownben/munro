<template>
  <Layout
    :title="title"
    :not-found="$route.path.includes('/edit') && !loading && !event.id"
  >
    <Meta :title="`Munro - ${title}`" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="submit">
      <InputText v-model.trim="event.name" label="Name:" />
      <InputText
        v-model.trim="event.date"
        label="Date:"
        class="mt-4"
        type="date"
      />
      <InputText
        v-model.trim="event.organiser"
        label="Club/ Organiser:"
        class="mt-4"
      />
      <InputText
        v-model.trim="event.website"
        label="Website: (URL)"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="event.results"
        label="Results: (URL)"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="event.winsplits"
        label="Winsplits: (URL)"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="event.routegadget"
        label="Routegadget: (URL)"
        type="url"
        class="mt-4"
      />
      <InputDropdown
        v-model="event.league"
        :list="leagues.map((league) => league.name)"
        label="League:"
        class="mt-4"
        url-parameter="league"
      />
      <InputText
        v-model.trim="event.moreInformation"
        label="More Information:"
        class="mt-4"
      />
      <InputDropdown
        v-model="event.secondaryLeague"
        :list="subLeagues"
        :include-blank="true"
        label="Secondary League:"
        class="mt-4"
      />
      <InputCheckbox
        v-model="event.userSubmittedResults"
        label="Allow Users to Submit Results"
        class="mt-6 text-left"
      />
      <InputCheckbox
        v-model="event.requiredInTotal"
        label="Event Always Included in Total Points"
        class="mt-6 text-left"
      />
      <InputTextarea
        v-model="event.additionalSettings"
        label="Additional Settings: (Advanced Use Only)"
        class="mt-6 text-left"
      />
      <button v-if="$route.path.includes('/edit')" class="mt-8 button-lg">
        Update Event
      </button>
      <button v-else class="mt-8 button-lg">Create Event</button>
    </form>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Layout from '../../components/Layout.vue'
import InputDropdown from '../../components/InputDropdown.vue'
import InputText from '../../components/InputText.vue'
import InputCheckbox from '../../components/InputCheckbox.vue'
import InputTextarea from '../../components/InputTextarea.vue'

import { toSingleString } from '../../scripts/typeHelpers'

import { useLeagues } from '../../api/leagues'
import {
  useEvent,
  createEvent as apiCreateEvent,
  updateEvent as apiUpdateEvent,
} from '../../api/events'

const store = useStore()
const router = useRouter()
const route = useRoute()

const routeParamsId = computed(() => toSingleString(route.params.id))
const [leagues] = useLeagues()
const [eventRaw, loading] = useEvent(routeParamsId)

const event = ref<LeagueEvent>({
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
  secondaryLeague: '',
  requiredInTotal: false,
  additionalSettings: '',
})

watchEffect(() => {
  if (eventRaw.value) event.value = eventRaw.value
  if (!event.value?.secondaryLeague) event.value.secondaryLeague = ''
})

const validateForm = () => {
  if (event.value.name === '' || event.value.league === '') {
    store.dispatch(
      'createMessage',
      'Please Ensure Name and League Fields are not Blank'
    )
    return false
  } else if (
    event.value.name.includes('/') ||
    event.value.name.includes('\\')
  ) {
    store.dispatch(
      'createMessage',
      "Please Ensure Name doesn't Include any Slashes"
    )
    return false
  } else return true
}
const createEvent = () => {
  if (validateForm())
    return apiCreateEvent(event.value)
      .then(() => router.push(`/leagues/${event.value.league}`))
      .catch(() => false)
}
const updateEvent = () => {
  if (validateForm())
    return apiUpdateEvent(event.value)
      .then(() => router.push(`/leagues/${event.value.league}`))
      .catch(() => false)
}
const submit = () =>
  route.path.includes('/edit') ? updateEvent() : createEvent()

const title = computed(() =>
  route.path.includes('/edit') ? 'Edit Event' : 'Create Event'
)

const subLeagues = computed(() =>
  leagues.value
    .filter((league) => league.subLeagueOf === event.value.league)
    .map((league) => league.name)
)
</script>
