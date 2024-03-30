<script setup lang="ts">
import type { EventResults } from '~/api-types'
import type { Filters } from '~/utils/filter'
import {
  AdjustmentsVerticalIcon,
  DocumentArrowUpIcon,
} from '@heroicons/vue/24/outline'

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

const show = ref(false)
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
  <div v-if="event" class="flex h-full flex-grow flex-col gap-8">
    <div>
      <Heading
        :title="event.name"
        :link-text="event.league"
        :link-location="`/leagues/${event.league}`"
      >
        <template v-if="Object.keys(event.results_links).length > 0" #default>
          <ResultsLinks :links="event.results_links" />
        </template>
        <template #rightAction>
          <Button small @click="show = !show">
            <AdjustmentsVerticalIcon
              class="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            <span>Filter Results</span>
          </Button>
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
        <section v-if="show" class="bg-gray-50 dark:bg-gray-800 print:hidden">
          <div
            class="mx-auto grid max-w-screen-lg grid-cols-2 gap-6 p-8 pt-4 sm:grid-cols-4 sm:pt-0 lg:px-8"
          >
            <Input v-model="filters.name" label="Name:" class="col-span-2" />
            <Input v-model="filters.club" label="Club:" class="col-span-2" />
            <Input
              v-model="filters.minAge"
              label="Min. Age:"
              type="number"
              :form-props="{ max: 120, min: 0, step: 1 }"
            />
            <Input
              v-model="filters.maxAge"
              label="Max. Age:"
              type="number"
              :form-props="{ max: 120, min: 0, step: 1 }"
            />
            <InputSwitch v-model="filters.male" label="Male:" />
            <InputSwitch v-model="filters.female" label="Female:" />
          </div>
        </section>
      </transition>
    </div>

    <div
      class="mx-auto flex w-full max-w-screen-lg flex-grow flex-row flex-wrap gap-x-4 gap-y-2 px-6 lg:px-8 print:hidden"
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
        class="rounded px-4 py-1 text-gray-600 ring-main-200 transition hover:bg-main-100 hover:text-main-700 focus-visible:ring dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      >
        {{ course }}
      </NuxtLink>
    </div>

    <section
      v-for="course in courses"
      :key="course"
      class="mx-auto w-full max-w-screen-lg flex-grow pb-4 lg:px-8"
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
