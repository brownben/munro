<template>
  <Layout v-if="event" has-mobile-sub-title :show-expansion="filterOpen">
    <Meta
      :title="`Munro - ${event?.name || ''} Event Results`"
      :description="`Results from the ${event?.name || ''} event of the ${
        event?.league || ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munroleagues.com/events/${$route.params.event}`"
      :block-robots="false"
    />
    <template #title>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold leading-tight font-heading -mt-2">
          <router-link
            :to="'/leagues/' + event?.league"
            class="text-xl text-main-700 focus-visible:shadow-outline rounded-shape"
          >
            {{ event?.league || '' }}
          </router-link>
          <span class="block text-4xl">
            {{ event?.name || '' }}
          </span>
        </h1>

        <button
          title="Toggle Filter Menu"
          class="p-2 text-gray-500 transition rounded-shape hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600 print:hidden"
          :class="{ 'text-main-600 bg-main-50': filterOpen }"
          @click="filterOpen = !filterOpen"
        >
          <span class="sr-only">Toggle Filter Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>
      </div>
    </template>

    <template #white>
      <div v-if="coursesInResults.length > 0" class="col-span-2 -mt-2 flex">
        <div class="hidden sm:flex w-full items-center">
          <p class="text-lg tracking-tight text-gray-600 mr-2 font-heading">
            Courses:
          </p>
          <router-link
            v-for="course in coursesInResults"
            :key="course"
            :class="
              currentCourse === course
                ? 'text-main-700 bg-main-100'
                : 'hover:bg-main-100  focus:bg-main-100  text-gray-500 '
            "
            class="px-3 py-2 ml-2 font-heading leading-5 transition duration-150 ease-in-out rounded-shape focus-visible:shadow-outline text-lg hover:text-main-600 focus:text-main-600"
            :to="`/events/${$route.params.event}/results/${course}`"
          >
            {{ course }}
          </router-link>
        </div>
        <InputDropdown
          v-model="currentCourse"
          label="Course:"
          class="block sm:hidden w-full"
          :list="coursesInResults"
          :include-blank="false"
          @update:modelValue="
            $router.push(`/events/${$route.params.event}/results/${$event}`)
          "
        />
      </div>
    </template>

    <template #expansion>
      <FilterMenu @changed="filterChanged" />
    </template>

    <div class="col-span-2">
      <table
        v-if="results.length > 0"
        class="w-full col-span-2 mb-2 border-collapse tabular-nums"
      >
        <thead>
          <tr
            class="transition duration-300 bg-white border-b border-collapse border-main-200 hover:bg-main-200"
          >
            <Heading
              text="Pos."
              screenreader-text="Position"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.position"
              @toggle="changeSortPreference(SortableProperties.position)"
            />
            <Heading
              text="Name"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.name"
              :left-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.name)"
            />
            <Heading
              text="Class"
              screenreader-text="Age Class"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.age"
              :hide-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.age)"
            />
            <Heading
              text="Club"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.club"
              :hide-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.club)"
            />
            <Heading
              text="Time"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.time"
              @toggle="changeSortPreference(SortableProperties.time)"
            />
          </tr>
        </thead>
        <transition-group name="list">
          <TableRow
            v-for="(result, i) in results"
            :key="`${result?.course}-${result?.id}`"
            :striped="i % 2 === 0"
            :expanding="false"
          >
            <template v-if="result">
              <Cell>
                <template
                  v-if="
                    ['max', 'average', 'manual'].includes(result.type ?? '')
                  "
                >
                  *
                </template>
                <template v-else-if="result.incomplete">-</template>
                <template v-else>
                  {{ result.position || '' }}
                </template>
              </Cell>

              <Cell show-secondary-until="sm" class="text-left pl-6">
                {{ result.name }}
                <template #secondary>
                  <span v-if="result.ageClass" class="mr-4">
                    {{ result.ageClass }}
                  </span>
                  <span>{{ result.club }}</span>
                </template>
              </Cell>

              <Cell show-after="sm">
                {{ result.ageClass }}
              </Cell>
              <Cell show-after="sm">
                {{ result.club }}
              </Cell>
              <Cell>
                <time
                  v-if="result.time"
                  :datetime="timeToHTMLElapsed(result.time)"
                >
                  {{ elapsedTime(result.time) }}
                </time>
              </Cell>
            </template>
          </TableRow>
        </transition-group>
      </table>
    </div>
    <CardNoResults v-if="!loading && results.length === 0" class="col-span-2" />
  </Layout>
</template>
<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import FilterMenu from '../components/FilterMenu.vue'
import Cell from '../components/TableCell.vue'
import Heading from '../components/TableHeading.vue'
import TableRow from '../components/TableRow.vue'
const InputDropdown = defineAsyncComponent(
  () => import('../components/InputDropdown.vue')
)
const CardNoResults = defineAsyncComponent(
  () => import('../components/CardNoResults.vue')
)

import { toSingleString } from '../scripts/typeHelpers'
import { elapsedTime, timeToHTMLElapsed } from '../scripts/time'
import { eventResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import {
  sortEventResults as sortResults,
  SortablePropertiesEvent as SortableProperties,
} from '../scripts/sort'

import { useEvent } from '../api/events'
import { useEventResults } from '../api/results'

const route = useRoute()

/* Get Data */
const routeParamsEvent = computed(
  () => toSingleString(route.params.event) ?? ''
)
const [event, eventLoading] = useEvent(routeParamsEvent)
const [rawResults, resultsLoading] = useEventResults(routeParamsEvent)
const loading = computed(() => eventLoading.value && resultsLoading.value)

/* Results */
const results = computed(() =>
  rawResults.value
    .filter((result) => result.course === currentCourse.value)
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(sortPreferences.value))
)
const coursesInResults = computed(() => [
  ...new Set(rawResults.value?.map((result) => result.course)),
])
const currentCourse = computed(
  () => toSingleString(route.params.course) || coursesInResults.value?.[0] || ''
)

/* Sort + Filter Preferences */
const filterOpen = ref<boolean>(false)
const filterPreferences = ref<FilterPreferences>({
  name: '',
  club: '',
  minAge: 0,
  maxAge: 100,
  male: true,
  female: true,
})
const sortPreferences = ref<SortPreferencesEvent>({
  ascending: false,
  by: SortableProperties.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (property: SortableProperties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}
</script>
