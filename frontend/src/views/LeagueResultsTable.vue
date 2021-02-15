<template>
  <Layout
    class="w-full"
    wide
    has-mobile-sub-title
    :not-found="!loading && !league?.name"
    :show-expansion="filterOpen"
  >
    <Meta
      :title="`Munro - ${$route.params.league} - ${$route.params.course} Results`"
      :description="`Results from the ${$route.params.course} course of the ${$route.params.league} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.league}/results/${$route.params.course}`"
      :block-robots="false"
    />
    <template #title>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold leading-tight font-heading">
          <router-link
            :to="'/leagues/' + $route.params.league"
            class="text-xl text-main-700"
          >
            {{ toSingleString($route.params.league).trim() }}
          </router-link>
          <span class="block text-3xl">
            {{ $route.params.course }}
          </span>
        </h1>

        <button
          title="Toggle Filter Menu"
          class="p-2 text-gray-500 transition rounded-shape hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600"
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

    <template #expansion>
      <FilterMenu @changed="filterChanged" />
    </template>

    <template #fullWidth>
      <div
        v-show="results && results.length > 0"
        class="w-full col-span-2 px-6 mx-auto md:px-8"
        :class="{
          'max-w-screen-xl':
            eventsWithResults.length <= 10 ||
            (eventsWithResults.length < 8 && results?.[0]?.course),
        }"
      >
        <table class="w-full border-collapse">
          <thead>
            <tr
              class="transition duration-300 bg-white border-b border-collapse border-main-200"
            >
              <Heading
                text="Pos."
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.position"
                @click="changeSortPreference(SortableProperties.position)"
              />

              <Heading
                text="Name"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.name"
                :left-on-mobile="true"
                @click="changeSortPreference(SortableProperties.name)"
              />
              <Heading
                v-if="results?.[0]?.course"
                text="Course"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.course"
                @click="changeSortPreference(SortableProperties.course)"
              />
              <Heading
                text="Class"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.age"
                :hide-on-mobile="true"
                @click="changeSortPreference(SortableProperties.age)"
              />
              <Heading
                text="Club"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.club"
                :hide-on-mobile="true"
                @click="changeSortPreference(SortableProperties.club)"
              />
              <Heading
                text="Points"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.totalPoints"
                @click="changeSortPreference(SortableProperties.totalPoints)"
              />

              <Heading
                v-for="(event, i) of eventsWithResults"
                :key="event.id"
                :text="`${i + 1}`"
                :tooltip="event.name"
                :ascending="sortPreferences.ascending"
                :active="
                  sortPreferences.by === SortableProperties.points &&
                  sortPreferences.event === i
                "
                :compressed="true"
                @click="changeSortPreference(SortableProperties.points, i)"
              />

              <th class="table-cell md:hidden" />
            </tr>
          </thead>
          <transition-group name="list">
            <TableRow
              v-for="(result, i) of results"
              :key="result.id"
              :striped="i % 2 === 0"
            >
              <Cell>{{ result.position }}</Cell>
              <Cell show-secondary-until="sm" class="text-left pl-6">
                {{ result.name }}
                <template #secondary>
                  <span v-if="result?.course" class="mr-4">
                    {{ result.course }}
                  </span>
                  <span v-if="result.ageClass" class="mr-4">
                    {{ result.ageClass }}
                  </span>
                  <span>{{ result.club }}</span>
                </template>
              </Cell>
              <Cell v-if="result.course" show-after="sm">
                {{ result.course }}
              </Cell>
              <Cell show-after="sm">{{ result.ageClass }}</Cell>
              <Cell show-after="sm">{{ result.club }}</Cell>
              <Cell>{{ result.totalPoints }}</Cell>

              <Cell
                v-for="(point, j) of result.points"
                :key="j"
                show-after="md"
                :class="{
                  'line-through': !point?.counting,
                  'font-normal italic': ['manual', 'max', 'average'].includes(
                    point?.type ?? ''
                  ),
                }"
              >
                {{ point?.score }}
              </Cell>

              <template #expansion>
                <p
                  v-for="(point, j) of result.points"
                  :key="j"
                  class="mr-3 text-right font-light"
                >
                  {{ eventsWithResults[j]?.name }}:
                  <span
                    class="inline-block w-4 pl-2 pr-4"
                    :class="{
                      'line-through': !point?.counting,
                      'font-normal italic': [
                        'manual',
                        'max',
                        'average',
                      ].includes(point?.type ?? ''),
                    }"
                  >
                    {{ point?.score }}
                  </span>
                </p>
              </template>
            </TableRow>
          </transition-group>
        </table>
      </div>
    </template>

    <transition name="fade">
      <CardNoResults
        v-if="!loading && results.length === 0"
        class="col-span-2 -mt-2 -mb-6 md:-mt-8"
      />
    </transition>

    <div
      v-if="
        !$route.path.includes('/embed/') &&
        !loading &&
        league?.leagueScoring === 'course' &&
        rawResults.length > 0 &&
        otherCourses.length > 0
      "
      class="col-span-2 mt-6 card"
    >
      <h2 class="text-2xl font-bold font-heading leading-tight">
        Results for Other Courses
      </h2>
      <div class="w-full">
        <router-link
          v-for="course in otherCourses"
          :key="course"
          :to="'/leagues/' + $route.params.league + '/results/' + course"
          class="button"
        >
          {{ course }}
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watch, computed, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import FilterMenu from '../components/FilterMenu.vue'
import Cell from '../components/TableCell.vue'
import Heading from '../components/TableHeading.vue'
import TableRow from '../components/TableRow.vue'
const CardNoResults = defineAsyncComponent(
  () => import('../components/CardNoResults.vue')
)

import { toSingleString } from '../scripts/typeHelpers'
import { leagueResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import {
  sortLeagueResults as sortResults,
  SortablePropertiesLeague as SortableProperties,
} from '../scripts/sort'

import { getLeague } from '../api/leagues'
import { getLeagueEvents } from '../api/events'
import { getLeagueResults } from '../api/results'

const router = useRouter()
const route = useRoute()

/* Get Data */
const loading = ref(true)
const league = ref<League | null>(null)
const eventsWithResults = ref<LeagueEvent[]>([])
const rawResults = ref<LeagueResult[]>([])
const getData = async () => {
  const routeParamsLeague = toSingleString(route.params.league)
  const routeParamsCourse = toSingleString(route.params.course)
  loading.value = true

  if (routeParamsLeague)
    await Promise.all([
      getLeagueResults(routeParamsLeague, routeParamsCourse).then(
        (resultDetails) => {
          rawResults.value = resultDetails ?? []
        }
      ),
      getLeague(routeParamsLeague).then((leagueDetails) => {
        league.value = leagueDetails
      }),
      getLeagueEvents(routeParamsLeague).then((eventDetails) => {
        eventsWithResults.value =
          eventDetails?.filter((event: LeagueEvent) => event.resultUploaded) ??
          []
      }),
    ])

  loading.value = false
}
watch(route, getData, { immediate: true })

/* Results */
const results = computed(() =>
  rawResults.value
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(sortPreferences.value))
)
const otherCourses = computed(
  () =>
    league.value?.courses?.filter(
      (course: string) => course !== toSingleString(route.params.course)
    ) ?? []
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
const sortPreferences = ref<SortPreferencesLeague>({
  ascending: false,
  by: SortableProperties.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (property: SortableProperties, event?: number) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else if (typeof event === 'number' && event !== sortPreferences.value.event)
    sortPreferences.value.ascending = true
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
  if (typeof event === 'number') sortPreferences.value.event = event
}
</script>
