<!--
  Leagues

  List of leagues
-->

<template>
  <Layout title="Leagues" :footer="leagues && leagues.length > 0">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Leagues"
      description="League Results on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
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

import Layout from '@/components/Layout.vue'
import LeagueOverviewCard from '@/components/cards/LeagueOverviewCard.vue'

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
