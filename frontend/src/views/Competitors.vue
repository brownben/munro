<!--
  Competitors

  Displays list of competitors
-->

<template>
  <Layout title="Competitors">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Competitors"
      description
    />

    <div class="col-span-2 card">
      <h2 class="text-3xl font-bold text-main-800 font-heading">Actions</h2>

      <div>
        <router-link to="/create-competitor" class="button"
          >Add Competitor</router-link
        >
        <router-link to="/competitors/merge" class="button"
          >Merge Competitors</router-link
        >
        <router-link to="/results/transfer" class="button"
          >Transfer Result</router-link
        >
        <router-link to="/results/manual" class="button"
          >Manual Points</router-link
        >
      </div>

      <div class="w-full mt-6 text-left">
        <dropdown-input
          v-model="league"
          :list="leagues.map((league) => league.name)"
          :shift="false"
          label="League:"
        />
      </div>
    </div>

    <table
      v-if="filteredCompetitors.length > 0"
      class="table col-span-2 my-4 table-fixed"
    >
      <thead>
        <tr>
          <th @click="sortBy('name')">
            <p>Name</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'name'"
            />
          </th>
          <th @click="sortBy('club')">
            <p>Club</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'club'"
            />
          </th>
          <th @click="sortBy('ageClass')">
            <p>Class</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'ageClass'"
            />
          </th>
          <th @click="sortBy('course')">
            <p>Course</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'course'"
            />
          </th>
        </tr>
      </thead>
      <tbody is="transition-group" name="fade">
        <tr
          v-for="competitor of sortedCompetitors"
          :key="competitor.name + competitor.league + competitor.course"
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
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'
import UpDownArrow from '@/components/UpDownArrows'
import DropdownInput from '@/components/DropdownInput.vue'

export default {
  components: {
    Layout,
    UpDownArrow,
    DropdownInput,
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
      return this.competitors.filter(
        (competitor) => competitor.league === this.league
      )
    },

    sortedCompetitors: function () {
      return this.sort(
        this.filteredCompetitors,
        this.sortedBy,
        this.ascendingSort
      )
    },
  },

  created: function () {
    if (this.$route.params.league && this.$route.params.league !== '')
      this.league = this.$route.params.league
    this.getLeagues()
    this.getCompetitors()
  },

  methods: {
    getCompetitors: function () {
      return axios
        .get('/api/competitors')
        .then((response) => {
          this.competitors = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching Competitor Details')
        )
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
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching List of Leagues')
        )
    },
  },
}
</script>
<style lang="postcss">
.table {
  @apply w-full;
}

.table tr {
  transition: 0.3s;
  @apply bg-white;
}

.table tr:hover:not(.mobile-table-expansion) {
  @apply bg-main-200;
}

.table tr.striped {
  @apply bg-main-50;
}

thead tr {
  @apply border-b border-main-200;
}

.table td {
  @apply text-center py-2 px-1 font-body font-light;
}

.table th {
  white-space: nowrap;
  @apply font-heading select-none text-center font-normal py-2;
}

.table th p {
  @apply inline-block;
}
.table th div {
  @apply inline-block ml-1;
}
</style>
