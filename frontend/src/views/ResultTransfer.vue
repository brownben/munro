<!--
  Result Transfer

  Change the competitor the result is credited to
-->

<template>
  <div>
    <h1>Transfer Result</h1>
    <form @submit.prevent="transfer()">
      <label>League:</label>
      <dropdown-input
        v-model="league"
        :list="leagues.map(league => league.name)"
        :include-blank="true"
      />
      <label>Event:</label>
      <dropdown-input
        v-model="event"
        :list="eventsInLeague.map(event => event.name + ' - ' + event.date)"
        :include-blank="true"
      />
      <label>Course:</label>
      <dropdown-input v-model="course" :list="coursesInLeague" :include-blank="true" />
      <label>Results:</label>
      <dropdown-input
        v-model="result"
        :list="resultsForEvent.map(result => result.position + ' - ' + elapsedTime(result.time) + ' (' + result.name + ')')"
        :include-blank="true"
      />
      <label>Competitor:</label>
      <dropdown-input
        v-model="competitor"
        :list="competitorsForLeague.map(competitorTransformForSelect)"
        :include-blank="true"
      />
      <button>Transfer Result</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import DropdownInput from '@/components/DropdownInput'

export default {
  components: {
    DropdownInput: DropdownInput,
  },

  data: () => ({
    competitors: [],
    leagues: [],
    events: [],
    results: [],
    league: '',
    event: '',
    course: '',
    competitor: '',
    result: '',
  }),

  computed: {
    competitorsForLeague: function () {
      const filtered = this.competitors.filter(competitor => competitor.league === this.league && competitor.course === this.course)
      return filtered.sort((a, b) => a.name > b.name)
    },

    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(league => league.name === this.league)
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },

    eventsInLeague: function () {
      return this.events.filter(event => event.league === this.league)
    },

    resultsForEvent: function () {
      let event = ''
      const selectedEvent = this.events.filter(event => event.name === this.event.split(' - ')[0] && event.date === this.event.split(' - ')[1])
      if (selectedEvent.length > 0) event = selectedEvent[0].id
      return this.results
        .filter(result => result.event === event && result.course === this.course)
        .sort((a, b) => {
          if (parseInt(a.position) === parseInt(b.position)) return 0
          else if (a.position === null || a.position === undefined) return 1
          else if (b.position === null || b.position === undefined) return -1
          else if (parseInt(a.position) > parseInt(b.position)) return 1
          else return -1
        })
    },
  },

  created: async function () {
    await this.getCompetitors()
    await this.getLeagues()
    await this.getEvents()
    await this.getResults()
  },

  methods: {
    getCompetitors: function () {
      return axios.get('/api/competitors')
        .then(response => { this.competitors = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Competitors'))
    },

    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Leagues'))
    },

    getEvents: function () {
      return axios.get('/api/events')
        .then(response => { this.events = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Events'))
    },

    getResults: function () {
      return axios.get('/api/results')
        .then(response => { this.results = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Results'))
    },

    validateForm: function () {
      return (this.event !== '' && this.course !== '' && this.result !== '')
    },

    twoDigits: function (number) {
      if (number.toString().length < 2) return '0' + number.toString()
      else return number
    },

    elapsedTime: function (totalTimeInSeconds) {
      const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
      const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
      return this.twoDigits(timeInMinutes) + ':' + this.twoDigits(timeInSeconds)
    },

    elapsedTimeToSeconds: function (time) {
      return parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
    },

    competitorTransformForSelect: function (competitor) {
      if (competitor.club && competitor.ageClass) return competitor.name + ' (' + competitor.ageClass + ', ' + competitor.club + ') [' + competitor.id + ']'
      else if (competitor.club) return competitor.name + ' (' + competitor.club + ') [' + competitor.id + ']'
      else if (competitor.ageClass) return competitor.name + ' (' + competitor.ageClass + ') [' + competitor.id + ']'
      else return competitor.name + ' [' + competitor.id + ']'
    },

    transfer: function () {
      if (this.validateForm()) {
        let event = ''
        const selectedEvent = this.events.find(event => event.name === this.event.split(' - ')[0] && event.date === this.event.split(' - ')[1])
        if (selectedEvent) event = selectedEvent.id
        const competitor = this.competitor.replace(/.*\[|\]/g, '')
        const result = this.results.find(result =>
          result.course === this.course &&
          result.event === event &&
          result.time === this.elapsedTimeToSeconds(this.result.match(/-.*\(/)[0].slice(2, -2))
        )
        return axios.post('/api/results/transfer', {
          competitor: competitor,
          result: result.id,
        })
          .then(response => this.returnToCompetitorsPage(response))
          .catch(error => this.$messages.addMessage(error.response.data.message))
      }
      else this.$messages.addMessage('The Competitors Selected are the Same')
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
</style>
