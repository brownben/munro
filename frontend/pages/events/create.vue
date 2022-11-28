<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'
import { League } from '~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

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
    await router.replace(`/leagues/${form.league}`)
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
          {
            value: 'positionStaggered',
            text: 'Position Based (Staggered, 60 Max)',
          },
          { value: 'file', text: 'From Upload File' },
        ]"
        label="Override Scoring Method:"
        include-blank
        class="col-span-2"
      />
    </Form>
  </div>
</template>