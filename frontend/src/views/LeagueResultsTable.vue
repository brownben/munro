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
              <th
                class="position"
                @click="changeSortPreference(SortablePropeties.position)"
              >
                <p>Pos.</p>
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.position"
                />
              </th>
              <th
                class="name"
                @click="changeSortPreference(SortablePropeties.name)"
              >
                <p>Name</p>
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.name"
                />
              </th>
              <th
                v-if="
                  results?.[0]?.course && league?.leagueScoring === 'course'
                "
                class="course"
                @click="changeSortPreference(SortablePropeties.course)"
              >
                Course
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.course"
                />
              </th>
              <th
                class="ageClass"
                @click="changeSortPreference(SortablePropeties.age)"
              >
                Class
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.age"
                />
              </th>
              <th
                class="club"
                @click="changeSortPreference(SortablePropeties.club)"
              >
                <p>Club</p>
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.club"
                />
              </th>
              <th
                class="totalPoints"
                @click="changeSortPreference(SortablePropeties.totalPoints)"
              >
                <p>Points</p>
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="sortPreferences.by === SortablePropeties.totalPoints"
                />
              </th>

              <th
                v-for="(event, i) of eventsWithResults"
                :key="event.id"
                class="relative hidden points md:table-cell"
                @click="changeSortPreference(SortablePropeties.points, i)"
              >
                <p>{{ i + 1 }}</p>
                <span>{{ event.name }}</span>
                <up-down-arrow
                  :ascending="sortPreferences.ascending"
                  :active="
                    sortPreferences.by === SortablePropeties.points &&
                    sortPreferences.event === i
                  "
                  class="points-arrow"
                />
              </th>

              <td class="table-cell md:hidden" />
            </tr>
          </thead>
          <transition-group name="list">
            <ExpandingTableRow
              v-for="(result, i) of results"
              :key="result.id"
              :striped="i % 2 === 0"
            >
              <td class="position">
                {{ result.position }}
              </td>
              <td class="name">
                <span class="block font-normal sm:font-light">
                  {{ result.name }}
                </span>
                <span class="block text-xs sm:hidden">
                  <span v-if="result?.course" class="mr-4">
                    {{ result.course }}
                  </span>
                  <span v-if="result.ageClass" class="mr-4">
                    {{ result.ageClass }}
                  </span>
                  <span>{{ result.club }}</span>
                </span>
              </td>
              <td
                v-if="result.course && league?.leagueScoring === 'course'"
                class="course"
              >
                {{ result.course }}
              </td>
              <td class="ageClass">
                {{ result.ageClass }}
              </td>
              <td class="club">
                {{ result.club }}
              </td>
              <td class="totalPoints">
                {{ result.totalPoints }}
              </td>
              <td
                v-for="point of result.points"
                :key="point.event"
                class="hidden points md:table-cell"
                :class="{
                  'line-through': !point.counting,
                  'font-normal italic': ['manual', 'max', 'average'].includes(
                    point.type
                  ),
                }"
              >
                {{ point.score }}
              </td>

              <template #expansion>
                <p
                  v-for="(point, j) of result.points"
                  :key="j"
                  class="mr-4 text-right"
                >
                  {{ eventsWithResults[j].name }}:
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
            </ExpandingTableRow>
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
      <h2 class="text-2xl font-bold font-heading">Results for Other Courses</h2>
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
import UpDownArrow from '/@/components/UpDownArrows.vue'
import ExpandingTableRow from '/@/components/ExpandingTableRow.vue'
const NoResultsCard = defineAsyncComponent(
  () => import('/@/components/cards/NoResultsCard.vue')
)

export default {
  components: {
    Layout,
    FilterMenu,
    UpDownArrow,
    ExpandingTableRow,
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

import { League, getLeague } from '../api/leagues'
import { Event, getLeagueEvents } from '../api/events'
import { LeagueResult, getLeagueResults } from '../api/results'
import {
  FilterPreferences,
  SortPreferencesLeague as SortPreferences,
  SortablePropetiesLeague as SortablePropeties,
} from '../scripts/FilterSort.d'

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
    .sort(sortResults(sortPreferences.value))
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
const sortPreferences = ref<SortPreferences>({
  ascending: false,
  by: SortablePropeties.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (property: SortablePropeties, event?: number) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else if (typeof event === 'number' && event !== sortPreferences.value.event)
    sortPreferences.value.ascending = true
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
  if (typeof event === 'number') sortPreferences.value.event = event
}
export {
  sortPreferences,
  SortablePropeties,
  filterChanged,
  changeSortPreference,
}
</script>

<style lang="postcss">
table {
  & td {
    @apply py-2 text-center px-1 font-sans font-light;

    &.name {
      @apply py-1;
    }
  }

  & th {
    white-space: nowrap;
    @apply font-heading select-none text-center font-normal py-2;

    & p {
      @apply inline-block;
    }

    & div {
      @apply inline-block ml-1;
    }

    & span {
      width: calc(100% + 3.5rem);
      left: -1.75rem;

      @apply absolute block z-40;
      @apply opacity-0 transition duration-300;
      @apply py-2 px-2;
      @apply font-sans text-sm leading-tight text-center break-words whitespace-normal;
      @apply shadow bg-white rounded-shape;
    }

    &:hover > span {
      @apply opacity-100;
    }
  }
}

table td,
table th {
  &.name {
    @apply text-left pl-6;
  }

  &.course,
  &.club,
  &.ageClass {
    @apply hidden;
  }

  &.points {
    @apply pl-0 pr-0 px-0;
  }

  @screen sm {
    &.course,
    &.club,
    &.ageClass {
      @apply table-cell;
    }
  }
}

table td {
  &.totalPoints,
  &.position {
    @apply font-normal;
  }

  &.points {
    padding: 0 0.1rem;
    @apply text-sm;
  }

  @screen sm {
    &.totalPoints,
    &.position {
      @apply font-light;
    }
  }

  @screen md {
    &.points {
      @apply px-1;
    }
  }

  @screen xl {
    &.points {
      @apply px-2 text-base;
    }
  }
}

table th .points-arrow.up-down-arrow {
  @apply hidden;

  @screen xl {
    @apply inline-block;
  }
}
</style>
