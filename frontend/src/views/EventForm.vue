<!--
  Event Form

  The form for Creating/ Updating Events

  On Create:
    - Show form
  - Fetch Leagues
  - Autofill league if passed in the URL

  On Edit:
    - Show Form
    - Fetch leagues
    - Fetch event data and display it (Event ID from URL)
-->

<template>
  <div>
    <div v-if="!notFound">
      <h1 v-if="create">Create Event</h1>
      <h1 v-if="!create">Edit Event</h1>
      <!-- @submit on submit via enter key in the last field, .prevent prevents page reload -->
      <form @submit.prevent="submit()">
        <label>Name:</label>
        <input v-model.trim="name" type="text">
        <label>Date: (DD/MM/YYYY)</label>
        <input v-model="date" type="date">
        <label>Club:</label>
        <input v-model.trim="organiser" type="text">
        <label>Website:</label>
        <input v-model.trim="website" type="text">
        <label>Results: (URL)</label>
        <input v-model.trim="results" type="text">
        <label>Winsplits: (URL)</label>
        <input v-model.trim="winsplits" type="text">
        <label>Routegadget: (URL)</label>
        <input v-model.trim="routegadget" type="text">
        <label>League:</label>
        <dropdown-input v-model="league" :list="leagues.map(league => league.name)" />
        <label>More Information:</label>
        <input v-model.trim="moreInformation" type="text">
        <button v-if="create">Create Event</button>
        <button v-if="!create">Update Event</button>
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
      date: '',
      resultUploaded: false,
      organiser: '',
      moreInformation: '',
      website: '',
      results: '',
      winsplits: '',
      routegadget: '',
      league: this.$route.params.league,
    }
  },

  // On Load
  mounted: function () {
    this.getLeagues()
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getEventDetails()
    }
  },

  methods: {
    submit: function () {
      if (this.create) this.createEvent()
      else this.updateEvent()
    },

    getEventDetails: function () {
      return axios.get('/api/events/' + this.$route.params.id)
        .then(response => {
          if (!response.data) this.notFound = true
          else {
            this.id = this.$route.params.id
            this.name = response.data.name
            this.date = response.data.date
            this.resultUploaded = response.data.resultUploaded
            this.organiser = response.data.organiser
            this.moreInformation = response.data.moreInformation
            this.website = response.data.website
            this.results = response.data.results
            this.winsplits = response.data.winsplits
            this.routegadget = response.data.routegadget
            this.league = response.data.league
          }
        })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },

    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching List of Leagues'))
    },

    validateForm: function () {
      return (this.name !== '' && this.league !== '')
    },

    createEvent: function () {
      if (this.validateForm()) {
        return axios.post('/api/events', {
          name: this.name,
          date: this.date,
          resultUploaded: this.resultUploaded,
          organiser: this.organiser,
          moreInformation: this.moreInformation,
          website: this.website,
          results: this.results,
          winsplits: this.winsplits,
          routegadget: this.routegadget,
          league: this.league,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Creating Event - Please Try Again'))
      }
      else this.$messages.addMessage('Please Ensure Name and League Fields are not Blank')
    },

    updateEvent: function () {
      if (this.validateForm()) {
        return axios.put('/api/events/' + this.id, {
          name: this.name,
          date: this.date,
          resultUploaded: this.resultUploaded,
          organiser: this.organiser,
          moreInformation: this.moreInformation,
          website: this.website,
          results: this.results,
          winsplits: this.winsplits,
          routegadget: this.routegadget,
          league: this.league,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(error => this.$messages.addMessage(error.message))
      }
      else this.$messages.addMessage('Please Ensure Name and League Fields are not Blank')
    },

    returnToLeaguePage: function (response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push('/leagues/' + this.league)
    },
  },
}

</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

#router-view
  margin-left: 5%
  padding-top: 1rem
  width: 90%

h1
  margin-bottom: 0.5rem

button
  margin-top: 0.5rem

input, select
  width: 100% !important

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
