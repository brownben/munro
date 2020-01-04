<template>
  <div class="view">
    <vue-headful
      :title="`Munro - ${event.name || ''} Event Results`"
      :description="
        `Results from the ${event.name || ''} event of the ${event.league ||
          ''} league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features`
      "
      :url="`https://munro-leagues.herokuapp.com/events/${$route.params.event}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <div v-if="eventFound">
      <h1 v-show="event" class="text-3xl font-normal font-heading">
        <router-link :to="'/leagues/' + event.league" class="link text-main">
          {{ event.league || '' }}
        </router-link>
        - {{ event.name || '' }}
      </h1>
      <div v-show="event && coursesInResults" class="card my-4">
        <h3 class="font-heading text-2xl">Courses</h3>
        <div>
          <button
            v-for="course in coursesInResults"
            :key="course"
            :class="{ active: chosenCourse === course }"
            class="button inline-block"
            @click="chosenCourse = course"
          >
            {{ course }}
          </button>
        </div>
      </div>
      <filter-menu @changed="filterChanged" />
      <div v-if="filteredResults && filteredResults.length > 0">
        <transition name="shrink">
          <table class="table mb-2">
            <thead>
              <tr>
                <th @click="sortBy('position')">
                  <p>Pos.</p>
                  <up-down-arrow
                    :ascending="ascendingSort"
                    :active="sortedBy === 'position'"
                  />
                </th>
                <th @click="sortBy('name')">
                  <p>Name</p>
                  <up-down-arrow
                    :ascending="ascendingSort"
                    :active="sortedBy === 'name'"
                  />
                </th>
                <th @click="sortBy('age')">
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
            <tbody is="transition-group" name="fade">
              <tr
                v-for="result in filteredResults"
                :key="result.id"
                :class="{ striped: filteredResults.indexOf(result) % 2 === 0 }"
              >
                <td>{{ result.position || '' }}</td>
                <td>{{ result.name }}</td>
                <td>{{ result.ageClass }}</td>
                <td class="club">{{ result.club }}</td>
                <td>{{ elapsedTime(result.time) }}</td>
              </tr>
            </tbody>
          </table>
        </transition>
      </div>
      <h2 v-if="eventFound && !found" class="text-3xl font-heading">
        Sorry, No Results Could Be Found
      </h2>
    </div>
    <not-found v-if="!eventFound" />
  </div>
</template>

<script>
import axios from 'axios'
import FilterMenu from '@/components/FilterMenu'
import UpDownArrow from '@/components/UpDownArrows'
import NotFound from '@/views/NotFound'

export default {
  components: {
    FilterMenu,
    UpDownArrow,
    NotFound,
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
  }),

  computed: {
    resultsWithAgeClassSplit: function() {
      // Split age class into age and gender to allow easy sorting
      return this.rawResults.map(result => {
        if (result.ageClass) {
          result.gender = result.ageClass[0]
          result.age = parseInt(result.ageClass.slice(1), 10)
        }

        return result
      })
    },

    sortedResults: function() {
      // Sort results by preference
      return this.sort(
        this.resultsWithAgeClassSplit,
        this.sortedBy,
        this.ascendingSort
      )
    },

    filteredResults: function() {
      // Filter results by preferences
      return this.sortedResults
        .filter(result => result.course === this.chosenCourse)
        .filter(result =>
          result.name.match(new RegExp(this.filterPreferences.name, 'i'))
        ) // Filter by Name Case Insensitive
        .filter(result =>
          result.club.match(new RegExp(this.filterPreferences.club, 'i'))
        ) // Filter by Club Case Insensitive
        .filter(result => {
          if (
            this.filterPreferences.maxAge === 100 &&
            this.filterPreferences.minAge === 0
          )
            return true
          else {
            return (
              this.filterPreferences.minAge <= result.age &&
              result.age <= this.filterPreferences.maxAge
            )
          }
        }) // If age in range
        .filter(
          result =>
            (this.filterPreferences.male && this.filterPreferences.female) ||
            (this.filterPreferences.male && result.gender === 'M') ||
            (this.filterPreferences.female && result.gender === 'W')
        ) // Filter by Gender
    },

    coursesInResults: function() {
      const courses = [...new Set(this.rawResults.map(result => result.course))]
      this.setChosenCourse(courses)
      return courses
    },
  },

  // If route changes without reload (if only course parameter changes)
  watch: {
    $route: async function() {
      this.rawResults = []
      await this.getResults()
      await this.getEvent()
    },
  },

  // On load
  mounted: function() {
    // Fetch Data
    this.getResults()
    this.getEvent()
  },

  methods: {
    getResults: function() {
      return axios
        .get(`/api/events/${this.$route.params.event}/results`)
        .then(response => {
          if (response.data.length > 0) this.rawResults = response.data
          else this.found = false
        })
        .catch(() => {
          this.found = false
        })
    },

    getEvent: function() {
      return axios
        .get(`/api/events/${this.$route.params.event}`)
        .then(response => {
          this.event = response.data
          this.eventFound = response.data
        })
        .catch(() => {
          this.eventFound = false
        })
    },

    sort: function(array, property, ascending = true) {
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

    sortBy: function(sortBy) {
      // If it is a different property, make it sort ascending else change direction of sort
      if (sortBy !== this.sortedBy) this.ascendingSort = false
      else this.ascendingSort = !this.ascendingSort
      this.sortedBy = sortBy
    },

    filterChanged: function(data) {
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

    setChosenCourse: function(courses) {
      this.chosenCourse = courses[0]
    },

    twoDigits: function(number) {
      if (number.toString().length < 2) return `0${number.toString()}`
      else return number
    },

    elapsedTime: function(totalTimeInSeconds) {
      if (typeof totalTimeInSeconds !== 'number') return totalTimeInSeconds
      else if (totalTimeInSeconds === 0) return ''
      const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
      const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
      return `${this.twoDigits(timeInMinutes)}:${this.twoDigits(timeInSeconds)}`
    },
  },
}
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

td.points {
  @apply px-0 pl-0 pr-0;
}

th span {
  margin-left: -110%;
  opacity: 0;
  transition: 0.3s;
  @apply absolute shadow font-heading bg-white z-40 py-1 px-2 mt-6 text-center;
}

th:hover > span {
  opacity: 1;
}

.active {
  @apply bg-main text-white;
}

@media (max-width: 640px) {
  .club {
    @apply hidden;
  }
}

@media (min-width: 640px) {
  .club {
    @apply block;
  }
}
</style>
