<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const router = useRouter()

const { data: competitor_pools } = await useData<string[]>(`competitor-pools/`)

const form = reactive({
  name: '',
  tagline: '',
  year: new Date().getUTCFullYear(),
  coordinator: '',
  website: '',
  more_information: '',

  visible: true,
  scoring_method: 'position',
  number_of_counting_events: 1,
  competitor_pool: '',
})

const action = async () => {
  try {
    await usePost(`leagues/`, toRaw(form))
    await router.replace(`/leagues/${form.name}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem creating league, please try again.'
  }
}

useTitle({
  title: 'Create League',
  description: 'Add a new league to Munro',
})
</script>

<template>
  <div>
    <Heading title="Create League" />

    <Form button="Create" :action="action">
      <FormHeading
        title="Basic Information"
        description="The identifying data for the league."
      />

      <Input
        v-model.trim="form.name"
        label="Name:"
        class="col-span-2"
        :validator="IsValidURLParameter('a name')"
      />
      <Input
        v-model.trim="form.tagline"
        label="Description:"
        class="col-span-2"
      />
      <Input
        v-model.trim="form.coordinator"
        label="Coordinator:"
        class="col-span-2"
      />
      <InputNumber
        v-model="form.year"
        label="Year:"
        :min="1990"
        :max="2050"
        class="col-span-2"
      />
      <Input
        v-model.trim="form.website"
        label="Website: (URL)"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <InputTextarea
        v-model.trim="form.more_information"
        label="More Information:"
        class="col-span-2"
      />

      <FormHeading
        title="Scoring"
        description="How the scores should be calculated for the league"
      />

      <InputDropdown
        v-model="form.scoring_method"
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
            text: 'Position Based (100 Max, Double Points)',
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
            value: 'timeTopAdjustedWelsh',
            text: 'Relative to Winner\'s Time (Welsh Multipliers)',
          },
          { value: 'file', text: 'From Upload File' },
        ]"
        label="Scoring Method:"
        :validator="RequiredField('a scoring method', true)"
        class="col-span-2"
      />
      <InputNumber
        v-model="form.number_of_counting_events"
        :validator="RequiredField('a number of counting events')"
        :min="1"
        label="Maximum Number of Counting Events:"
        class="col-span-2"
      />

      <FormHeading
        title="Additional Settings"
        description="Adjust advanced settings and enable additional features"
      />
      <InputDropdown
        v-model="form.competitor_pool"
        :list="competitor_pools?.map((name) => ({ value: name, text: name }))"
        label="Competitor Pool:"
        include-blank
        class="col-span-2"
      />
    </Form>
  </div>
</template>
