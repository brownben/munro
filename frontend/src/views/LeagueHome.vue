<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for event upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <div>
    <vue-headful
      :title="`Munro - ${$route.params.name}`"
      :description="`Event Information and Results for the
          ${$route.params.name} league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.name}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <Layout v-if="league && league.name">
      <div class="col-span-2 text-left">
        <h1
          class="mt-2 text-3xl font-bold md:text-35xl font-heading text-main-700"
        >
          {{ league.name }}
        </h1>
        <h2
          v-if="league.description"
          class="mb-4 text-lg text-opacity-75 md:text-xl font-heading text-main-900"
        >
          {{ league.description }}
        </h2>

        <p v-if="league.courses">
          There are normally
          {{ league.courses.length }} courses -
          <span class="md:text-lg font-heading">{{
            naturalJoin(league.courses)
          }}</span>
        </p>
        <p v-if="league.coordinator">
          <span class="md:text-lg font-heading">{{ league.coordinator }}</span>
          coordinates the league.
        </p>
        <p v-if="league.scoringMethod">
          The scoring for the league is calculated using a
          <span class="md:text-lg font-heading">{{
            scoringMethodShorthandToFull(league.scoringMethod)
          }}</span>

          <span
            v-if="league.numberOfCountingEvents && league.numberOfEvents"
            class="block"
          >
            Your
            <span class="md:text-lg font-heading"
              >best {{ league.numberOfCountingEvents }} scores</span
            >
            from all
            {{ league.numberOfEvents }}
            events, count towards your score.
          </span>
        </p>

        <p v-if="league.moreInformation" class="my-2">
          <span
            v-for="line of league.moreInformation.split('|')"
            :key="line"
            class="block"
          >
            {{ line }}
          </span>
        </p>

        <p v-if="league.website" class="mt-2">
          More information can be found at:
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-1 link font-heading text-main-800"
            >{{ league.website }}</a
          >
        </p>
      </div>

      <div v-if="events && events.length > 0" class="col-span-2 card-color">
        <h2 class="font-bold text-25xl font-heading">League Results</h2>
        <div class="mt-2">
          <router-link
            v-for="course of league.courses"
            :key="course"
            :to="$route.path + '/results/' + course"
            class="button-white"
            >{{ course }}</router-link
          >
        </div>
      </div>

      <div
        v-if="auth.user && league && league.name"
        class="col-span-2 card-color-dark"
      >
        <h2 class="mb-2 font-bold text-25xl font-heading">Admin Actions</h2>
        <div>
          <router-link :to="$route.path + '/create-event'" class="button-white"
            >Add Event</router-link
          >
          <router-link :to="$route.path + '/edit'" class="button-white"
            >Edit League</router-link
          >
          <button class="button-white" @click="deleteLeague">
            Delete League
          </button>
          <router-link
            :to="'/competitors/' + this.$route.params.name"
            class="button-white"
            >Manage Competitors</router-link
          >
        </div>
      </div>

      <EventOverviewCard
        v-for="event of events"
        :key="event.name"
        :event="event"
        :league="league"
        :auth="auth"
        @eventChanged="refreshDetails"
      />
    </Layout>
    <not-found v-if="!league" />
  </div>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'
import EventOverviewCard from '@/components/cards/EventOverviewCard'

const NotFound = () => import('@/views/NotFound')

export default {
  components: {
    Layout,
    EventOverviewCard,
    NotFound,
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
    $route: function () {
      this.refreshDetails()
    },
  },

  mounted: function () {
    // Get details on load
    this.refreshDetails()
  },

  methods: {
    refreshDetails: async function () {
      await this.getLeague()
      this.getLeagueEvents()
    },

    scoringMethodShorthandToFull: (value) => {
      if (value === 'position') return 'Position Based System (100 Max)'
      else if (value === 'position50') return 'Position Based System (50 Max)'
      else if (value === 'position99') return 'Position Based System (99 Max)'
      else if (value === 'position99average')
        return 'Position Based System (99 Max, Reduced in a Draw)'
      else if (value === 'positionDouble')
        return 'Position Based System (100 Max, Double Points)'
      else if (value === 'position50Double')
        return 'Position Based System (50 Max, Double Points)'
      else if (value === 'timeAverage')
        return 'Time Relative to Average System (1000 Average)'
      else if (value === 'timeAverage100')
        return 'Time Relative to Average System (100 Average)'
      else if (value === 'file') return 'from the points uploaded'
      else return ''
    },

    getLeague: function () {
      return axios
        .get(`/api/leagues/${this.$route.params.name}`)
        .then((response) => {
          this.league = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Getting League Details')
        )
    },

    getLeagueEvents: function () {
      if (this.league && this.league.name) {
        if (this.auth.user) {
          return axios
            .get(`/api/leagues/${this.league.name}/events/uploadKey`)
            .then((response) => {
              this.events = response.data
            })
            .catch(() =>
              this.$messages.addMessage('Problem Getting Event Details')
            )
        } else {
          return axios
            .get(`/api/leagues/${this.league.name}/events`)
            .then((response) => {
              this.events = response.data
            })
            .catch(() =>
              this.$messages.addMessage('Problem Getting Event Details')
            )
        }
      }
      return false
    },

    deleteLeague: function () {
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

    naturalJoin: function (array) {
      if (array.length <= 1) return array.join(', ')
      else
        return `${array.slice(0, -1).join(', ')} and ${array[array.length - 1]}`
    },
  },
}
</script>
