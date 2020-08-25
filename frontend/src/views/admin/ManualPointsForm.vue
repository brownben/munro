<!--
  Result Transfer

  Change the competitor the result is credited to
-->

<template>
  <Layout title="Manual Points">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Manual Points"
      description
    />

    <form class="col-span-2" @submit.prevent="addResult">
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
        v-model="competitor"
        :list="competitorsForLeague.map(competitorTransformForSelect)"
        :include-blank="true"
        label="Competitor:"
        class="mt-4"
      />
      <number-input
        v-model.number="points"
        label="Points:"
        class="mt-4"
        :min="0"
        :max="10000"
      />

      <button class="mt-8 button-lg">Add Result</button>
    </form>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import NumberInput from '/@/components/inputs/NumberInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
    NumberInput,
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
    points: 0,
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
  },

  created: function () {
    this.getLeagues()
    this.getCompetitors()
    this.getEvents()
  },

  methods: {
    getCompetitors: function () {
      return axios
        .get('/api/competitors')
        .then((response) => {
          this.competitors = response.data
        })
        .catch(() =>
          this.$store.dispatch('createMessage', 'Problem Fetching Competitors')
        )
    },

    getLeagues: function () {
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$store.dispatch('createMessage', 'Problem Fetching Leagues')
        )
    },

    getEvents: function () {
      return axios
        .get('/api/events')
        .then((response) => {
          this.events = response.data
        })
        .catch(() =>
          this.$store.dispatch('createMessage', 'Problem Fetching Events')
        )
    },

    validateForm: function () {
      return this.event !== '' && this.course !== '' && this.competitor !== ''
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

    addResult: function () {
      if (!this.validateForm())
        this.$store.dispatch(
          'createMessage',
          'Please Select a Competitor and an Event'
        )
      else {
        const selectedEvent = this.events.find(
          (event) =>
            event.name === this.event.split(' - ')[0] &&
            event.date === this.event.split(' - ')[1]
        )
        if (!selectedEvent)
          this.$store.dispatch('createMessage', 'No Event Selected')
        else {
          let event = selectedEvent.id
          const competitor = this.competitor.replace(/.*\[|\]/g, '')

          return axios
            .post('/api/results/manual', {
              competitor: competitor,
              points: this.points,
              event: event,
            })
            .then((response) => this.returnToCompetitorsPage(response))
            .catch((error) =>
              this.$store.dispatch('createMessage', error.response.data.message)
            )
        }
      }
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$store.dispatch('createMessage', response.data.message)
      this.$router.push(`/leagues/${this.league}/competitors`)
    },
  },
}
</script>
