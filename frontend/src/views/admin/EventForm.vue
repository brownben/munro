<template>
  <Layout :title="title" :not-found="title.includes('Edit') && !event.id" thin>
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
      <InputJSON
        v-if="league && league.leagueScoring === 'ageClass'"
        :keys="league.courses ?? []"
        :value="ageClassMapping"
        label="Course Mappings"
        description="Assign a course to each age class"
        class="mt-4"
        @changed="setAgeClassMapping"
      />

      <button class="mt-8 button-lg">
        {{ buttonText }}
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
import InputJSON from '../../components/InputJSON.vue'
import InputSwitch from '../../components/InputSwitch.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import {
  RequiredField,
  IsValidURLParameter,
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
const [leagues] = await useLeagues()
const [eventRaw] = await useEvent(routeParamsId)

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
  league: toSingleString(route.query?.league),
  secondaryLeague: '',
  requiredInTotal: false,
  additionalSettings: '',
})
const league = computed(() =>
  leagues.value.find((league) => league.name === event.value.league)
)
const ageClassMapping = computed(
  () => JSON.parse(event.value?.additionalSettings || '{}').ageClassMapping
)

watchEffect(() => {
  if (eventRaw.value) event.value = eventRaw.value
  if (!event.value?.secondaryLeague) event.value.secondaryLeague = ''
})

const setAgeClassMapping = (value: Record<string, string>) => {
  const currentValue = JSON.parse(event.value?.additionalSettings || '{}')
  currentValue.ageClassMapping = value
  event.value.additionalSettings = JSON.stringify(currentValue)
}

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

const title = route.path.includes('/edit') ? 'Edit Event' : 'Create Event'
const buttonText = route.path.includes('/edit')
  ? 'Update Event'
  : 'Create Event'

const subLeagues = computed(() =>
  leagues.value
    .filter((league) => league.subLeagueOf === event.value.league)
    .map((league) => league.name)
)
</script>
