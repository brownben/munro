<template>
  <div>
    <h1 id="league-title">
      <router-link :to="'/leagues/'+$route.params.name">{{ $route.params.name }}</router-link>
      - {{ $route.params.course }}
    </h1>
    <filter-menu @changed="filterChanged"/>
    <transition name="shrink">
      <div v-show="filteredResults && filteredResults.length > 0">
        <table>
          <thead>
            <tr>
              <th @click="sortBy('position')">
                <p>Pos.</p>
                <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'position'"/>
              </th>
              <th @click="sortBy('name')">
                <p>Name</p>
                <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'name'"/>
              </th>
              <th @click="sortBy('age')">
                <p>Class</p>
                <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'age'"/>
              </th>
              <th class="club" @click="sortBy('club')">
                <p>Club</p>
                <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'club'"/>
              </th>
              <th @click="sortBy('totalPoints')">
                <p>Points</p>
                <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'totalPoints'"/>
              </th>
              <template v-if="!smallWindow">
                <th
                  v-for="event of eventsWithResults"
                  :key="eventsWithResults.indexOf(event)"
                  @click="sortBy('points-' + eventsWithResults.indexOf(event))"
                >
                  <p>{{ eventsWithResults.indexOf(event) + 1 }}</p>
                  <span>{{ event.name }}</span>
                  <up-down-arrow
                    :ascending="ascendingSort"
                    :active="sortedBy === ('points-' + eventsWithResults.indexOf(event))"
                  />
                </th>
              </template>
              <td v-else/>
            </tr>
          </thead>
          <tbody is="transition-group" name="fade">
            <template v-for="result of filteredResults">
              <tr
                :key="result.name"
                :class="{ striped: filteredResults.indexOf(result) % 2 === 1 }"
                class="normal-table-row"
                @click="toggleRow(filteredResults.indexOf(result))"
              >
                <td>{{ result.position }}</td>
                <td>{{ result.name }}</td>
                <td>{{ result.ageClass }}</td>
                <td class="club">{{ result.club }}</td>
                <td>{{ result.totalPoints }}</td>
                <template v-if="!smallWindow">
                  <td
                    v-for="event of eventsWithResults"
                    :key="eventsWithResults.indexOf(event)"
                    :class="{ strikethrough: !result.largestPoints.includes(eventsWithResults.indexOf(event)) }"
                  >{{ result.points[eventsWithResults.indexOf(event)] }}</td>
                </template>
                <td v-else>
                  <svg
                    v-if="!openedRows.includes(filteredResults.indexOf(result))"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </svg>
                </td>
              </tr>
              <tr
                v-if="smallWindow && openedRows.includes(filteredResults.indexOf(result))"
                :key="result.name + '-mobile'"
                :class="{ striped: filteredResults.indexOf(result) % 2 === 1 }"
                class="mobile-table-expansion"
              >
                <td colspan="100%">
                  <p v-for="event of eventsWithResults" :key="eventsWithResults.indexOf(event)">
                    {{ event.name }}:
                    <span
                      :class="{strikethrough: !result.largestPoints.includes(eventsWithResults.indexOf(event))}"
                    >{{ result.points[eventsWithResults.indexOf(event)] }}</span>
                  </p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </transition>
    <h2 v-if="!found">Sorry, No Results Could Be Found</h2>
  </div>
</template>

<script>
import axios from 'axios'
import NotFound from '@/views/NotFound'
import FilterMenu from '@/components/FilterMenu'
import UpDownArrow from '@/components/UpDownArrows'

export default {
  components: {
    NotFound: NotFound,
    FilterMenu: FilterMenu,
    UpDownArrow: UpDownArrow,
  },

  data: () => ({
    smallWindow: false,
    found: true,
    openedRows: [],
    rawResults: [],
    results: [],
    events: [],
    sortedBy: 'position',
    ascendingSort: true,
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
    resultsWithAgeClassSplit: function () {
      return this.rawResults.map(result => {
        if (result.ageClass) {
          result.gender = result.ageClass[0]
          result.age = result.ageClass.slice(1)
        }
        return result
      })
    },

    sortedResults: function () {
      return this.sort(this.resultsWithAgeClassSplit, parseInt(this.sortedBy.split('-')[1]), this.ascendingSort, this.sortedBy.includes('points-'))
    },

    filteredResults: function () {
      return this.sortedResults
        .filter(result => result.name.match(new RegExp(this.filterPreferences.name, 'i')))
        .filter(result => result.club.match(new RegExp(this.filterPreferences.club, 'i')))
        .filter(result => this.filterPreferences.minAge <= result.age && result.age <= this.filterPreferences.maxAge)
        .filter(result => (this.filterPreferences.male && this.filterPreferences.female) || (this.filterPreferences.male && result.gender === 'M') || (this.filterPreferences.female && result.gender === 'W'))
    },

    eventsWithResults: function () {
      return this.events.filter(event => event.resultUploaded)
    },
  },

  watch: {
    $route: function () {
      this.getResults().then(() => this.getEventList())
    },
  },

  mounted: function () {
    this.getResults().then(() => this.getEventList())

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize: function () {
      if (window.innerWidth > 700) this.smallWindow = false
      else this.smallWindow = true
    },

    getResults: function () {
      return axios
        .get('/api/leagues/' + this.$route.params.name + '/results/' + this.$route.params.course)
        .then(response => {
          if (response.data.length > 0) this.rawResults = response.data
          else this.found = false
        })
        .catch(() => {
          this.found = false
        })
    },

    getEventList: function () {
      axios
        .get('/api/leagues/' + this.$route.params.name + '/events')
        .then(response => { this.events = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching List of Events'))
    },

    allPlatformSort: function (array, property, ascending) {
      // Chromium's Implementation of .sort uses 1/-1 not True/False so use the Ternary Operator to make the sort work on all platforms
      const sortFunction = (a, b) => {
        if (a[property] === b[property]) return 0
        else if (a[property] === null) return 1
        else if (b[property] === null) return -1
        else if (a[property] < b[property]) return 1
        else return -1
      }
      if (ascending) return array.sort(sortFunction)
      else return array.sort(sortFunction).reverse()
    },

    sort: function (array, property, ascending = true, byPoints = false) {
      for (let counter = 0; counter < array.length; counter += 1) {
        let minLocation = counter
        if (!byPoints) minLocation = this.findMinOfProperty(array.slice(counter), property) + counter
        else minLocation = this.findMinOfPoints(array.slice(counter), property) + counter
        if (minLocation !== counter) {
          const lastItem = array[counter]
          array[counter] = array[minLocation]
          array[minLocation] = lastItem
        }
      }
      if (ascending) return array
      else return array.reverse()
    },

    findMinOfProperty: function (array, property) {
      let locationOfMinValue = 0
      for (let item = 0; item < array.length; item += 1) {
        if (array[item][property] < array[locationOfMinValue][property]) locationOfMinValue = item
      }
      return locationOfMinValue
    },

    findMinOfPoints: function (array, property) {
      let locationOfMinValue = 0
      for (let item = 0; item < array.length; item += 1) {
        if (array[item].points[property] < array[locationOfMinValue].points[property]) locationOfMinValue = item
      }
      return locationOfMinValue
    },

    allPlatformSortByPoints: function (array, property, ascending) {
      // Chromium's Implementation of .sort uses 1/-1 not True/False so use the Ternary Operator to make the sort work on all platforms
      const pointsColumn = parseInt(property.split('-')[1])
      const sortFunction = (a, b) => {
        if (a.points[pointsColumn] === b.points[pointsColumn]) return 0
        else if (a.points[pointsColumn] === null) return 1
        else if (b.points[pointsColumn] === null) return -1
        else if (a.points[pointsColumn] < b.points[pointsColumn]) return 1
        else return -1
      }
      if (ascending) return array.sort(sortFunction)
      else return array.sort(sortFunction).reverse()
    },

    sortBy: function (sortBy) {
      this.openedRows = []
      if (sortBy !== this.sortedBy) this.ascendingSort = false
      else this.ascendingSort = !this.ascendingSort
      this.sortedBy = sortBy
    },

    filterChanged: function (data) {
      this.filterPreferences.name = data.name
      this.filterPreferences.club = data.club
      if (data.minAge === '') this.filterPreferences.minAge = 100
      else this.filterPreferences.minAge = data.minAge
      if (data.maxAge === '') this.filterPreferences.maxAge = 100
      else this.filterPreferences.maxAge = data.maxAge
      this.filterPreferences.male = data.male
      this.filterPreferences.female = data.female
    },

    toggleRow: function (id) {
      const index = this.openedRows.indexOf(id)
      if (index > -1) this.openedRows.splice(index, 1)
      else this.openedRows.push(id)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/table.styl'

#router-view
  margin-left: 5%
  padding-top: 1rem
  width: 90%

#league-title
  padding: 0 0 0.75rem

  a
    text-decoration: underline

table tr th p
  display: inline-flex
  font-weight: 400

h1
  a
    text-decoration: none

th
  position: relative

  span
    position: absolute
    bottom: 80%
    left: 50%
    margin-left: -45px
    padding: 0.25rem 0.5rem
    width: 80px
    background-color: white
    color: purple-500
    opacity: 0
    transition: 0.3s
    box-shadow(1)

th:hover > span
  opacity: 1

@media (max-width: 700px)
  .club
    display: none

.strikethrough
  text-decoration: line-through

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
