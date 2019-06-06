<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for eveent upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <div>
    <vue-headful
      :title="'Munro - '+$route.params.name"
      :description="'Event Information and Results for the '+ $route.params.name + ' league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features'"
      :url="'https://munro-leagues.herokuapp.com/leagues/'+$route.params.name"
      :head="{
        'meta': {name: 'robots', content:'all'},
      }"
    />
    <div v-if="league && league.name">
      <h1>{{ league.name }}</h1>
      <p v-if="league.description">{{ league.description }}</p>
      <p
        v-if="league.courses"
      >
        There are normally {{ league.courses.length }} courses - {{ league.courses.join(', ') }}
      </p>
      <p v-if="league.coordinator">{{ league.coordinator }} coordinates the league.</p>
      <p>
        <span
          v-if="league.scoringMethod"
        >The scoring for the league is calculated using a {{ scoringMethodShorthandToFull(league.scoringMethod) }}</span>
        &nbsp;
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
        <div class="results-actions">
          <router-link :to="$route.path+'/create-event'" class="button">Add Event</router-link>
          <router-link :to="$route.path+'/edit'" class="button">Edit League</router-link>
          <button @click="deleteLeague()">Delete League</button>
          <router-link
            :to="'/competitors/'+this.$route.params.name"
            class="button"
          >
            Manage Competitors
          </router-link>
        </div>
      </div>
      <div v-if="events" class="results">
        <h2>League Results</h2>
        <div class="results-actions">
          <router-link
            v-for="course of league.courses"
            :key="course"
            :to="$route.path + '/results/' + course"
            class="button"
          >
            {{ course }}
          </router-link>
        </div>
      </div>
      <div v-for="event of events" :key="event.name" class="event">
        <h2>{{ event.name }}</h2>
        <div v-if="auth.user" class="event-actions">
          <router-link :to="'/events/'+event.id+'/edit'" class="button">Edit Event</router-link>
          <router-link :to="'/upload/'+event.id" class="button">Upload Results</router-link>
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
        <p v-if="event.date">
          On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{ event.date.split('-')[0] }}
          <template
            v-if="event.organiser"
          >
            organised by {{ event.organiser }}
          </template>
        </p>
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
        </div>
      </div>
    </div>
    <not-found v-if="!league" />
  </div>
</template>
<script>
import axios from 'axios'
const NotFound = () => import('@/views/NotFound')

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
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average') return 'Position Based (99 Max, Reduced in a Draw)'
      else return ''
    },

    getLeague: function () {
      return axios.get('/api/leagues/' + this.$route.params.name)
        .then(response => { this.league = response.data })
        .catch(() => this.$messages.addMessage('Problem Getting League Details'))
    },

    getLeagueEvents: function () {
      if (this.league && this.league.name) {
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
