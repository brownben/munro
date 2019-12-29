<!--
  Leagues

  List of leagues
-->

<template>
  <div>
    <vue-headful
      title="Munro - Leagues"
      description="League Results on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/leagues"
      :head="{
        'meta': {name: 'robots', content:'all'},
      }"
    />
    <h1>Leagues</h1>
    <div id="leagues">
      <div v-for="league of leagues" :key="league.name" class="league">
        <img
          v-if="league.logo"
          :src="league.logo"
          :alt="'The Logo of ' + league.name"
          height="150px"
        />
        <h1>{{ league.name }}</h1>
        <p v-if="league.description">{{ league.description }}</p>
        <p v-if="league.website">
          More information can be found
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
          >here</a>
        </p>
        <router-link :to="'/leagues/'+league.name" class="button">View League</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      leagues: [],
    }
  },

  created: function () {
    this.getLeagues()
  },

  methods: {
    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching League Details'))
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

h1
  margin-bottom: 0.5rem

.league
  text-align: center
  box-shadow(1)
  box-sizing: border-box
  padding: 1rem

  button
    margin-top: 0.5rem

.actions
  margin-left: 5%
  width: 90%

  button
    border: 0
    box-shadow(1)
    margin-right: 1rem
    padding: 0.5rem 1.5rem
    border: 0

    &:hover
      background-color: white
      color: purple-500
      box-shadow(2)

  @media (max-width: 700px)
    button
      margin-top: 0.5rem
      margin-left: 0
      width: 100%

#leagues
  display: grid
  margin-top: 1rem
  grid-gap: 1.5rem
  grid-template-columns: 1fr 1fr

  @media (max-width: 700px)
    grid-template-columns: 1fr
</style>
