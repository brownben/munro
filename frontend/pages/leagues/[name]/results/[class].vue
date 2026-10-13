<script setup lang="ts">
import type { LeagueResultsOverview } from '~/api-types'
import { additionalLeagueCategoryLocation } from '~/utils/additionalLeagueClass'
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
const additionalCategories = computed(
  () =>
    data.value?.additional_league_classes.filter(
      (course) => course.class_name === data.value?.class_name,
    ) ?? [],
)
const resultColumnCount = computed(() => results.value[0]?.points.length ?? 0)

const filtersFromQuery = () => ({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: queryToString(route.query.male) !== 'false',
  female: queryToString(route.query.female) !== 'false',
})

const filters = reactive<Filters>(filtersFromQuery())

// If the query parameters are changed, update the filters
watch(
  () => route.query,
  () => Object.assign(filters, filtersFromQuery()),
)

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
      class="mx-auto w-full grow pt-8 pb-10 lg:px-8 print:sm:py-4"
      :class="{
        'max-w-(--breakpoint-lg)': resultColumnCount <= 3,
        'max-w-(--breakpoint-xl)':
          resultColumnCount > 3 && resultColumnCount <= 10,
      }"
    >
      <TableLeagueResults
        :results="results"
        :filters="filters"
        :events="data.events"
        :eligibility="data.eligibility"
      />
    </section>
    <LinksSection
      v-if="additionalCategories.length > 0"
      :links="
        additionalCategories.map((course) => ({
          text: course.name,
          location: additionalLeagueCategoryLocation(
            data?.league ?? '',
            course,
          ),
        }))
      "
      light
    >
      Other Categories
    </LinksSection>
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
