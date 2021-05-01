<template>
  <Layout
    :title="title"
    :not-found="$route.path.includes('/edit') && !loading && !event.id"
    thin
  >
    <Meta :title="`Munro - ${title}`" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="submit">
      <div>
        <h2 class="text-lg font-bold text-gray-900 font-heading">
          Basic Information
        </h2>
        <p class="text-sm text-gray-600">
          The identifying data for the event. Name, date and league are required
          fields.
        </p>
      </div>

      <InputText
        v-model.trim="event.name"
        label="Name:"
        class="mt-4"
        :validators="[RequiredField('a name'), IsValidURLParameter('a name')]"
      />
      <InputText
        v-model.trim="event.date"
        label="Date:"
        class="mt-4"
        type="date"
        :validators="[RequiredField('a date', true)]"
      />
      <InputDropdown
        v-model="event.league"
        :list="leagues.map((league) => league.name)"
        label="League:"
        class="mt-4"
        url-parameter="league"
        :validator="RequiredField('a league', true)"
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
        v-model.trim="event.moreInformation"
        label="More Information:"
        class="mt-4"
      />

      <div class="mt-8">
        <h2 class="text-lg font-bold text-gray-900 font-heading">
          Results Links
        </h2>
        <p class="text-sm text-gray-600">
          Add links to other results analysis sites, to be displayed once
          results are uploaded.
        </p>
      </div>
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

      <div class="mt-8">
        <h2 class="text-lg font-bold text-gray-900 font-heading">
          Additional Settings
        </h2>
        <p class="text-sm text-gray-600">
          Adjust the scoring for the event, and enable additional features
        </p>
      </div>
      <InputSwitch
        v-model="event.userSubmittedResults"
        label="Allow Users to Submit Results"
        description="Let users add their times to the results"
        class="my-6"
      />
      <InputSwitch
        v-model="event.requiredInTotal"
        label="Event Always Included in Total Points"
        description="Force the event to always be a counting event for competitors"
        class="mt-6 text-left"
      />
      <InputDropdown
        v-if="subLeagues.length > 0"
        v-model="event.secondaryLeague"
        :list="subLeagues"
        :include-blank="true"
        label="Secondary League:"
        class="mt-4"
      />
      <InputTextarea
        v-model="event.additionalSettings"
        label="Additional Settings: (Advanced Use Only)"
        class="mt-6 text-left"
        :validators="[IsValidJSON('additional settings')]"
      />

      <button class="mt-8 button-lg">
        <template v-if="$route.path.includes('/edit')">Update Event</template>
        <template v-else>Create Event</template>
      </button>
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
import InputSwitch from '../../components/InputSwitch.vue'
import InputRadio from '../../components/InputRadio.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import {
  RequiredField,
  IsValidURLParameter,
  IsValidJSON,
} from '../../scripts/inputValidation'

import { useMessages } from '../../store/messages'

import { useLeagues } from '../../api/leagues'
import {
  useEvent,
  createEvent as apiCreateEvent,
  updateEvent as apiUpdateEvent,
} from '../../api/events'

const router = useRouter()
const route = useRoute()
const messages = useMessages()

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
    messages.create('Please Ensure Name and League Fields are not Blank')
    return false
  } else if (
    event.value.name.includes('/') ||
    event.value.name.includes('\\')
  ) {
    messages.create("Please Ensure Name doesn't Include any Slashes")
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
