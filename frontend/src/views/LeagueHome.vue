<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for eveent upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <div class="view">
    <vue-headful
      :title="`Munro - ${$route.params.name}`"
      :description="
        `Event Information and Results for the
          ${$route.params.name} league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features`
      "
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.name}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <template v-if="league && league.name">
      <div class="card-text mb-4 mt-2 w-full mx-0">
        <h1 class="text-main text-3xl font-normal font-heading">
          {{ league.name }}
        </h1>
        <p v-if="league.description">{{ league.description }}</p>
        <p v-if="league.courses">
          There are normally {{ league.courses.length }} courses -
          {{ league.courses.join(', ') }}
        </p>
        <p v-if="league.coordinator">
          {{ league.coordinator }} coordinates the league.
        </p>
        <p>
          <span v-if="league.scoringMethod">
            The scoring for the league is calculated using a
            {{ scoringMethodShorthandToFull(league.scoringMethod) }}
          </span>
          &nbsp;
          <span v-if="league.numberOfCountingEvents && league.numberOfEvents">
            With your best {{ league.numberOfCountingEvents }} events from all
            {{ league.numberOfEvents }} events counting.
          </span>
        </p>
        <p v-if="league.website">
          More information can be found at
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >{{ league.website }}</a
          >
        </p>
      </div>
      <div v-if="auth.user" class="card my-4">
        <h2 class="text-2xl font-heading">Admin Actions</h2>
        <div>
          <router-link :to="$route.path + '/create-event'" class="button"
            >Add Event</router-link
          >
          <router-link :to="$route.path + '/edit'" class="button"
            >Edit League</router-link
          >
          <button class="button" @click="deleteLeague">Delete League</button>
          <router-link
            :to="'/competitors/' + this.$route.params.name"
            class="button"
            >Manage Competitors</router-link
          >
        </div>
      </div>
    </template>
    <div v-if="events && events.length > 0" class="card my-4">
      <h2 class="text-2xl font-heading">League Results</h2>
      <div>
        <router-link
          v-for="course of league.courses"
          :key="course"
          :to="$route.path + '/results/' + course"
          class="button"
          >{{ course }}</router-link
        >
      </div>
    </div>
    <div
      v-for="event of events"
      :key="event.name"
      :class="{ 'card-text': !event.resultUploaded }"
      class="card my-4"
    >
      <h2 :class="{ 'text-2xl': auth.user }" class="font-heading text-xl my-1">
        {{ event.name }}
      </h2>
      <div v-if="auth.user" class="event-actions">
        <router-link :to="'/events/' + event.id + '/edit'" class="button"
          >Edit Event</router-link
        >
        <router-link :to="'/upload/' + event.id" class="button"
          >Upload Results</router-link
        >
        <button class="button" @click="deleteEvent(event)">Delete Event</button>
      </div>
      <div class="my-1">
        <p v-if="auth.user">
          <b>Event ID:</b>
          {{ event.id }}
        </p>
        <p v-if="auth.user && event.uploadKey">
          <b>Event Upload Key:</b>
          {{ event.uploadKey }}
        </p>
      </div>
      <p v-if="event.date">
        On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
          event.date.split('-')[0]
        }}
        <template v-if="event.organiser"
          >organised by {{ event.organiser }}</template
        >
      </p>
      <p v-if="event.moreInformation">{{ event.moreInformation }}</p>
      <p v-if="event.website">
        More Information can be found on their
        <a
          :href="event.website"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
          >website</a
        >
      </p>
      <div
        v-if="event.resultUploaded"
        class="event-actions event-result-actions"
      >
        <router-link
          v-if="league.dynamicEventResults"
          :to="`/events/${event.id}/results`"
          class="button"
          >Results</router-link
        >
        <a
          v-if="event.results"
          :href="event.results"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >HTML Results</a
        >
        <a
          v-if="event.winsplits"
          :href="event.winsplits"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >WinSplits</a
        >
        <a
          v-if="event.routegadget"
          :href="event.routegadget"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >Routegadget</a
        >
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
    NotFound,
  },

  data: function() {
    return {
      league: {},
      events: [],
      auth: this.$auth,
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    $route: async function() {
      await this.getLeague()
      this.getLeagueEvents()
    },
  },

  mounted: async function() {
    // Get details on load
    await this.getLeague()
    this.getLeagueEvents()
  },

  methods: {
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average')
        return 'Position Based (99 Max, Reduced in a Draw)'
      else if (value === 'positionDouble')
        return 'Position Based (100 Max, Double Points)'
      else if (value === 'position50Double')
        return 'Position Based (50 Max, Double Points)'
      else if (value === 'timeAverage')
        return 'Relative to Average Time (1000 Average)'
      else if (value === 'timeAverage100')
        return 'Relative to Average Time (100 Average)'
      else if (value === 'file') return 'From Upload File'
      else return ''
    },

    getLeague: function() {
      return axios
        .get(`/api/leagues/${this.$route.params.name}`)
        .then(response => {
          this.league = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Getting League Details')
        )
    },

    getLeagueEvents: function() {
      if (this.league && this.league.name) {
        if (this.auth.user) {
          return axios
            .get(`/api/leagues/${this.league.name}/events/uploadKey`)
            .then(response => {
              this.events = response.data
            })
            .catch(() =>
              this.$messages.addMessage('Problem Getting Event Details')
            )
        } else {
          return axios
            .get(`/api/leagues/${this.league.name}/events`)
            .then(response => {
              this.events = response.data
            })
            .catch(() =>
              this.$messages.addMessage('Problem Getting Event Details')
            )
        }
      }
      return false
    },

    deleteLeague: function() {
      if (
        confirm(
          `Are you Sure you Want to Delete League - ${this.league.name}? \nThis Action Can't Be Recovered`
        )
      ) {
        return axios
          .delete(`/api/leagues/${this.league.name}`)
          .then(() => {
            this.$messages.addMessage(`League: ${this.league.name} was Deleted`)
            this.$router.push('/')
          })
          .catch(() =>
            this.$messages.addMessage(
              'Problem Deleting League - Please Try Again'
            )
          )
      }
    },

    deleteEvent: function(event) {
      if (
        confirm(
          `Are you Sure you Want to Delete Event - ${event.name}? \nThis Action Can't Be Recovered`
        )
      ) {
        return axios
          .delete(`/api/events/${event.id}`)
          .then(() =>
            this.$messages.addMessage(`Event: ${event.name} was Deleted`)
          )
          .then(() => this.getLeague())
          .then(() => this.getLeagueEvents())
          .catch(() =>
            this.$messages.addMessage(
              'Problem Deleting Event - Please Try Again'
            )
          )
      }
    },
  },
}
</script>
