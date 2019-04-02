<!--
  Home

  Home page of app, diaplying summary of all the leagues
-->

<template>
  <div>
    <div v-if="auth.user" class="card actions">
      <h2>Admin Actions</h2>
      <button @click="$router.push('/create-league')">Create New League</button>
      <button @click="$router.push('/upload')">Upload Results</button>
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
        <p v-if="league.moreInformation">{{ league.moreInformation }}</p>
        <p v-if="league.website">
          More information can be found at
          <a :href="league.website">{{ league.website }}</a>
        </p>
        <button @click="$router.push('/leagues/'+league.name)">View League</button>
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

<style lang="stylus">
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

.header
  position: absolute
  top: 3.5rem
  left: 0
  display: inline-flex
  flex: 1 0 10px
  justify-content: center
  align-items: center
  box-sizing: border-box
  margin-bottom: 1rem
  padding: 3rem 1.5rem
  width: 100vw
  background: url('../assets/images/largeBackground.png')
  background: url('../assets/images/largeBackground.svg')
  background-color: purple-300
  background-size: cover
  background-repeat: no-repeat
  color: white
  text-align: center
  box-shadow(1)

  #text
    padding-left: 7.5%

  img
    height: 12rem

  h1
    margin: 0.8rem 0
    color: white
    font-weight: 400
    font-size: 3rem

  h3
    margin: 0.5rem 0
    color: white
    font-weight: 300
    font-size: 1.5rem

@media (max-width: 700px)
  .header
    display: block
    padding: 1rem 1.5rem
    background: url('../assets/images/smallBackground.png')
    background: url('../assets/images/smallBackground.svg')
    background-color: purple-300
    background-size: cover
    background-repeat: no-repeat
    text-align: center

    img
      height: 10rem

    #text
      box-sizing: border-box
      padding: 0
      width: 100%

      h3
        margin: 14px
        margin-bottom: 0

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

#leagues
  display: grid
  margin-top: 1rem
  width: 100%
  grid-gap: 1.5rem
  grid-template-columns: 1fr 1fr

  @media (max-width: 700px)
    grid-template-columns: 1fr

#header
  img
    height: 250px
</style>
