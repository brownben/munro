<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'
import type { LeagueOverview } from '~~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } = await useData<string[]>(`competitor-pools/`)
const { data: form } = await useData<LeagueOverview>(
  `leagues/${route.params.name}`,
)

const action = async () => {
  try {
    await usePut(`leagues/${route.params.name}`, form.value ?? {})
    await router.replace(`/leagues/${form.value?.name}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem updating league, please try again.'
  }
}

useTitle({
  title: 'Update League',
  description: 'Update the details for a league',
})
</script>

<template>
  <div v-if="form">
    <Heading title="Update League" />

    <Form button="Update" :action="action">
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
        :list="scoringOptions"
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
        class="col-span-2"
      />
    </Form>
  </div>
  <LazyError v-else />
</template>
