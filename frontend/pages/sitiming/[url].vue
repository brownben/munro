<script setup lang="ts">
import type { EventResults } from '~/api-types'
import type { Filters } from '~/utils/filter'
import {
  AdjustmentsVerticalIcon,
  DocumentArrowUpIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()

const { data: event } = await useData<EventResults>(
  `misc/sitiming?url=${route.params.url}`,
)
const results = computed(() =>
  groupBy(
    event.value?.results.map(eventResultWithAgeGender) ?? [],
    (result) => result.course,
  ),
)
const courses = computed(() => Object.keys(results.value).sort())

const show = ref(false)
const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: true,
  female: true,
})

useTitle({
  title: `${event.value?.name} Results`,
  description: `Results from the ${event.value?.name} event. Converted from SITiming results.`,
})
</script>
<template>
  <div v-if="event">
    <Heading
      :title="event.name"
      link-text="SiTiming Results Viewer"
      link-location="/sitiming"
    >
      <ResultsLinks :links="event.results_links" />

      <template #rightAction>
        <button
          class="inline-flex select-none items-center rounded-md bg-gradient-to-r from-main-500 to-main-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:from-main-600 hover:to-main-700 focus:outline-none focus:ring-2 focus:ring-main-600 focus:ring-offset-2 print:hidden"
          @click="show = !show"
        >
          <AdjustmentsVerticalIcon
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>Filter Results</span>
        </button>
      </template>
    </Heading>

    <transition
      enter-from-class="scale-y-95 opacity-0 "
      enter-active-class="duration-300 origin-top motion-safe:transform"
      enter-to-class="scale-y-100 opacity-100"
      leave-from-class="scale-y-100 opacity-100"
      leave-active-class="duration-300 origin-top motion-safe:transform"
      leave-to-class="scale-y-95 opacity-0 "
    >
      <section v-if="show" class="bg-gray-50 print:hidden">
        <div
          class="mx-auto grid max-w-screen-lg grid-cols-2 gap-6 p-8 pt-4 sm:grid-cols-4 sm:pt-0 lg:px-8"
        >
          <Input v-model="filters.name" label="Name:" class="col-span-2" />
          <Input v-model="filters.club" label="Club:" class="col-span-2" />
          <Input v-model="filters.minAge" label="Min. Age:" type="number" />
          <Input v-model="filters.maxAge" label="Max. Age:" type="number" />
          <InputSwitch v-model="filters.male" label="Male:" />
          <InputSwitch v-model="filters.female" label="Female:" />
        </div>
      </section>
    </transition>

    <div
      class="mx-auto flex w-full max-w-screen-lg flex-grow flex-row flex-wrap gap-x-4 gap-y-2 px-6 pt-8 lg:px-8 print:hidden"
    >
      <p class="w-full py-1 pr-2 font-bold text-gray-500 sm:w-auto">Courses:</p>
      <NuxtLink
        v-for="course in courses"
        :key="course"
        :to="`#${course}`"
        class="rounded px-4 py-1 text-gray-600 ring-main-200 transition hover:bg-main-100 hover:text-main-700 focus-visible:ring"
      >
        {{ course }}
      </NuxtLink>
    </div>

    <section
      v-for="course in courses"
      :key="course"
      class="mx-auto w-full max-w-screen-lg flex-grow py-8 sm:py-12 lg:px-8"
    >
      <div class="flex items-center gap-3 px-6 pb-4 sm:pb-6 lg:px-0">
        <h2
          :id="course"
          class="text-3xl font-extrabold tracking-tight text-gray-800"
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
            class="h-5 text-gray-400 group-hover:text-main-600 group-focus:text-main-600"
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
