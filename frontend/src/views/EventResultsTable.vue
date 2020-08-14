<template>
  <div>
    <vue-headful
      :title="`Munro - ${event.name || ''} Event Results`"
      :description="`Results from the ${event.name || ''} event of the ${
        event.league || ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/events/${$route.params.event}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <Layout v-if="eventFound" hasMobileSubTitle>
      <template #title>
        <h1 class="text-3xl font-bold leading-tight font-heading">
          <router-link
            :to="'/leagues/' + event.league"
            class="text-xl md:text-3xl text-main-700"
          >
            {{ event.league || '' }}
          </router-link>
          <span class="hidden ml-2 mr-3 md:inline-block">-</span>
          <span class="block text-4xl md:text-3xl md:inline-block">
            {{ event.name || '' }}
          </span>
        </h1>
      </template>

      <div v-if="coursesInResults" class="block col-span-2 card">
        <h2
          class="text-2xl font-bold tracking-tight text-gray-900 leadiing-6 font-heading"
        >
          Courses
        </h2>
        <button
          v-for="course in coursesInResults"
          :key="course"
          :class="{ 'bg-main-200 text-main-800': chosenCourse === course }"
          class="button"
          @click="setChosenCourse(course)"
        >
          {{ course }}
        </button>
      </div>

      <filter-menu class="col-span-2 my-0" @changed="filterChanged" />

      <transition name="shrink">
        <table
          v-if="filteredResults && filteredResults.length > 0"
          class="table col-span-2 mb-2"
        >
          <thead>
            <tr>
              <th @click="sortBy('position')">
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
              <th @click="sortBy('time')">
                <p>Time</p>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="sortedBy === 'time'"
                />
              </th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="fade">
            <tr
              v-for="result in filteredResults"
              :key="result.id"
              :class="{ striped: filteredResults.indexOf(result) % 2 === 0 }"
            >
              <td
                v-if="['max', 'average', 'manual'].includes(result.type)"
                class="position"
              >
                *
              </td>
              <td v-else-if="result.incomplete" class="position">-</td>
              <td v-else class="position">{{ result.position || '' }}</td>
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
              <td class="ageClass">{{ result.ageClass }}</td>
              <td class="club">{{ result.club }}</td>
              <td class="time">{{ elapsedTime(result.time) }}</td>
            </tr>
          </transition-group>
        </table>
      </transition>

      <transition name="fade">
        <NoResultsCard
          v-if="
            !loading && ((eventFound && !found) || filteredResults.length === 0)
          "
          class="col-span-2"
        />
      </transition>
    </Layout>
    <not-found v-if="!eventFound" />
  </div>
</template>

<script>
import axios from 'axios'
import { defineAsyncComponent } from 'vue'

import Layout from '@/components/Layout.vue'
import FilterMenu from '@/components/FilterMenu.vue'
import UpDownArrow from '@/components/UpDownArrows.vue'

const NoResultsCard = defineAsyncComponent(() =>
  import('@/components/cards/NoResultsCard.vue')
)
const NotFound = defineAsyncComponent(() => import('@/views/NotFound.vue'))

export default {
  components: {
    Layout,
    FilterMenu,
    UpDownArrow,
    NotFound,
    NoResultsCard,
  },

  data: () => ({
    event: false,
    found: true,
    eventFound: true,
    rawResults: [],
    sortedBy: 'position',
    ascendingSort: false,
    chosenCourse: '',
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
      return this.sort(
        this.resultsWithAgeClassSplit,
        this.sortedBy,
        this.ascendingSort
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
          matchesAge(result) &&
          result.course === this.chosenCourse
      )
    },

    coursesInResults: function () {
      const courses = [
        ...new Set(this.rawResults?.map((result) => result.course)),
      ]
      if (courses.length >= 1 && !this.chosenCourse)
        this.setChosenCourse(courses[0])
      return courses
    },
  },

  // If route changes without reload (if only event parameter changes)
  watch: {
    '$route.params.event': function () {
      this.rawResults = []

      this.loading = true
      return this.getEvent()
        .then(() => this.getResults())
        .then(() => {
          this.loading = false
        })
    },

    '$route.params.course': function () {
      this.chosenCourse = this.$route.params.course
    },
  },

  // On load
  mounted: function () {
    // Fetch Data
    this.loading = true
    if (this.$route.params.course) this.chosenCourse = this.$route.params.course
    return this.getEvent()
      .then(() => this.getResults())
      .then(() => {
        this.loading = false
      })
  },

  methods: {
    getResults: function () {
      return axios
        .get(`/api/events/${this.$route.params.event}/results`)
        .then((response) => {
          if (response.data.length > 0) this.rawResults = response.data
          else this.found = false
        })
        .catch(() => {
          this.found = false
        })
    },

    getEvent: function () {
      return axios
        .get(`/api/events/${this.$route.params.event}`)
        .then((response) => {
          this.event = response.data
          this.eventFound = response.data
        })
        .catch(() => {
          this.eventFound = false
        })
    },

    sort: function (array, property, ascending = true) {
      let sortFunction
      sortFunction = (a, b) => {
        if (a[property] === b[property]) return 0
        else if (
          a[property] === null ||
          a[property] === undefined ||
          a[property] === ''
        )
          return -1
        else if (
          b[property] === null ||
          b[property] === undefined ||
          b[property] === ''
        )
          return 1
        else if (a[property] < b[property]) return 1
        else return -1
      }

      if (ascending) return array.sort(sortFunction)
      else return array.sort(sortFunction).reverse()
    },

    sortBy: function (sortBy) {
      // If it is a different property, make it sort ascending else change direction of sort
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

    setChosenCourse: function (course) {
      this.chosenCourse = course
      this.$router.push(`/events/${this.$route.params.event}/results/${course}`)
    },

    twoDigits: function (number) {
      if (number.toString().length < 2) return `0${number.toString()}`
      else return number
    },

    elapsedTime: function (totalTimeInSeconds) {
      if (typeof totalTimeInSeconds !== 'number') return totalTimeInSeconds
      else if (totalTimeInSeconds === 0) return ''
      const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
      const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
      return `${this.twoDigits(timeInMinutes)}:${this.twoDigits(timeInSeconds)}`
    },
  },
}
</script>

<style lang="postcss" scoped>
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

    &:hover {
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
  }
}

table td {
  &.time,
  &.position {
    @apply font-normal;

    @screen sm {
      @apply font-light;
    }
  }
}

table td,
table th {
  &.name {
    @apply text-left pl-6;

    @screen lg {
      @apply pl-10;
    }
  }

  &.club,
  &.ageClass {
    @apply hidden;
  }

  @screen sm {
    &.club,
    &.ageClass {
      @apply table-cell;
    }
  }
}
</style>
