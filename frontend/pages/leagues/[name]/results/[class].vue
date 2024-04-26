<script setup lang="ts">
import type { LeagueResultsOverview } from '~/api-types'
import type { Filters } from '~/utils/filter'

const route = useRoute()

const { data } = await useData<LeagueResultsOverview>(
  `leagues/${route.params.name}/results/${route.params.class}`,
)
const results = computed(
  () => data.value?.results.map(leagueResultWithAgeGender) ?? [],
)
const otherClasses = computed(
  () =>
    data.value?.classes.filter((course) => course !== data.value?.class_name) ??
    [],
)

const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: queryToString(route.query.male) !== 'false',
  female: queryToString(route.query.female) !== 'false',
})

if (data.value) {
  useTitle({
    title: `${data.value.class_name} Results - ${data.value.league}`,
    description: `League standings for the ${data.value.class_name} class in the ${data.value.league} league`,
  })
}
</script>
<template>
  <div v-if="data" class="flex h-full flex-col">
    <Heading
      :title="data.class_name"
      :link-location="`/leagues/${data.league}`"
      :link-text="data.league"
    >
      <template #rightAction>
        <ResultsFilterMenu v-model="filters" />
      </template>
    </Heading>

    <section
      v-if="results"
      class="mx-auto w-full flex-grow pb-10 pt-8 lg:px-8 print:sm:py-4"
      :class="{
        'max-w-screen-lg': results[0]?.points.length <= 3,
        'max-w-screen-xl':
          results[0]?.points.length > 3 && results[0]?.points.length <= 10,
      }"
    >
      <TableLeagueResults
        :results="results"
        :filters="filters"
        :events="data.events"
      />
    </section>
    <LinksSection
      v-if="otherClasses.length > 0"
      :links="
        otherClasses.map((course) => ({
          text: course,
          location: `/leagues/${data?.league}/results/${course}`,
        }))
      "
    >
      Other Classes
    </LinksSection>
  </div>
  <LazyError v-else />
</template>
