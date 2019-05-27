<!--
  Latest Results

  List of events with the latest results
-->

<template>
  <div>
    <vue-headful
      title="Munro - Latest Results"
      description="The latest results from events on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/latest-results"
    />
    <h1>Latest Results</h1>
    <div v-for="event of events" :key="event.name" class="event">
      <h2>{{ event.league }} - {{ event.name }}</h2>
      <p v-if="event.date">
        On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{ event.date.split('-')[0] }}
        <template
          v-if="event.organiser"
        >
          organised by {{ event.organiser }}
        </template>
      </p>
      <p v-if="event.website">
        More Information can be found at
        <a
          :href="event.website"
          target="_blank"
          rel="noopener noreferrer"
        >{{ event.website }}</a>
      </p>
      <div class="event-actions event-result-actions">
        <a
          v-if="event.results"
          :href="event.results"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >Results</a>
        <a
          v-if="event.winsplits"
          :href="event.winsplits"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >WinSplits</a>
        <a
          v-if="event.routegadget"
          :href="event.routegadget"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >Routegadget</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      events: [],
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    '$route': async function () {
      this.getEventsWithResults()
    },
  },

  mounted: async function () {
    // Get details on load
    this.getEventsWithResults()
  },

  methods: {
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average') return 'Position Based (99 Max, Reduced in a Draw)'
      else return ''
    },

    getEventsWithResults: function () {
      return axios.get('/api/events/latest-results')
        .then(response => { this.events = response.data })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

#league-header
  margin-bottom: 1rem

button
  margin: 0.25rem

.event, .results
  box-sizing: border-box
  margin-top: 1rem
  padding: 0.75rem
  box-shadow(1)

  &:first-child
    margin-top: 0.75rem

  h2, p
    padding: 0.2rem 0

  .event-actions, .results-actions
    font-size: 0

    button, .button
      margin-left: 0.4rem

      &:first-child
        margin-left: 0

    a
      text-decoration: none
      font-size: 1rem

  .event-result-actions
    margin: 0.5rem 0 0

  .results-actions
    a
      margin-top: 0.4rem

button, .button
  @media (max-width: 700px)
    display: inline-block
    box-sizing: border-box
    margin: 0
    margin-top: 0.5rem
    width: 100%
    text-align: center

.event .event-actions
  @media (max-width: 700px)
    margin: 0

.event-actions.event-result-actions .button
  margin-top: 0
  margin-left: 0.4rem

  &:first-child
    margin-left: 0

  @media (max-width: 700px)
    margin-top: 0.5rem
    margin-left: 0
</style>
