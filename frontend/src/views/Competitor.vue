<template>
  <div>
    <vue-headful
      :title="`Munro - ${competitor.name || ''} - Competitor`"
      :description="`Results for ${competitor.name || ''} in the ${
        competitor.league || ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/competitors/${$route.params.id}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <Layout v-if="competitor && competitor.name" hasMobileSubTitle>
      <template #title>
        <router-link
          :to="`/leagues/${competitor.league}`"
          class="mb-1 text-xl font-bold text-main-700 font-heading"
        >
          {{ competitor.league }}
        </router-link>
        <h1 class="text-4xl font-bold font-heading leading-12">
          {{ competitor.name }}
        </h1>
        <h2 class="text-xl text-gray-600 font-heading">
          <span class="mr-2 md:mr-4">{{ competitor.course }}</span>
          <span v-if="competitor.club" class="mr-2 md:mr-4">
            {{ competitor.club }}</span
          >
          <span v-if="competitor.ageClass"> {{ competitor.ageClass }}</span>
        </h2>
      </template>

      <div
        v-if="competitor && $auth.user"
        class="col-span-2 card card-color-dark"
      >
        <h2 class="text-3xl font-bold text-white font-heading">
          Admin Actions
        </h2>

        <div>
          <router-link
            :to="`/competitors/${$route.params.id}/edit`"
            class="button button-white"
            >Edit Competitor</router-link
          >
          <router-link to="/competitors/merge" class="button button-white"
            >Merge Competitors</router-link
          >
          <router-link to="/results/transfer" class="button button-white"
            >Transfer Result</router-link
          >
          <router-link to="/results/manual" class="button button-white"
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

import Layout from '@/components/Layout.vue'
import ResultOverviewCard from '@/components/cards/ResultOverviewCard.vue'

const NotFound = () => import('@/views/NotFound.vue')

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
