<template>
  <Layout
    class="w-full"
    wide
    has-mobile-sub-title
    :not-found="!rawData?.league"
    :show-expansion="filterOpen"
  >
    <Meta
      :title="`Munro - ${leagueName} - ${course} Results`"
      :description="`Results from the ${course} course of the ${leagueName} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munroleagues.com/leagues/${leagueName}/results/${course}`"
      :image="`https://images.munroleagues.com/${leagueName}`"
      :imageAlt="`Munro Leagues - ${leagueName}`"
      :block-robots="false"
    />
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold leading-tight font-heading">
          <router-link
            :to="'/leagues/' + leagueName"
            class="text-xl text-main-700 focus-visible:shadow-outline rounded-shape"
          >
            {{ leagueName }}
          </router-link>
          <span class="block text-3xl">
            {{ course }}
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
      <FilterMenu :preferences="filterPreferences" @changed="filterChanged" />
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
              class="transition duration-300 bg-white border-b border-collapse border-main-200"
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
              :key="`${course}-${result?.id}`"
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
                  {{ result.course || ' ' }}
                </Cell>
                <Cell show-after="sm">{{ result.ageClass || ' ' }}</Cell>
                <Cell show-after="sm">{{ result.club || ' ' }}</Cell>
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
                  {{ point?.score ?? ' ' }}
                </Cell>
              </template>
              <template #expansion>
                <dl class="mr-3 font-light text-right">
                  <div v-for="(event, j) of eventsWithResults" :key="j">
                    <dt class="inline-block">{{ event?.name }}:</dt>
                    <dd
                      class="inline-block w-4 pl-2 pr-4"
                      :class="{
                        'line-through': !result.points[j]?.counting,
                        'font-normal italic': [
                          'manual',
                          'max',
                          'average',
                        ].includes(result.points[j]?.type ?? ''),
                      }"
                    >
                      {{ result.points[j]?.score }}
                    </dd>
                  </div>
                </dl>
              </template>
            </TableRow>
          </transition-group>
        </table>
      </div>
    </template>

    <CardNoResults
      v-if="results.length === 0"
      class="col-span-2 -mt-2 md:-mt-8 sm:mb-10"
    />

    <template
      #fullWidthEnd
      v-if="
        !$route.path.includes('/embed/') &&
        rawData?.leagueScoring !== 'overall' &&
        otherCourses.length > 0
      "
    >
      <section
        class="col-span-2 py-6 text-center text-white bg-gradient-to-r from-main-600 to-main-500"
        :class="{
          'sm:pt-4 sm:pb-6 md:py-8': otherCourses.length >= 5,
          'py-6 sm:py-8': otherCourses.length < 5,
        }"
      >
        <div
          class="items-center justify-between max-w-screen-xl px-6 mx-auto lg:px-8"
          :class="{
            'md:flex': otherCourses.length >= 5,
            'sm:flex': otherCourses.length < 5,
          }"
        >
          <h2
            class="mb-2 text-2xl font-bold font-heading sm:mb-0"
            :class="{ 'sm:pb-3 md:py-0': otherCourses.length >= 5 }"
          >
            <template v-if="otherCourses.length < 4">Results for</template>
            Other Courses
          </h2>
          <div>
            <router-link
              v-for="course in otherCourses"
              :key="course"
              :to="`/leagues/${leagueName}/results/${course}`"
              class="inline-block w-full px-4 py-2 mx-0 mt-3 text-lg leading-tight text-white transition duration-300 ease-in-out bg-white bg-opacity-0 border border-white border-opacity-50 outline-none appearance-none select-none font-heading rounded-shape sm:w-auto sm:mx-2 sm:mt-0 hover:bg-opacity-25 hover:text-white focus:bg-opacity-25 focus:text-white focus-visible:ring-1 ring-white ring-opacity-75"
            >
              {{ course }}
            </router-link>
          </div>
        </div>
      </section>
    </template>
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

import { toSingleString, asyncComputed } from '../scripts/typeHelpers'
import { leagueResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import {
  sortLeagueResults as sortResults,
  SortablePropertiesLeague as SortableProperties,
} from '../scripts/sort'

import { useLeagueResults } from '../api/results'

const route = useRoute()
const course = ref<string>('')
const routeLeague = computed(() => toSingleString(route.params.league))
const routeCourse = computed(() => {
  const value = toSingleString(route.params.course)
  if (value) course.value = value
  return value
})

const [rawData] = await useLeagueResults(routeLeague, routeCourse)

const leagueName = computed(() => rawData.value?.league || unref(routeLeague))
const eventsWithResults = computed(() => rawData.value?.events ?? [])
const results = await asyncComputed(
  () =>
    rawData.value?.results
      ?.map(resultWithAgeGender)
      ?.filter((result) => filterResults(result, filterPreferences.value))
      ?.sort(sortResults(sortPreferences.value)) ?? []
)
const otherCourses = await asyncComputed(
  () =>
    rawData.value?.courses?.filter((course) => course !== unref(routeCourse)) ??
    []
)

/* Sort + Filter Preferences */
const filterOpen = ref<boolean>(false)
const filterPreferences = ref<FilterPreferences>({
  name: toSingleString(route.query?.name),
  club: toSingleString(route.query?.club),
  minAge: Number(toSingleString(route.query?.minAge)) || 0,
  maxAge: Number(toSingleString(route.query?.maxAge)) || 100,
  male: toSingleString(route.query?.male) !== 'false',
  female: toSingleString(route.query?.female) !== 'false',
})
const sortPreferences = ref<SortPreferencesLeague>({
  ascending: false,
  by: SortableProperties.position,
})
const filterChanged = (preferences: Partial<FilterPreferences>) => {
  filterPreferences.value = { ...filterPreferences.value, ...preferences }
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
