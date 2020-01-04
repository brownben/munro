<!--
  League Results for Course

  Display results for course in dynamic table with searching and sorting. Click on the relevent cell in the header
  to sort/ change sort direction/ preference
  On mobile show overview with name, class, total points and when clicked reveal points for each event.
  Points not included in total are strikethrough style
-->

<template>
  <div class="w-full pt-2 px-4 md:px-8 lg:px-16 xl:px-20">
    <vue-headful
      :title="`Munro - ${$route.params.name} - ${$route.params.course} Results`"
      :description="
        `Results from the ${$route.params.course} course of the ${$route.params.name} league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features`
      "
      :url="
        `https://munro-leagues.herokuapp.com/leagues/${$route.params.name}/results/${$route.params.course}`
      "
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <h1 class="text-3xl font-normal font-heading">
      <router-link
        :to="'/leagues/' + $route.params.name"
        class="link text-main"
        >{{ $route.params.name }}</router-link
      >
      - {{ $route.params.course }}
    </h1>
    <filter-menu @changed="filterChanged" />
    <div
      v-show="filteredResults && filteredResults.length > 0"
      class="table-container"
    >
      <table class="table">
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
            <th @click="sortBy('totalPoints')">
              <p>Points</p>

              <up-down-arrow
                :ascending="ascendingSort"
                :active="sortedBy === 'totalPoints'"
              />
            </th>

            <template v-if="!smallWindow">
              <th
                v-for="event of eventsWithResults"
                :key="eventsWithResults.indexOf(event)"
                class="points relative"
                @click="sortBy('points-' + eventsWithResults.indexOf(event))"
              >
                <p>{{ eventsWithResults.indexOf(event) + 1 }}</p>
                <span>{{ event.name }}</span>
                <up-down-arrow
                  :ascending="ascendingSort"
                  :active="
                    sortedBy === 'points-' + eventsWithResults.indexOf(event)
                  "
                  class="points-arrow"
                />
              </th>
            </template>
            <td v-else />
          </tr>
        </thead>
        <tbody is="transition-group" name="fade">
          <template v-for="result of filteredResults">
            <tr
              :key="result.name"
              :class="{ striped: filteredResults.indexOf(result) % 2 === 0 }"
              class="normal-table-row"
              @click="toggleRow(filteredResults.indexOf(result))"
            >
              <!-- :class - If odd number results, add background color to give stripe effect to make it easier to read -->

              <td>{{ result.position }}</td>
              <td>{{ result.name }}</td>
              <td>{{ result.ageClass }}</td>
              <td class="club">{{ result.club }}</td>
              <td>{{ result.totalPoints }}</td>

              <template v-if="!smallWindow">
                <td
                  v-for="event of eventsWithResults"
                  :key="eventsWithResults.indexOf(event)"
                  :class="{
                    strikethrough: !result.largestPoints.includes(
                      eventsWithResults.indexOf(event)
                    ),
                  }"
                  class="points"
                >
                  {{ result.points[eventsWithResults.indexOf(event)] }}
                </td>
              </template>
              <td v-else>
                <svg
                  v-if="!openedRows.includes(filteredResults.indexOf(result))"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </td>
            </tr>
            <tr
              v-if="
                smallWindow &&
                  openedRows.includes(filteredResults.indexOf(result))
              "
              :key="result.name + '-mobile'"
              :class="{ striped: filteredResults.indexOf(result) % 2 === 0 }"
              class="mobile-table-expansion"
            >
              <!-- :class - If odd number results, add background color to give stripe effect to make it easier to read -->
              <td colspan="100%">
                <p
                  v-for="event of eventsWithResults"
                  :key="eventsWithResults.indexOf(event)"
                >
                  {{ event.name }}:
                  <span
                    :class="{
                      strikethrough: !result.largestPoints.includes(
                        eventsWithResults.indexOf(event)
                      ),
                    }"
                    >{{ result.points[eventsWithResults.indexOf(event)] }}</span
                  >
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-if="otherCourses.length > 0" class="card my-6 mx-1">
      <h2 class="text-2xl font-heading">Results for Other Courses</h2>
      <div>
        <router-link
          v-for="course in otherCourses"
          :key="course"
          :to="'/leagues/' + $route.params.name + '/results/' + course"
          class="button"
          >{{ course }}</router-link
        >
      </div>
    </div>
    <!-- If no results show, message -->
    <h2 v-if="!found" class="text-3xl font-heading">
      Sorry, No Results Could Be Found
    </h2>
  </div>
</template>

<script>
import axios from 'axios'
import FilterMenu from '@/components/FilterMenu'
import UpDownArrow from '@/components/UpDownArrows'

export default {
  components: {
    FilterMenu,
    UpDownArrow,
  },

  data: () => ({
    smallWindow: false,
    found: true,
    openedRows: [],
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

    filteredResults: function() {
      // Filter results by preferences
      return this.sortedResults
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

    eventsWithResults: function() {
      // Get events with results
      return this.events.filter(event => event.resultUploaded)
    },
  },

  // If route changes without reload (if only course parameter changes)
  watch: {
    $route: async function() {
      this.rawResults = []
      this.openedRows = []
      await this.getResults()
      await this.getEventList()
      this.getOtherCourses()
    },
  },

  // On load
  mounted: function() {
    // Mobile resize watcher
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    // Fetch Data
    this.getResults()
    this.getEventList()
    this.getOtherCourses()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize: function() {
      if (window.innerWidth > 900) this.smallWindow = false
      else this.smallWindow = true
    },

    getResults: function() {
      return axios
        .get(
          `/api/leagues/${this.$route.params.name}/results/${this.$route.params.course}`
        )
        .then(response => {
          if (response.data.length > 0) this.rawResults = response.data
          else this.found = false
        })
        .catch(() => {
          this.found = false
        })
    },

    getOtherCourses: function() {
      return axios
        .get(`/api/leagues/${this.$route.params.name}`)
        .then(response => {
          if (response.data.courses)
            this.otherCourses = response.data.courses.filter(
              course => course !== this.$route.params.course
            )
          else this.otherCourses = false
          return this.otherCourses
        })
        .catch(() => {
          this.otherCourses = false
        })
    },

    getEventList: function() {
      return axios
        .get(`/api/leagues/${this.$route.params.name}/events`)
        .then(response => {
          this.events = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching List of Events')
        )
    },

    sort: function(array, property, ascending = true, byPoints = false) {
      let sortFunction
      if (byPoints) {
        sortFunction = (a, b) => {
          if (a.points[property] === b.points[property]) return 0
          else if (a.points[property] === null) return 1
          else if (b.points[property] === null) return -1
          else if (a.points[property] < b.points[property]) return 1
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

    sortBy: function(sortBy) {
      // Change what property it is sorted by
      this.openedRows = []
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

    toggleRow: function(id) {
      // Shows the detailed points view when the row for the results is clicked on a mobile
      const index = this.openedRows.indexOf(id)
      if (index > -1) this.openedRows.splice(index, 1)
      else this.openedRows.push(id)
    },
  },
}
</script>

<style scoped lang="postcss">
.strikethrough {
  text-decoration: line-through;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.mobile-table-expansion td {
  @apply text-right;
}
.mobile-table-expansion td p {
  @apply mr-3;
}
.mobile-table-expansion td span {
  @apply pl-2 pr-4 w-4 inline-block;
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

@media (min-width: 1200px) {
  .points-arrow {
    @apply inline-block;
  }
}
@media (max-width: 1200px) {
  .points-arrow {
    @apply hidden;
  }
  td.points {
    @apply px-1;
  }
}

@media (max-width: 1000px) {
  td.points {
    padding-left: 0.15rem;
    padding-right: 0.15rem;
  }
}
</style>
