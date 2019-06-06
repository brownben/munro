<!--
  Competitors

  Displays list of competitors
-->

<template>
  <div>
    <vue-headful
      title="Munro - Competitors"
      description
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <h1>Competitors</h1>
    <div class="actions">
      <h2>Actions</h2>
      <div>
        <router-link to="/create-competitor" class="button">Add Competitor</router-link>
        <router-link to="/competitors/merge" class="button">Merge Competitors</router-link>
        <router-link to="/results/transfer" class="button">Transfer Result</router-link>
        <div id="filter">
          <label>League:</label>
          <dropdown-input v-model="league" :list="leagues.map(league => league.name)" />
        </div>
      </div>
    </div>

    <table v-if="filteredCompetitors.length > 0">
      <thead>
        <tr>
          <th @click="sortBy('name')">
            <p>Name</p>
            <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'name'" />
          </th>
          <th @click="sortBy('club')">
            <p>Club</p>
            <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'club'" />
          </th>
          <th @click="sortBy('ageClass')">
            <p>Class</p>
            <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'ageClass'" />
          </th>
          <th @click="sortBy('course')">
            <p>Course</p>
            <up-down-arrow :ascending="ascendingSort" :active="sortedBy === 'course'" />
          </th>
        </tr>
      </thead>
      <tbody is="transition-group" name="fade">
        <tr
          v-for="competitor of sortedCompetitors"
          :key="competitor.name+competitor.league+competitor.course"
          :class="{ striped: sortedCompetitors.indexOf(competitor) % 2 === 0 }"
          @click="$router.push('/competitors/' + competitor.id + '/edit')"
        >
          <td>{{ competitor.name }}</td>
          <td>{{ competitor.club }}</td>
          <td>{{ competitor.ageClass }}</td>
          <td>{{ competitor.course }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import UpDownArrow from '@/components/UpDownArrows'
import DropdownInput from '../components/DropdownInput.vue'

export default {
  components: {
    UpDownArrow: UpDownArrow,
    DropdownInput: DropdownInput,
  },

  data: () => ({
    league: '',
    leagues: [],
    competitors: [],
    ascendingSort: false,
    sortedBy: 'name',
  }),

  computed: {
    filteredCompetitors: function () {
      return this.competitors.filter(competitor => competitor.league === this.league)
    },

    sortedCompetitors: function () {
      return this.sort(
        this.filteredCompetitors,
        this.sortedBy,
        this.ascendingSort)
    },
  },

  created: async function () {
    if (this.$route.params.league && this.$route.params.league !== '') this.league = this.$route.params.league
    this.getLeagues()
    this.getCompetitors()
  },

  methods: {
    getCompetitors: function () {
      return axios.get('/api/competitors')
        .then(response => { this.competitors = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Competitor Details'))
    },

    sort: function (array, property, ascending = true) {
      // Selection Sort using Single List for Sorting Results

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

    sortBy: function (sortBy) {
      // Change what property it is sorted by
      // If it is a different property, make it sort ascending else change direction of sort
      if (sortBy !== this.sortedBy) this.ascendingSort = false
      else this.ascendingSort = !this.ascendingSort
      this.sortedBy = sortBy
    },

    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching List of Leagues'))
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'
@import '../assets/styles/table.styl'

#router-view
  padding: 1rem 10%

  @media (max-width: 700px)
    padding: 1rem 5%

h1
  margin-bottom: 0.5rem

table tr th p
  display: inline-flex
  font-weight: 400

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

.actions
  box-sizing: border-box
  margin-top: 1rem
  margin-bottom: 1rem
  padding: 0.75rem
  box-shadow(1)

  &:first-child
    margin-top: 0.75rem

  h2, p
    padding: 0.2rem 0

  div
    margin: 0.25rem 0 0
    font-size: 0

    button, .button
      margin-top: 0
      margin-left: 0.4rem

      @media (max-width: 700px)
        box-sizing: border-box
        margin: 0
        margin-top: 0.5rem
        width: 100%
        text-align: center

      &:first-child
        margin-left: 0

    a
      text-decoration: none
      font-size: 1rem
</style>
