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
      :url="`https://munroleagues.com/leagues/${$route.params.league}/results/${$route.params.course}`"
      :block-robots="false"
    />
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold leading-tight font-heading">
          <router-link
            :to="'/leagues/' + $route.params.league"
            class="
              text-xl text-main-700
              focus-visible:shadow-outline
              rounded-shape
            "
          >
            {{ toSingleString($route.params.league).trim() }}
          </router-link>
          <span class="block text-3xl">
            {{ $route.params.course }}
          </span>
        </h1>

        <button
          title="Toggle Filter Menu"
          class="
            p-2
            text-gray-500
            transition
            rounded-shape
            hover:bg-main-100
            hover:text-main-600
            focus:bg-main-100
            focus:text-main-600
            print:hidden
          "
          :class="{ 'text-main-600 bg-main-50': filterOpen }"
          @click="filterOpen = !filterOpen"
        >
          <span class="sr-only">Toggle Filter Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
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
        <table class="w-full border-collapse tabular-nums">
          <thead>
            <tr
              class="
                transition
                duration-300
                bg-white
                border-b border-collapse border-main-200
              "
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
                v-if="results?.[0]?.course"
                text="Course"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.course"
                :hide-on-mobile="true"
                @toggle="changeSortPreference(SortableProperties.course)"
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
                text="Points"
                :ascending="sortPreferences.ascending"
                :active="sortPreferences.by === SortableProperties.totalPoints"
                @toggle="changeSortPreference(SortableProperties.totalPoints)"
              />

              <Heading
                v-for="(event, i) of eventsWithResults"
                :key="event?.id"
                :text="`${i + 1}`"
                :tooltip="event?.name"
                :ascending="sortPreferences.ascending"
                :active="
                  sortPreferences.by === SortableProperties.points &&
                  sortPreferences.event === i
                "
                :compressed="true"
                @toggle="changeSortPreference(SortableProperties.points, i)"
              />

              <th class="table-cell md:hidden" />
            </tr>
          </thead>
          <transition-group name="list">
            <TableRow
              v-for="(result, i) of results"
              :key="`${$route.params.course}-${result?.id}`"
              :striped="i % 2 === 0"
            >
              <template v-if="result">
                <Cell>{{ result.position }}</Cell>
                <Cell show-secondary-until="sm" class="pl-6 text-left">
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
              </template>
              <template #expansion>
                <dl class="mr-3 font-light text-right">
                  <div v-for="(point, j) of result.points" :key="j">
                    <dt class="inline-block">
                      {{ eventsWithResults[j]?.name }}:
                    </dt>
                    <dd
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
                    </dd>
                  </div>
                </dl>
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
        league?.leagueScoring !== 'overall' &&
        rawResults.length > 0 &&
        otherCourses.length > 0
      "
      class="col-span-2 mt-6 card print:hidden"
    >
      <h2 class="text-2xl font-bold leading-tight font-heading">
        Results for Other Courses
      </h2>
      <div class="w-full">
        <router-link
          v-for="course in otherCourses"
          :key="course"
          :to="`/leagues/${$route.params.league}/results/${course}`"
          class="button"
        >
          {{ course }}
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed, defineAsyncComponent, unref } from 'vue'
import { useRoute } from 'vue-router'

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

import { useLeague } from '../api/leagues'
import { useLeagueEvents } from '../api/events'
import { useLeagueResults } from '../api/results'

const route = useRoute()
const routeLeague = computed(() => toSingleString(route.params.league))
const routeCourse = computed(() => toSingleString(route.params.course))

const [rawResults, resultsLoading] = useLeagueResults(routeLeague, routeCourse)
const [league, leagueLoading] = useLeague(routeLeague)
const [leagueEvents, eventsLoading] = useLeagueEvents(routeLeague)
const eventsWithResults = computed(() =>
  leagueEvents.value.filter((event: LeagueEvent) => event.resultUploaded)
)
const loading = computed(
  () => leagueLoading.value || eventsLoading.value || resultsLoading.value
)

const results = computed(() =>
  rawResults.value
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(sortPreferences.value))
)

const otherCourses = computed(
  () =>
    league.value?.courses.filter((course) => course !== unref(routeCourse)) ??
    []
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
