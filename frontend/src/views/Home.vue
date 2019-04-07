<!--
  Home

  Home page of app, displaying summary of all the leagues
-->

<template>
  <div>
    <div id="header">
      <img src="/static/UnDrawRunningWhite.svg">
      <h2>Fast and Easy Results for Orienteering Leagues</h2>
    </div>
    <div v-if="auth.user" class="card actions">
      <h2>Admin Actions</h2>
      <div>
        <button @click="$router.push('/create-league')">Create New League</button>
        <button @click="$router.push('/upload')">Upload Results</button>
        <button @click="$router.push('/competitors')">Manage Competitors</button>
      </div>
    </div>
    <div id="leagues">
      <div v-for="league of leagues" :key="league.name" class="league">
        <img
          v-if="league.logo"
          :src="league.logo"
          :alt="'The Logo of ' + league.name"
          height="150px"
        >
        <h1>{{ league.name }}</h1>
        <p v-if="league.description">{{ league.description }}</p>
        <p v-if="league.website">
          More information can be found at
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
          >{{ league.website }}</a>
        </p>
        <button @click="$router.push('/leagues/'+league.name)">View League</button>
      </div>
      <div id="about" class="card">
        <img src="/static/MunroLogo.png" alt="Munro Logo">
        <h1>About</h1>
        <div class="text">
          <p>Munro was created by Ben Brown for his Advanced Higher Computing Project. It is designed to be fast and easy to use, offering sorting and filtering on the results. It also has easy upload supporting various upload formats to make the upload as quick and easy as possible for event organisers.</p>
          <p>Munro is still under development so any feedback or comments would be welcome, please send them to munro.leagues(a)gmail.com</p>
          <p>For any help or enquires please email munro.leagues(a)gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      leagues: [],
      auth: this.$auth,
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

#router-view
  padding: 0

#header
  box-sizing: border-box
  margin-top: -3.5rem
  padding: 4rem 10% 0.5rem
  background: main-color
  background: linear-gradient(203deg, rgba(184, 11, 218, 1) 15%, rgba(230, 109, 255, 1) 100%)
  box-shadow(1)
  display: flex
  flex-direction: row-reverse
  justify-content: space-evenly
  align-items: center

  h1, h2
    padding: 2rem 2rem 1.5rem
    color: white
    font-size: 2.5rem

    @media (max-width: 1000px)
      font-size: 2rem

  img
    padding: 1.5rem 3rem 2rem
    height: 250px

  @media (max-width: 700px)
    display: block
    padding: 4rem 0 0.5rem
    text-align: center

    h2
      padding: 3rem 1rem 0.5rem
      font-size: 1.5rem

    img
      padding: 0

#leagues
  display: grid
  box-sizing: border-box
  margin-top: 1.5rem
  margin-bottom: 2rem
  padding: 0 15%
  grid-gap: 1.5rem
  grid-template-columns: 1fr 1fr

  @media (max-width: 1000px)
    padding: 0 10%

  @media (max-width: 700px)
    padding: 0 5%
    grid-template-columns: 1fr

#about
  text-align: center
  grid-column: span 2

  img
    height: 8rem

  @media (max-width: 700px)
    grid-column: span 1

.card
  box-shadow(1)
  box-sizing: border-box
  padding: 0.75rem

  h1
    padding: 0.25rem 0

  button
    margin-top: 0.5rem

.league
  text-align: center
  box-shadow(1)
  box-sizing: border-box
  padding: 0.75rem

  h1
    padding: 0.25rem 0

  button
    margin-top: 0.5rem

.actions
  margin: 0 15%
  margin-top: 1.5rem

  @media (max-width: 1000px)
    margin: 0 10%
    margin-top: 1.5rem

  @media (max-width: 700px)
    margin: 0 5%
    margin-top: 1.5rem

  button
    margin-left: 0.4rem

    &:first-child
      margin-left: 0

    @media (max-width: 700px)
      margin: 0
      margin-top: 0.5rem
      width: 100%
</style>
