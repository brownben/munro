<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'
import type { League, LeagueGroup } from '~/api-types'

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
  results_links: {},
  allow_user_submitted_results: false,
  compulsory: false,
  league_group: '',
  overridden_scoring_method: '',
  expected_courses: null,
})

const leagueGroups: Ref<LeagueGroup[]> = ref([])
const getLeague = async () => {
  try {
    if (form.league)
      leagueGroups.value = await useGet(`leagues/${form.league}/groups`)
    else leagueGroups.value = []
  } catch {
    leagueGroups.value = []
  }
}
watch(() => form.name, getLeague)

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
        title="Scoring"
        description="Adjust how the event is scored in the league"
      />
      <InputDropdown
        v-if="leagueGroups.length > 0"
        v-model="form.league_group"
        :list="leagueGroups.map((g) => ({ value: String(g.id), text: g.name }))"
        label="League Group:"
        include-blank
        class="col-span-2"
      />
      <InputDropdown
        v-model="form.overridden_scoring_method"
        :list="scoringOptions"
        label="Override Scoring Method:"
        include-blank
        class="col-span-2"
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
    </Form>
  </div>
</template>
