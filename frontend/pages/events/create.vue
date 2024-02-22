<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'
import type { League } from '~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: leagues } = useData<League[]>(`leagues/`)

const form = reactive({
  name: '',
  date: '',
  competitor_pool: '',
  organiser: '',
  part_of: '',
  website: '',
  more_information: '',
  league: queryToString(route.query.league ?? ''),
  results_links: {
    'Standard Results': '',
    Routegadget: '',
    Winsplits: '',
    'GPS Tracking': '',
  },
  allow_user_submitted_results: false,
  compulsory: false,
  league_group: '',
  overridden_scoring_method: '',
  expected_courses: null,
})

const action = async () => {
  try {
    await usePost(`events/`, toRaw(form))
    await router.push(`/leagues/${form.league}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem creating event, please try again.'
  }
}

useTitle({
  title: 'Create Event',
  description: 'Create a new event',
})
</script>

<template>
  <div>
    <Heading title="Create Event" />

    <Form button="Create" :action="action">
      <FormHeading
        title="Basic Information"
        description="The identifying data for the event. Name, date and league are required fields."
      />

      <Input
        v-model.trim="form.name"
        label="Name:"
        class="col-span-2"
        :validator="IsValidURLParameter('a name')"
      />
      <Input
        v-model.trim="form.date"
        label="Date:"
        class="col-span-2"
        type="date"
        :validator="RequiredField('a date')"
      />
      <InputDropdown
        v-model="form.league"
        :list="
          leagues?.map((league) => ({ value: league.name, text: league.name }))
        "
        label="League:"
        include-blank
        class="col-span-2"
        :validator="RequiredField('a league', true)"
      />

      <Input
        v-model.trim="form.organiser"
        label="Organiser:"
        class="col-span-2"
      />
      <Input
        v-model.trim="form.website"
        label="Website: (URL)"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input v-model.trim="form.part_of" label="Part of:" class="col-span-2" />
      <InputTextarea
        v-model.trim="form.more_information"
        label="More Information:"
        class="col-span-2"
      />

      <FormHeading
        title="Results Links"
        description="Add links to other results display and analysis sites."
      />
      <Input
        v-model="form.results_links['Standard Results']"
        label="Standard HTML Results:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['Routegadget']"
        label="Routegadget:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['Winsplits']"
        label="Winsplits:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['GPS Tracking']"
        label="GPS Tracking:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />

      <FormHeading
        title="Scoring"
        description="Adjust how the event is scored in the league"
      />
      <InputSwitch
        v-model="form.compulsory"
        label="Event always included in total points?"
        description="Force the event to always be a counting event for competitors"
        class="col-span-2 py-2"
      />
      <InputSwitch
        v-model="form.allow_user_submitted_results"
        label="Allow users to submit results?"
        description="Let users add their times to the results"
        class="col-span-2 py-2"
      />
      <InputDropdown
        v-model="form.overridden_scoring_method"
        :list="scoringOptions"
        label="Override Scoring Method:"
        include-blank
        class="col-span-2"
      />
    </Form>
  </div>
</template>
