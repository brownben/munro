<!--
  Competitor Form

  The form for Creating/ Updating Competitor
-->

<template>
  <div>
    <div v-if="!notFound">
      <h1 v-if="create">Create Competitor</h1>
      <h1 v-if="!create">Edit Competitor</h1>
      <!-- @submit on submit via enter key in the last field, .prevent prevents page reload -->
      <form @submit.prevent="submit()">
        <label>Name:</label>
        <input v-model.trim="name" type="text">
        <label>Club:</label>
        <input v-model.trim="club" type="text">
        <label>Age Class:</label>
        <input v-model.trim="ageClass" type="text">
        <label>League:</label>
        <dropdown-input v-model="league" :list="leagues.map(league => league.name)" />
        <label>Course:</label>
        <dropdown-input v-model="league" :list="coursesInLeague" />
        <button v-if="create">Create Competitor</button>
        <button v-if="!create">Update Competitor</button>
      </form>
    </div>
    <not-found v-if="notFound" />
  </div>
</template>

<script>
import axios from 'axios'
import NotFound from '@/views/NotFound'
import DropdownInput from '@/components/DropdownInput'

export default {
  components: {
    'NotFound': NotFound,
    'DropdownInput': DropdownInput,
  },

  data: function () {
    return {
      id: '',
      notFound: false,
      create: true,
      leagues: [],
      name: '',
      club: '',
      ageClass: '',
      league: '',
      course: '',
    }
  },

  computed: {
    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(league => league.name === this.league)
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },
  },

  // On Load
  mounted: function () {
    this.getLeagues()
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getCompetitorDetails()
    }
  },

  methods: {
    submit: function () {
      if (this.create) this.createCompetitor()
      else this.updateCompetitor()
    },

    getCompetitorDetails: function () {
      return axios.get('/api/competitors/' + this.$route.params.id)
        .then(response => {
          if (!response.data) this.notFound = true
          else {
            this.id = this.$route.params.id
            this.name = response.data.name
            this.club = response.data.club
            this.ageClass = response.data.ageClass
            this.league = response.data.league
            this.course = response.data.course
          }
        })
        .catch(() => this.$messages.addMessage('Problem Getting Competitor Details'))
    },

    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching List of Leagues'))
    },

    validateForm: function () {
      return (this.name !== '' && this.league !== '' && this.course !== '')
    },

    createCompetitor: function () {
      if (this.validateForm()) {
        return axios.post('/api/competitors', {
          name: this.name,
          club: this.club,
          ageClass: this.ageClass,
          league: this.league,
          course: this.course,
        })
          .then(response => this.returnToCompetitorsPage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Creating Competitor - Please Try Again'))
      }
      else this.$messages.addMessage('Please Ensure Name and League Fields are not Blank')
    },

    updateCompetitor: function () {
      if (this.validateForm()) {
        return axios.put('/api/competitors/' + this.id, {
          id: this.id,
          name: this.name,
          club: this.club,
          ageClass: this.ageClass,
          league: this.league,
          course: this.course,
        })
          .then(response => this.returnToCompetitorsPage(response))
          .catch(error => this.$messages.addMessage(error.response.data.message))
      }
      else this.$messages.addMessage('Please Ensure Name and League Fields are not Blank')
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push('/competitors')
    },
  },
}

</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

h1
  margin-bottom: 0.5rem

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
