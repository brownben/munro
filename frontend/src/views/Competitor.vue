<template>
  <div>
    <vue-headful
      :title="`Munro - ${competitor.name} - Competitor`"
      :description="`Competitor Results on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features`"
      :url="`https://munro-leagues.herokuapp.com/competitors/${$route.params.id}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <Layout v-if="competitor && competitor.name">
      <div class="col-span-2 text-left">
        <router-link
          :to="`/leagues/${competitor.league}`"
          class="block mt-2 text-2xl font-bold font-heading text-main-600 md:text-25xl link"
        >
          {{ competitor.league }}
        </router-link>
        <h1
          class="my-1 text-4xl font-bold leading-10 md:my-3 md:text-5xl font-heading text-main-900"
        >
          {{ competitor.name }}
        </h1>
        <h2
          class="text-lg text-opacity-75 md:text-xl font-heading text-main-900"
        >
          <span v-if="competitor.club" class="mr-2 md:mr-4">
            {{ competitor.club }}</span
          >
          <span v-if="competitor.ageClass"> {{ competitor.ageClass }}</span>
        </h2>
      </div>

      <div v-if="competitor && $auth.user" class="col-span-2 card-color-dark">
        <h2 class="text-3xl font-bold text-white font-heading">
          Admin Actions
        </h2>

        <div>
          <router-link
            :to="`/competitors/${$route.params.id}/edit`"
            class="button-white"
            >Edit Competitor</router-link
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

      <ResultOverviewCard
        v-for="result of results"
        :key="result.id"
        :result="result"
        @resultChanged="getCompetitorResults"
      />
    </Layout>
    <not-found v-if="!competitor" />
  </div>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'
import ResultOverviewCard from '@/components/cards/ResultOverviewCard'

const NotFound = () => import('@/views/NotFound')

export default {
  components: {
    Layout,
    ResultOverviewCard,
    NotFound,
  },

  data: function () {
    return {
      competitor: {},
      results: [],
      auth: this.$auth,
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.getCompetitor()
        this.getCompetitorResults()
      },
    },
  },

  methods: {
    getCompetitor: function () {
      return axios
        .get(`/api/competitors/${this.$route.params.id}`)
        .then((response) => {
          this.competitor = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Getting Competitor Details')
        )
    },

    getCompetitorResults: function () {
      return axios
        .get(`/api/competitors/${this.$route.params.id}/results`)
        .then((response) => {
          this.results = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Getting Competitor Results')
        )
    },
  },
}
</script>
