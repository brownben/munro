<!--
  Competitors

  Displays list of competitors
-->

<template>
  <Layout>
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Competitors"
      description
    />
    <h1
      class="col-span-2 font-bold text-left text-25xl md:text-3xl font-heading text-main-900"
    >
      <router-link
        :to="'/leagues/' + $route.params.league"
        class="link text-main-700"
      >
        {{ $route.params.league && $route.params.league.trim() }}
      </router-link>
      <span class="hidden ml-2 mr-3 md:inline-block">-</span>
      <span class="block text-35xl md:inline-block"> Competitors</span>
    </h1>

    <div class="col-span-2 card-color-dark">
      <h2 class="text-3xl font-bold text-white font-heading">Admin Actions</h2>

      <div class="w-full">
        <router-link to="/competitors/create" class="button-white"
          >Add Competitor</router-link
        >
        <router-link to="/competitors/merge" class="button-white"
          >Merge Competitors</router-link
        >
        <router-link to="/results/transfer" class="button-white"
          >Transfer Result</router-link
        >
        <router-link to="/results/manual" class="button-white"
          >Manual Points</router-link
        >
      </div>
    </div>

    <table
      v-if="filteredCompetitors.length > 0"
      class="table col-span-2 my-4 table-fixed"
    >
      <thead>
        <tr>
          <th @click="sortBy('id')">
            <p>Id</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'id'"
            />
          </th>
          <th class="text-left" @click="sortBy('name')">
            <p>Name</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'name'"
            />
          </th>
          <th class="club" @click="sortBy('club')">
            <p>Club</p>
            <up-down-arrow
              :ascending="ascendingSort"
              :active="sortedBy === 'club'"
            />
          </th>
          <th class="ageClass" @click="sortBy('ageClass')">
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
          :key="competitor.id"
          :class="{ striped: sortedCompetitors.indexOf(competitor) % 2 === 0 }"
          @click="$router.push(`/competitors/${competitor.id}`)"
        >
          <td class="text-center">{{ competitor.id }}</td>
          <td>
            <span class="block font-normal text-left md:font-light">
              {{ competitor.name }}
            </span>
            <span class="block text-xs md:hidden">
              <span v-if="competitor.ageClass" class="mr-4">
                {{ competitor.ageClass }}
              </span>
              <span>{{ competitor.club }}</span>
            </span>
          </td>
          <td class="text-center club">{{ competitor.club }}</td>
          <td class="text-center ageClass">{{ competitor.ageClass }}</td>
          <td class="text-center">{{ competitor.course }}</td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import UpDownArrow from '@/components/UpDownArrows.vue'

export default {
  components: {
    Layout,
    UpDownArrow,
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
        (competitor) => competitor.league === this.$route.params.league
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

  watch: {
    $route: function () {
      this.getCompetitors()
    },
  },

  mounted: function () {
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
    @apply py-2 px-1 font-body font-light;
  }

  & th {
    white-space: nowrap;
    @apply font-heading select-none font-normal py-2;

    & p {
      @apply inline-block;
    }

    & div {
      @apply inline-block ml-1;
    }
  }

  & td,
  & th {
    &.club,
    &.ageClass {
      @apply hidden;
    }

    @screen md {
      &.club,
      &.ageClass {
        @apply table-cell;
      }
    }
  }
}
</style>
