<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for eveent upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <div>
    <div v-if="league">
      <h1>{{ league.name }}</h1>
      <p v-if="league.description">{{ league.description }}</p>
      <p
        v-if="league.courses"
      >There are normally {{ league.courses.length }} courses - {{ league.courses.join(', ') }}</p>
      <p v-if="league.coordinator">{{ league.coordinator }} coordinates the league.</p>
      <p>
        <span
          v-if="league.scoringMethod"
        >The scoring for the league is calculated using a {{ scoringMethodShorthandToFull(league.scoringMethod) }}</span>
        <span
          v-if="league.numberOfCountingEvents && league.numberOfEvents"
        >With your best {{ league.numberOfCountingEvents }} events from all {{ league.numberOfEvents }} events counting.</span>
      </p>
      <p v-if="league.website">
        More information can be found at
        <a
          :href="league.website"
          target="_blank"
          rel="noopener noreferrer"
        >{{ league.website }}</a>
      </p>

      <div v-if="auth.user" class="results">
        <h2>Admin Actions</h2>
        <div class=".results-actions">
          <button @click="$router.push($route.path+'/create-event')">Add Event</button>
          <button @click="$router.push($route.path+'/edit')">Edit League</button>
          <button @click="deleteLeague()">Delete League</button>
        </div>
      </div>
      <div v-if="events" class="results">
        <h2>League Results</h2>
        <div class=".results-actions">
          <button
            v-for="course of league.courses"
            :key="course"
            @click="$router.push($route.path + '/results/' + course)"
          >{{ course }}</button>
        </div>
      </div>
      <div v-for="event of events" :key="event.name" class="event">
        <h2>{{ event.name }}</h2>
        <div v-if="auth.user" class="event-actions">
          <button @click="$router.push('/events/'+event.id+'/edit')">Edit Event</button>
          <button @click="$router.push('/upload/'+event.id)">Upload Results</button>
          <button @click="deleteEvent(event)">Delete Event</button>
        </div>
        <p v-if="auth.user">
          <b>Event ID:</b>
          {{ event.id }}
        </p>
        <p v-if="auth.user && event.uploadKey">
          <b>Event Upload Key:</b>
          {{ event.uploadKey }}
        </p>
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
          <a v-if="event.results" :href="event.results" class="button">Results</a>
          <a v-if="event.winsplits" :href="event.winsplits" class="button">WinSplits</a>
          <a v-if="event.routegadget" :href="event.routegadget" class="button">Routegadget</a>
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
      auth: this.$auth,
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
        if (this.auth.user) {
          return axios.get('/api/leagues/' + this.league.name + '/events/uploadKey')
            .then(response => { this.events = response.data })
            .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
        }
        else {
          return axios.get('/api/leagues/' + this.league.name + '/events')
            .then(response => { this.events = response.data })
            .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
        }
      }
      return false
    },

    deleteLeague: function () {
      if (confirm('Are you Sure you Want to Delete League - ' + this.league.name + '? \nThis Action Can\'t Be Recovered')) {
        return axios.delete('/api/leagues/' + this.league.name)
          .then(() => {
            this.$messages.addMessage('League: ' + this.league.name + ' was Deleted')
            this.$router.push('/')
          })
          .catch(() => this.$messages.addMessage('Problem Deleting League - Please Try Again'))
      }
    },

    deleteEvent: function (event) {
      if (confirm('Are you Sure you Want to Delete Event - ' + event.name + '? \nThis Action Can\'t Be Recovered')) {
        return axios.delete('/api/events/' + event.id)
          .then(() => this.$messages.addMessage('Event: ' + event.name + ' was Deleted'))
          .then(() => this.getLeague())
          .then(() => this.getLeagueEvents())
          .catch(() => this.$messages.addMessage('Problem Deleting Event - Please Try Again'))
      }
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

.event-actions.event-result-actions .button
  margin-left:0.4rem
  margin-top:0

  &:first-child
    margin-left:0
</style>
