<!--
  League Events Page for Embedding
-->

<template>
  <div>
    <div v-if="league">
      <div v-for="event of events" :key="event.name" class="event">
        <h2>{{ event.name }}</h2>
        <p
          v-if="event.date"
        >On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{ event.date.split('-')[0] }} organised by {{ event.organiser }}</p>
        <p v-if="event.moreInformation">{{ event.moreInformation }}</p>
        <p v-if="event.website">
          More Information can be found at
          <a
            :href="event.website"
            target="_blank"
            rel="noopener noreferrer"
          >{{ event.website }}</a>
        </p>
        <div v-if="event.resultUploaded" class="event-actions event-result-actions">
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
          <p
            v-if="!event.results && !event.winsplits && !event.routegadget"
          >No Result Links Uploaded - Please Check The Event's Website To See If Results Have Been Uploaded</p>
        </div>
      </div>
    </div>
    <not-found v-if="!league" />
  </div>
</template>
<script>
import axios from 'axios'
import NotFound from '@/views/NotFound'

export default {
  components: {
    'NotFound': NotFound,
  },

  data: function () {
    return {
      league: {},
      events: [],
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    '$route': async function () {
      await this.getLeague()
      this.getLeagueEvents()
    },
  },

  mounted: async function () {
    // Get details on load
    await this.getLeague()
    this.getLeagueEvents()
  },

  methods: {
    scoringMethodShorthandToFull: function (method) {
      if (method === 'position') return 'position based method (100 max).'
      else if (method === 'position50') return 'position based method (50 max).'
      else return ''
    },

    getLeague: function () {
      return axios.get('/api/leagues/' + this.$route.params.name)
        .then(response => { this.league = response.data })
        .catch(() => this.$messages.addMessage('Problem Getting League Details'))
    },

    getLeagueEvents: function () {
      if (this.league) {
        return axios.get('/api/leagues/' + this.league.name + '/events')
          .then(response => { this.events = response.data })
          .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
      }
      return false
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
    margin: 0.4rem 0 0
    font-size: 0

    button
      &:first-child
        margin-left: 0

    a
      text-decoration: none
      font-size: 1rem

  .event-result-actions
    margin: 0.5rem 0 0

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
</style>
