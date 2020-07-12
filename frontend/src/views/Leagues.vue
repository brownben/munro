<!--
  Leagues

  List of leagues
-->

<template>
  <Layout title="Leagues">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Leagues"
      description="League Results on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/leagues"
    />

    <LeagueOverviewCard
      v-for="league of leagues"
      :key="league.name"
      :title="league.name"
      :description="league.description"
      :website="league.website"
    />
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'
import LeagueOverviewCard from '@/components/cards/LeagueOverviewCard'

export default {
  components: {
    Layout,
    LeagueOverviewCard,
  },

  data() {
    return {
      leagues: [],
    }
  },

  mounted: function () {
    this.getLeagues()
  },

  methods: {
    getLeagues: function () {
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching League Details')
        )
    },
  },
}
</script>
