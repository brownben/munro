<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for eveent upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <div>
    <div v-if="league">
      <div id="league-header">
        <h1>{{ league.name }}</h1>
        <p v-if="league.moreInformation">{{ league.moreInformation }}</p>
        <p
          v-if="league.courses"
        >There are normally {{ league.courses.length }} courses - {{ league.courses.join(', ') }}</p>
        <p v-if="league.coordinator">{{ league.coordinator }} coordinates the league.</p>
        <p>
          <span
            v-if="league.scoringMethod"
          >The scoring for the league is calculated using a {{ league.scoringMethod }} based method.</span>
          <span
            v-if="league.numberOfCountingEvents && league.numberOfEvents"
          >With your best {{ league.numberOfCountingEvents }} events from all {{ league.numberOfEvents }} events counting.</span>
        </p>
        <p v-if="league.website">
          More information can be found at
          <a :href="league.website">{{ league.website }}</a>
        </p>
      </div>
      <div v-if="auth.isLoggedIn" class="actions">
        <button @click="$router.push($route.path+'/create-event')">Add Event</button>
        <button @click="$router.push($route.path+'/edit')">Edit League</button>
        <button @click="deleteLeague()">Delete League</button>
      </div>
      <div class="actions">
        <button
          v-for="course of league.courses"
          :key="course"
          @click="$router.push($route.path + '/' + course)"
        >{{ course }}</button>
      </div>
      <div class="events">
        <div v-for="event of events" :key="event.name" class="event">
          <h2>{{ event.name }}</h2>
          <div v-if="auth.isLoggedIn" class="event-actions">
            <button @click="$router.push('/events/'+event.id+'/edit')">Edit Event</button>
            <button @click="$router.push('/upload/'+event.id)">Upload Results</button>
            <button @click="deleteEvent(event)">Delete Event</button>
          </div>
          <p v-if="auth.isLoggedIn">
            <b>Event ID:</b>
            {{ event.id }}
          </p>
          <p v-if="auth.isLoggedIn && event.uploadKey">
            <b>Event Upload Key:</b>
            {{ event.uploadKey }}
          </p>
          <p>On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{ event.date.split('-')[0] }} organised by {{ event.organiser }}</p>
          <p v-if="event.moreInformation">{{ event.moreInformation }}</p>
          <p v-if="event.website">
            More Information can be found at
            <a :href="event.website">{{ event.website }}</a>
          </p>
          <div v-if="event.resultUploaded" class="event-actions">
            <a v-if="event.results" :href="event.results" class="button">Results</a>
            <a v-if="event.winsplits" :href="event.winsplits" class="button">WinSplits</a>
            <a v-if="event.routegadget" :href="event.routegadget" class="button">Routegadget</a>
          </div>
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
    '$route': function () {
      this.getLeague()
        .then(() => this.getLeagueEvents())
    },
  },

  mounted: function () {
    // Get details on load
    this.getLeague()
      .then(() => this.getLeagueEvents())
  },

  methods: {
    getLeague: function () {
      return axios.get('/api/leagues/' + this.$route.params.name)
        .then(response => { this.league = response.data })
        .catch(() => this.$messages.addMessage('Problem Getting League Details'))
    },

    getLeagueEvents: function () {
      if (this.league) {
        if (this.auth.isLoggedIn) {
          axios.get('/api/leagues/' + this.league.name + '/events/uploadKey')
            .then(response => { this.events = response.data })
            .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
        }
        else {
          axios.get('/api/leagues/' + this.league.name + '/events')
            .then(response => { this.events = response.data })
            .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
        }
      }
    },

    deleteLeague: function () {
      if (confirm('Are you Sure you Want to Delete League - ' + this.league.name + '? \nThis Action Can\'t Be Recovered')) {
        axios.delete('/api/leagues/' + this.league.name)
          .then(() => {
            this.$messages.addMessage('League: ' + this.league.name + ' was Deleted')
            this.$router.push('/')
          })
          .catch(() => this.$messages.addMessage('Problem Deleting League - Please Try Again'))
      }
    },

    deleteEvent: function (event) {
      if (confirm('Are you Sure you Want to Delete Event - ' + event.name + '? \nThis Action Can\'t Be Recovered')) {
        axios.delete('/api/events/' + event.id)
          .then(() => {
            this.$messages.addMessage('Event: ' + event.name + ' was Deleted')
            this.getLeague()
              .then(() => this.getLeagueEvents())
          })
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
  padding: 0.5rem 5% 1rem
  background-color: purple-400
  color: white
  box-shadow(1.5)

  h1
    padding: 0.5rem 0
    color: white
    font-size: 2.5rem

  p, a
    color: white

  @media (max-width: 700px)
    margin-bottom: 1.5rem
    padding: 1rem
    padding-top: 0.5rem

.actions
  margin-left: 5%
  width: 90%

  button
    border: 0
    box-shadow(1)
    margin-right: 1rem
    margin-bottom: 0.75rem
    padding: 0.5rem 1.5rem
    border: 0

    &:hover
      background-color: white
      color: purple-500
      box-shadow(2)

  @media (max-width: 700px)
    button
      margin-top: 0.5rem
      margin-left: 0
      width: 100%

.event
  box-sizing: border-box
  margin-top: 1.5rem
  margin-left: 5%
  padding: 0.75rem
  width: 90%
  box-shadow(1)

  &:first-child
    margin-top: 0.75rem

  h2
    padding: 0.25rem 0

  p
    padding: 0.15rem 0

  .event-actions
    padding: 0.25rem 0 0

    button, .button
      margin-bottom: 0.25rem

    .button
      display: inline-block
      box-sizing: border-box

    a
      text-decoration: none
</style>
