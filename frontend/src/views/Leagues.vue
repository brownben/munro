<!--
  Leagues

  List of leagues
-->

<template>
  <div class="view">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Leagues"
      description="League Results on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/leagues"
    />
    <h1 class="text-main text-3xl font-normal font-heading">Leagues</h1>
    <div class="flex flex-wrap flex-row">
      <div
        v-for="league of leagues"
        :key="league.name"
        class="w-full md:w-1/2 my-4 md:px-4"
      >
        <div class="h-full w-full card">
          <h1 class="text-2xl font-heading my-2">{{ league.name }}</h1>
          <p v-if="league.description">{{ league.description }}</p>
          <p v-if="league.website">
            More information can be found on their
            <a
              :href="league.website"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              >website</a
            >
          </p>
          <router-link :to="'/leagues/' + league.name" class="button"
            >View League</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      leagues: [],
    }
  },

  created: function() {
    this.getLeagues()
  },

  methods: {
    getLeagues: function() {
      return axios
        .get('/api/leagues')
        .then(response => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching League Details')
        )
    },
  },
}
</script>
