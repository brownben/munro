<!--
  League Results for Course

  Display results for course in dynamic table with searching and sorting. Click on the relevent cell in the header
  to sort/ change sort direction/ preference
  On mobile show overview with name, class, total points and when clicked reveal points for each event.
  Points not included in total are strikethrough style
-->

<template>
  <Layout class="w-full" wide has-mobile-sub-title>
    <Meta
      :title="`Munro - ${$route.params.name} - ${$route.params.course} Results`"
      :description="`Results from the ${$route.params.course} course of the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.name}/results/${$route.params.course}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        <router-link
          :to="'/leagues/' + $route.params.name"
          class="text-xl text-main-700 md:text-3xl"
        >
          {{ $route.params.name && $route.params.name.trim() }}
        </router-link>
        <span class="hidden ml-2 mr-3 md:inline-block">-</span>
        <span class="block text-3xl md:inline-block">
          {{ $route.params.course }}
        </span>
      </h1>
    </template>

    <template #white>
      <filter-menu class="col-span-2" @changed="filterChanged" />
    </template>

    <template #fullWidth>
      <div
        v-show="filteredResults && filteredResults.length > 0"
        class="w-full col-span-2 px-6 mx-auto lg:px-8"
        :class="{
          'max-w-screen-xl': eventsWithResults.length <= 10,
        }"
      >
        <table class="table">
          <thead>
            <tr>
              <th class="position" @click="sortBy('position')">
                <p>Pos.</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'position'"
                />
              </th>
              <th class="name" @click="sortBy('name')">
                <p>Name</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'name'"
                />
              </th>
              <th class="ageClass" @click="sortBy('age')">
                <p>Class</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'age'"
                />
              </th>
              <th class="club" @click="sortBy('club')">
                <p>Club</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'club'"
                />
              </th>
              <th class="totalPoints" @click="sortBy('totalPoints')">
                <p>Points</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'totalPoints'"
                />
              </th>

              <template v-if="!smallWindow">
                <th
                  v-for="(event, i) of eventsWithResults"
                  :key="event.id"
                  class="relative points"
                  @click="sortBy(`points-${i}`)"
                >
                  <p>{{ eventsWithResults.indexOf(event) + 1 }}</p>
                  <span>{{ event.name }}</span>
                  <up-down-arrow
                    :ascending="ascendingSort"
                    :active="sortedBy === `points-${i}`"
                    class="points-arrow"
                  />
                </th>
              </template>
              <td v-else />
            </tr>
          </thead>
          <transition-group name="list">
            <ExpandingTableRow
              v-for="(result, i) of filteredResults"
              :key="result.id"
              :striped="i % 2 === 0"
              :small-window="smallWindow"
            >
              <td class="position">
                {{ result.position }}
              </td>
              <td class="name">
                <span class="block font-normal sm:font-light">
                  {{ result.name }}
                </span>
                <span class="block text-xs sm:hidden">
                  <span v-if="result.ageClass" class="mr-4">{{
                    result.ageClass
                  }}</span>
                  <span>{{ result.club }}</span>
                </span>
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

              <template v-if="!smallWindow">
                <td
                  v-for="point of result.points"
                  :key="point.event"
                  :class="{
                    strikethrough: !point.counting,
                    bold: ['manual', 'max', 'average'].includes(point.type),
                  }"
                  class="points"
                >
                  {{ point.score }}
                </td>
              </template>

              <template #expansion>
                <td colspan="100%">
                  <p v-for="(point, j) of result.points" :key="point.event">
                    {{ eventsWithResults[j].name }}:
                    <span
                      :class="{
                        strikethrough: !point.counting,
                        bold: ['manual', 'max', 'average'].includes(point.type),
                      }"
                    >
                      {{ point.score }}
                    </span>
                  </p>
                </td>
              </template>
            </ExpandingTableRow>
          </transition-group>
        </table>
      </div>
    </template>

    <transition name="fade">
      <NoResultsCard
        v-if="!loading && (!found || filteredResults.length === 0)"
        class="col-span-2 -mt-2 -mb-6 md:-mt-8"
      />
    </transition>

    <div v-if="otherCourses.length > 0" class="col-span-2 mt-6 card">
      <h2 class="text-2xl font-bold font-heading">
        Results for Other Courses
      </h2>
      <div>
        <router-link
          v-for="course in otherCourses"
          :key="course"
          :to="'/leagues/' + $route.params.name + '/results/' + course"
          class="button"
        >
          {{ course }}
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

import Layout from '/@/components/Layout.vue'
import FilterMenu from '/@/components/FilterMenu.vue'
import UpDownArrow from '/@/components/UpDownArrows.vue'
import ExpandingTableRow from '/@/components/ExpandingTableRow.vue'

const NoResultsCard = defineAsyncComponent(() =>
  import('/@/components/cards/NoResultsCard.vue')
)

export default {
  components: {
    Layout,
    FilterMenu,
    UpDownArrow,
    ExpandingTableRow,
    NoResultsCard,
  },

  data: () => ({
    smallWindow: false,
    found: true,
    rawResults: [],
    events: [],
    otherCourses: [],
    sortedBy: 'position',
    ascendingSort: false,
    filterPreferences: {
      name: '',
      club: '',
      minAge: 0,
      maxAge: 100,
      male: true,
      female: true,
    },
    loading: true,
  }),

  computed: {
    resultsWithAgeClassSplit: function () {
      // Split age class into age and gender to allow easy sorting
      return this.rawResults.map((result) => {
        if (result.ageClass) {
          const regexMatch = result.ageClass.match(
            /([MWmwfFDH])[^0-9]*([0-9]*)/
          )
          if (['M', 'H'].includes(regexMatch[1].toUpperCase()))
            result.gender = 'M'
          else if (['W', 'F', 'D'].includes(regexMatch[1].toUpperCase()))
            result.gender = 'W'
          else result.gender = ''
          result.age = parseInt(regexMatch[2], 10)
        } else result.gender = ''
        return result
      })
    },

    sortedResults: function () {
      // Sort results by preference
      let property = this.sortedBy
      if (this.sortedBy.includes('points-'))
        property = parseInt(property.split('-')[1], 10)
      return this.sort(
        this.resultsWithAgeClassSplit,
        property,
        this.ascendingSort,
        this.sortedBy.includes('points-')
      )
    },

    filteredResults: function () {
      // Filter results by preferences
      const matchesGender = (result) =>
        (this.filterPreferences.male && this.filterPreferences.female) ||
        (this.filterPreferences.male && result.gender === 'M') ||
        (this.filterPreferences.female && result.gender === 'W') ||
        (!this.filterPreferences.female &&
          !this.filterPreferences.male &&
          result.gender === '')

      const matchesAge = (result) =>
        (this.filterPreferences.maxAge >= 100 &&
          this.filterPreferences.minAge === 0) ||
        (this.filterPreferences.minAge <= result.age &&
          result.age <= this.filterPreferences.maxAge)

      return this.sortedResults.filter(
        (result) =>
          result.name.match(new RegExp(this.filterPreferences.name, 'i')) &&
          result.club.match(new RegExp(this.filterPreferences.club, 'i')) &&
          matchesGender(result) &&
          matchesAge(result)
      )
    },

    eventsWithResults: function () {
      // Get events with results
      return this.events.filter((event) => event.resultUploaded)
    },
  },

  // If route changes without reload (if only course parameter changes)
  watch: {
    $route: function () {
      this.rawResults = []

      this.loading = true
      return this.getResults()
        .then(() => this.getEventList())
        .then(() => this.getOtherCourses())
        .then(() => {
          this.loading = false
        })
    },
  },

  // On load
  mounted: function () {
    // Mobile resize watcher
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    // Fetch Data
    this.loading = true
    return this.getResults()
      .then(() => this.getEventList())
      .then(() => this.getOtherCourses())
      .then(() => {
        this.loading = false
      })
  },

  unmounted() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize: function () {
      if (window.innerWidth > 900) this.smallWindow = false
      else this.smallWindow = true
    },

    getResults: function () {
      return axios
        .get(
          `/api/leagues/${this.$route.params.name}/results/${this.$route.params.course}`
        )
        .then((response) => {
          if (response.data.length > 0) this.rawResults = response.data
          else this.found = false
        })
        .catch(() => {
          this.found = false
        })
    },

    getOtherCourses: function () {
      return axios
        .get(`/api/leagues/${this.$route.params.name}`)
        .then((response) => {
          if (response.data.courses)
            this.otherCourses = response.data.courses.filter(
              (course) => course !== this.$route.params.course
            )
          else this.otherCourses = false
          return this.otherCourses
        })
        .catch(() => {
          this.otherCourses = false
        })
    },

    getEventList: function () {
      return axios
        .get(`/api/leagues/${this.$route.params.name}/events`)
        .then((response) => {
          this.events = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching List of Events')
        )
    },

    sort: function (array, property, ascending = true, byPoints = false) {
      let sortFunction
      if (byPoints) {
        sortFunction = (a, b) => {
          if (a.points[property].score === b.points[property].score) return 0
          else if (a.points[property].score === null) return 1
          else if (b.points[property].score === null) return -1
          else if (a.points[property].score < b.points[property].score) return 1
          else return -1
        }
      } else {
        sortFunction = (a, b) => {
          if (a[property] === b[property]) return 0
          else if (a[property] === null || a[property] === undefined) return 1
          else if (b[property] === null || b[property] === undefined) return -1
          else if (a[property] < b[property]) return 1
          else return -1
        }
      }
      if (ascending) return array.sort(sortFunction)
      else return array.sort(sortFunction).reverse()
    },

    sortBy: function (sortBy) {
      if (sortBy !== this.sortedBy) this.ascendingSort = false
      else this.ascendingSort = !this.ascendingSort
      this.sortedBy = sortBy
    },

    filterChanged: function (data) {
      // Update data of view if Filter Menu emits a change
      this.filterPreferences.name = data.name
      this.filterPreferences.club = data.club
      if (data.minAge === '') this.filterPreferences.minAge = 0
      else this.filterPreferences.minAge = data.minAge
      if (data.maxAge === '') this.filterPreferences.maxAge = 100
      else this.filterPreferences.maxAge = data.maxAge
      this.filterPreferences.male = data.male
      this.filterPreferences.female = data.female
    },
  },
}
</script>

<style lang="postcss">
.list-move {
  transition: transform 0.3s ease-in-out;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.strikethrough {
  text-decoration: line-through;
}

.bold {
  font-weight: 400 !important;
  font-style: italic;
}

.table {
  @apply w-full border-collapse;

  & thead tr {
    @apply border-b border-main-300;
  }

  & tr {
    @apply bg-white border-collapse transition duration-300;

    &.striped {
      @apply bg-main-50;
    }

    &:hover:not(.row-expansion),
    &:hover:not(.row-expansion) + .row-expansion {
      @apply bg-main-200;
    }
  }

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

.row-expansion td {
  @apply text-right;

  & p {
    @apply mr-3 text-right;
  }

  & span {
    @apply pl-2 pr-4 w-4 inline-block;
  }
}

table td,
table th {
  &.name {
    @apply text-left pl-6;
  }

  &.club,
  &.ageClass {
    @apply hidden;
  }

  &.points {
    @apply pl-0 pr-0 px-0;
  }

  @screen sm {
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
