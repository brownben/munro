<!--
  League Form

  The form for Creating/ Updating Leagues

  On Create:
    - Show form

  On Edit:
    - Show Form
    - Fetch league data and display it (League Name from URL)
-->

<template>
  <div>
    <div v-if="!notFound">
      <h1 v-if="create">Create League</h1>
      <h1 v-if="!create">Edit League</h1>
      <form @submit.prevent="submit()">
        <label>Name:</label>
        <input v-model.trim="name" type="text">
        <label>Website:</label>
        <input v-model.trim="website" type="text">
        <label>Logo (URL):</label>
        <input v-model.trim="logo" type="text">
        <label>Coordinator:</label>
        <input v-model.trim="coordinator" type="text">
        <label>Scoring Method:</label>
        <dropdown-input v-model="scoringMethod" :list="['Position Based']" />
        <label>Number of Events to Count:</label>
        <input v-model.number="numberOfCountingEvents" type="number" min="1">
        <label>Courses: (Comma Separated)</label>
        <input v-model.trim="courses" type="text">
        <label>More Information:</label>
        <input v-model.trim="info" type="text">
        <button v-if="create">Create League</button>
        <button v-if="!create">Update League</button>
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
      notFound: false,
      create: true,
      oldName: '',
      name: '',
      website: '',
      logo: '',
      coordinator: '',
      scoringMethod: '',
      numberOfCountingEvents: 1,
      courses: '',
      info: '',
    }
  },

  // On Load
  mounted: function () {
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getLeagueDetails()
    }
  },

  methods: {
    validateForm: function () {
      return (this.name !== '' && this.scoringMethod !== '')
    },

    returnToLeaguePage: function (response) {
      this.$messages.addMessage(response.data.message)
      this.$router.push('/leagues/' + this.name)
    },

    // Scoring Method is stored in a shorthand form in database, transfer between these two forms so it is displayed in a clear manner
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based'
      else return ''
    },

    scoringMethodFullToShorthand: value => {
      if (value === 'Position Based') return 'position'
      return ''
    },

    getLeagueDetails: function () {
      return axios.get('/api/leagues/' + this.$route.params.name)
        .then(response => {
          if (!response.data) this.notFound = true
          else {
            this.oldName = response.data.name
            this.name = response.data.name
            this.website = response.data.website
            this.coordinator = response.data.coordinator
            this.scoringMethod = this.scoringMethodShorthandToFull(response.data.scoringMethod)
            this.numberOfCountingEvents = response.data.numberOfCountingEvents
            this.logo = response.data.logo
            if (response.data.courses) this.courses = response.data.courses.join(', ')
            this.info = response.data.moreInformation
          }
        })
        .catch(() => this.$messages.addMessage('Problem Fetching League Details'))
    },

    submit: function () {
      if (this.create) this.createLeague()
      else this.updateLeague()
    },

    createLeague: function () {
      if (this.validateForm()) {
        return axios.post('/api/leagues', {
          name: this.name,
          website: this.website,
          logo: this.logo,
          coordinator: this.coordinator,
          scoringMethod: this.scoringMethodFullToShorthand(this.scoringMethod),
          numberOfCountingEvents: this.numberOfCountingEvents,
          courses: this.courses,
          moreInformation: this.info,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Creating League - Please Try Again'))
      }
      else this.$messages.addMessage('Please Ensure Name and Scoring Method Fields are not Blank')
    },

    updateLeague: function () {
      if (this.validateForm()) {
        return axios.put('/api/leagues/' + this.oldName, {
          oldName: this.oldName,
          name: this.name,
          website: this.website,
          logo: this.logo,
          coordinator: this.coordinator,
          scoringMethod: this.scoringMethodFullToShorthand(this.scoringMethod),
          numberOfCountingEvents: this.numberOfCountingEvents,
          courses: this.courses,
          moreInformation: this.info,
        })
          .then(response => this.returnToLeaguePage(response))
          .catch(() => this.$messages.addMessage('Error: Problem Updating League - Please Try Again'))
      }
      else this.$messages.addMessage('Please Ensure Name and Scoring Method Fields are not Blank')
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

#error
  margin: 0.5rem 0
  padding: 0.2rem 0
  border: 1px solid purple-400
  color: purple-400
  text-align: center

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
