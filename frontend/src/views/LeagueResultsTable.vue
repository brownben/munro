<!--
  League Results for Course

  Display results for course in dynamic table with searching and sorting. Click on the relevent cell in the header
  to sort/ change sort direction/ preference
  On mobile show overview with name, class, total points and when clicked reveal points for each event.
  Points not included in total are strikethrough style
-->

<template>
  <Layout
    class="w-full"
    wide
    has-mobile-sub-title
    :not-found="!loading && !league?.name"
  >
    <Meta
      :title="`Munro - ${$route.params.league} - ${$route.params.course} Results`"
      :description="`Results from the ${$route.params.course} course of the ${$route.params.league} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.league}/results/${$route.params.course}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        <router-link
          :to="'/leagues/' + $route.params.league"
          class="text-xl text-main-700 md:text-3xl"
        >
          {{ $route.params?.league.trim() }}
        </router-link>
        <span class="hidden ml-2 mr-3 md:inline-block">-</span>
        <span class="block text-3xl md:inline-block">
          {{ $route.params.course }}
        </span>
      </h1>
    </template>

    <template #white>
      <FilterMenu class="col-span-2" @changed="filterChanged" />
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
              class="transition duration-300 bg-white border-b border-collapse border-main-300"
            >
              <Heading
                text="Pos."
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.position
                "
                @click="changeSortPreference(SortablePropetiesLeague.position)"
              />

              <Heading
                text="Name"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.name
                "
                :left-on-mobile="true"
                @click="changeSortPreference(SortablePropetiesLeague.name)"
              />
              <Heading
                v-if="
                  results?.[0]?.course && league?.leagueScoring === 'course'
                "
                text="Course"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.course
                "
                @click="changeSortPreference(SortablePropetiesLeague.course)"
              />
              <Heading
                text="Class"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.age
                "
                :hide-on-mobile="true"
                @click="changeSortPreference(SortablePropetiesLeague.age)"
              />
              <Heading
                text="Club"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.club
                "
                :hide-on-mobile="true"
                @click="changeSortPreference(SortablePropetiesLeague.club)"
              />
              <Heading
                text="Points"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by ===
                  SortablePropetiesLeague.totalPoints
                "
                @click="
                  changeSortPreference(SortablePropetiesLeague.totalPoints)
                "
              />

              <Heading
                v-for="(event, i) of eventsWithResults"
                :key="event.id"
                :text="`${i + 1}`"
                :tooltip="event.name"
                :ascending="SortPreferencesLeague.ascending"
                :active="
                  SortPreferencesLeague.by === SortablePropetiesLeague.points &&
                  SortPreferencesLeague.event === i
                "
                :compressed="true"
                @click="changeSortPreference(SortablePropetiesLeague.points, i)"
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
              <Cell
                v-if="result.course && league?.leagueScoring === 'course'"
                show-after="sm"
              >
                {{ result.course }}
              </Cell>
              <Cell show-after="sm">{{ result.ageClass }}</Cell>
              <Cell show-after="sm">{{ result.club }}</Cell>
              <Cell>{{ result.totalPoints }}</Cell>

              <Cell
                v-for="point of result.points"
                :key="point.event"
                show-after="md"
                :class="{
                  'line-through': !point.counting,
                  'font-normal italic': ['manual', 'max', 'average'].includes(
                    point.type
                  ),
                }"
              >
                {{ point.score }}
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
                      'line-through': !point.counting,
                      'font-normal italic': [
                        'manual',
                        'max',
                        'average',
                      ].includes(point.type),
                    }"
                  >
                    {{ point.score }}
                  </span>
                </p>
              </template>
            </TableRow>
          </transition-group>
        </table>
      </div>
    </template>

    <transition name="fade">
      <NoResultsCard
        v-if="!loading && results.length === 0"
        class="col-span-2 -mt-2 -mb-6 md:-mt-8"
      />
    </transition>

    <div
      v-if="
        !loading &&
        league.leagueScoring === 'course' &&
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
<script lang="ts">
import { defineAsyncComponent } from 'vue'

import Layout from '/@/components/Layout.vue'
import FilterMenu from '/@/components/FilterMenu.vue'
import Cell from '/@/components/TableCell.vue'
import Heading from '/@/components/TableHeading.vue'
import TableRow from '/@/components/ExpandingTableRow.vue'
const NoResultsCard = defineAsyncComponent(
  () => import('/@/components/cards/NoResultsCard.vue')
)

export default {
  components: {
    Layout,
    FilterMenu,
    Cell,
    Heading,
    TableRow,
    NoResultsCard,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

import { toSingleString } from '../scripts/typeHelpers'
import { elapsedTime } from '../scripts/time'
import { leagueResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import { sortLeagueResults as sortResults } from '../scripts/sort'

import $router from '../router/index'
const { currentRoute: $route } = $router

import { getLeague } from '../api/leagues'
import { getLeagueEvents } from '../api/events'
import { getLeagueResults } from '../api/results'

/* Get Data */
const loading = ref(true)
const league = ref<League | null>(null)
const eventsWithResults = ref<Event[]>([])
const rawResults = ref<LeagueResult[]>([])
const getData = async () => {
  const routeParamsLeague = toSingleString($route.value.params.league)
  const routeParamsCourse = toSingleString($route.value.params.course)
  loading.value = true

  await Promise.all([
    getLeagueResults(routeParamsLeague, routeParamsCourse).then(
      (resultDetails) => {
        rawResults.value = resultDetails
      }
    ),
    getLeague(routeParamsLeague).then((leagueDetails) => {
      league.value = leagueDetails
    }),
    getLeagueEvents(routeParamsLeague).then((eventDetails) => {
      eventsWithResults.value = eventDetails.filter(
        (event) => event.resultUploaded
      )
    }),
  ])

  loading.value = false
}
watch($route, getData, { immediate: true })

export { loading, league, eventsWithResults, rawResults }

/* Results */
const results = computed(() =>
  rawResults.value
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(SortPreferencesLeague.value))
)
const otherCourses = computed(
  () =>
    league.value?.courses?.filter(
      (course: string) => course !== toSingleString($route.value.params.course)
    ) ?? []
)

export { results, otherCourses }

/* Sort + Filter Preferences */
const filterPreferences = ref<FilterPreferences>({
  name: '',
  club: '',
  minAge: 0,
  maxAge: 100,
  male: true,
  female: true,
})
const SortPreferencesLeague = ref<SortPreferencesLeague>({
  ascending: false,
  by: SortablePropetiesLeague.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (
  property: SortablePropetiesLeague,
  event?: number
) => {
  if (property !== SortPreferencesLeague.value.by)
    SortPreferencesLeague.value.ascending = false
  else if (
    typeof event === 'number' &&
    event !== SortPreferencesLeague.value.event
  )
    SortPreferencesLeague.value.ascending = true
  else
    SortPreferencesLeague.value.ascending = !SortPreferencesLeague.value
      .ascending
  SortPreferencesLeague.value.by = property
  if (typeof event === 'number') SortPreferencesLeague.value.event = event
}
export {
  SortPreferencesLeague,
  SortablePropetiesLeague,
  filterChanged,
  changeSortPreference,
}
</script>
