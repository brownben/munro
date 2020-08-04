<!--
  Result Transfer

  Change the competitor the result is credited to
-->

<template>
  <Layout title="Transfer Result">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Transfer Results"
      description
    />

    <form class="col-span-2" @submit.prevent="transfer">
      <DropdownInput
        v-model="league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
      />
      <DropdownInput
        v-model="event"
        :list="eventsInLeague.map((event) => event.name + ' - ' + event.date)"
        :include-blank="true"
        label="Event:"
        class="mt-4"
      />
      <DropdownInput
        v-model="course"
        :list="coursesInLeague"
        :include-blank="true"
        label="Course"
        class="mt-4"
      />
      <DropdownInput
        v-model="result"
        :list="
          resultsForEvent.map(
            (result) =>
              result.position +
              ' - ' +
              elapsedTime(result.time) +
              ' (' +
              result.name +
              ')'
          )
        "
        :include-blank="true"
        label="Result:"
        class="mt-4"
      />
      <DropdownInput
        v-model="competitor"
        :list="competitorsForLeague.map(competitorTransformForSelect)"
        :include-blank="true"
        label="Competitor:"
        class="mt-4"
      />

      <button class="mt-8 button-lg">Transfer Result</button>
    </form>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import DropdownInput from '@/components/inputs/DropdownInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
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
      const filtered = this.competitors.filter(
        (competitor) =>
          competitor.league === this.league && competitor.course === this.course
      )
      return filtered.sort((a, b) => (a.name > b.name) - (a.name < b.name))
    },

    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(
        (league) => league.name === this.league
      )
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },

    eventsInLeague: function () {
      return this.events.filter((event) => event.league === this.league)
    },

    resultsForEvent: function () {
      let event = ''
      const selectedEvent = this.events.filter(
        (event) =>
          event.name === this.event.split(' - ')[0] &&
          event.date === this.event.split(' - ')[1]
      )
      if (selectedEvent.length > 0) event = selectedEvent[0].id
      return this.results
        .filter(
          (result) => result.event === event && result.course === this.course
        )
        .sort((a, b) => {
          if (parseInt(a.position, 10) === parseInt(b.position, 10)) return 0
          else if (a.position === null || a.position === undefined) return 1
          else if (b.position === null || b.position === undefined) return -1
          else if (parseInt(a.position, 10) > parseInt(b.position, 10)) return 1
          else return -1
        })
    },
  },

  created: function () {
    this.getCompetitors()
    this.getLeagues()
    this.getEvents()
    this.getResults()
  },

  methods: {
    getCompetitors: function () {
      return axios
        .get('/api/competitors')
        .then((response) => {
          this.competitors = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Competitors'))
    },

    getLeagues: function () {
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Leagues'))
    },

    getEvents: function () {
      return axios
        .get('/api/events')
        .then((response) => {
          this.events = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Events'))
    },

    getResults: function () {
      return axios
        .get('/api/results')
        .then((response) => {
          this.results = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Results'))
    },

    validateForm: function () {
      return (
        this.event !== '' &&
        this.course !== '' &&
        this.result !== '' &&
        this.competitor !== ''
      )
    },

    twoDigits: function (number) {
      if (number.toString().length < 2) return `0${number.toString()}`
      else return number
    },

    elapsedTime: function (totalTimeInSeconds) {
      const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
      const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
      return `${this.twoDigits(timeInMinutes)}:${this.twoDigits(timeInSeconds)}`
    },

    elapsedTimeToSeconds: function (time) {
      return (
        parseInt(time.split(':')[0], 10) * 60 + parseInt(time.split(':')[1], 10)
      )
    },

    competitorTransformForSelect: function (competitor) {
      if (competitor.club && competitor.ageClass)
        return `${competitor.name} (${competitor.ageClass}, ${competitor.club}) [${competitor.id}]`
      else if (competitor.club)
        return `${competitor.name} (${competitor.club}) [${competitor.id}]`
      else if (competitor.ageClass)
        return `${competitor.name} (${competitor.ageClass}) [${competitor.id}]`
      else return `${competitor.name} [${competitor.id}]`
    },

    transfer: function () {
      if (this.validateForm()) {
        let event = ''
        const selectedEvent = this.events.find(
          (event) =>
            event.name === this.event.split(' - ')[0] &&
            event.date === this.event.split(' - ')[1]
        )
        if (selectedEvent) event = selectedEvent.id
        const competitor = this.competitor.replace(/.*\[|\]/g, '')
        const result = this.results.find(
          (result) =>
            result.course === this.course &&
            result.event === event &&
            result.time ===
              this.elapsedTimeToSeconds(
                this.result.match(/-.*\(/)[0].slice(2, -2)
              )
        )
        return axios
          .post('/api/results/transfer', {
            competitor: competitor,
            result: result.id,
          })
          .then((response) => this.returnToCompetitorsPage(response))
          .catch((error) =>
            this.$messages.addMessage(error.response.data.message)
          )
      } else
        this.$messages.addMessage('Please Select a Result and a Competitor')
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push(`/leagues/${this.league}/competitors`)
    },
  },
}
</script>
