<script setup lang="ts">
import type { EventResults } from '~/api-types'
import type { Filters } from '~/utils/filter'
import { DocumentArrowUpIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const { data: event } = await useData<EventResults>(
  `events/${route.params.id}/results`,
)
const results = computed(() =>
  groupBy(
    event.value?.results.map(eventResultWithAgeGender) ?? [],
    (result) => result.course,
  ),
)
const courses = computed(() => Object.keys(results.value).sort())

const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: queryToString(route.query.male) !== 'false',
  female: queryToString(route.query.female) !== 'false',
})

if (event.value) {
  useTitle({
    title: `${event.value.name} Event Results`,
    description: `Results from the ${event.value.name} event`,
  })
}
</script>
<template>
  <div v-if="event" class="flex h-full grow flex-col gap-8">
    <Heading
      :title="event.name"
      :link-text="event.league"
      :link-location="`/leagues/${event.league}`"
    >
      <template v-if="Object.keys(event.results_links).length > 0" #default>
        <ResultsLinks :links="event.results_links" />
      </template>

      <template #rightAction>
        <ResultsFilterMenu v-model="filters" />
      </template>
    </Heading>

    <div
      class="mx-auto flex w-full max-w-(--breakpoint-lg) grow flex-row flex-wrap gap-x-4 gap-y-2 px-6 lg:px-8 print:hidden"
    >
      <p
        class="w-full py-1 pr-2 font-bold text-gray-500 sm:w-auto dark:text-gray-400"
        :class="{ block: courses.length > 6 }"
      >
        Courses:
      </p>
      <NuxtLink
        v-for="course in courses"
        :key="course"
        :to="`#${course}`"
        class="ring-main-200 hover:bg-main-100 hover:text-main-700 rounded-sm px-4 py-1 text-gray-600 transition focus-visible:ring-3 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      >
        {{ course }}
      </NuxtLink>
    </div>

    <section
      v-for="course in courses"
      :key="course"
      class="mx-auto w-full max-w-(--breakpoint-lg) grow pb-4 lg:px-8"
    >
      <div class="flex items-center gap-3 px-6 pb-4 sm:pb-6 lg:px-0">
        <h2
          :id="course"
          class="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100"
        >
          {{ course }}
        </h2>
        <NuxtLink
          to="#content"
          title="Return to Top"
          class="group print:hidden"
        >
          <span class="sr-only">Return to Top</span>
          <DocumentArrowUpIcon
            class="group-hover:text-main-600 group-focus:text-main-600 h-5 text-gray-400"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>

      <TableResults :results="results[course]" :filters="filters" />
    </section>

    <LinksSection
      :links="
        courses.map((course) => ({
          text: course,
          location: `#${course}`,
        }))
      "
    >
      Courses
    </LinksSection>
  </div>
  <LazyError v-else />
</template>
