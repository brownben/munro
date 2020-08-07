<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for event upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <Layout :footer="league.name && events && events.length > 0" :white="false">
    <vue-headful
      :title="`Munro - ${$route.params.name}`"
      :description="`Event Information and Results for the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.name}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        {{ league.name }}
      </h1>
      <h2 v-if="league.description" class="mt-2 text-lg font-heading">
        {{ league.description }}
      </h2>
    </template>

    <template #white>
      <section class="w-full text-left bg-white">
        <p v-if="league.courses" class="w-full leading-6 text-gray-600">
          There are normally
          {{ league.courses.length }} courses -
          <span class="text-gray-900 md:text-lg font-heading">{{
            naturalJoin(league.courses)
          }}</span>
        </p>
        <p v-if="league.coordinator" class="w-full leading-6 text-gray-600">
          <span class="text-gray-900 md:text-lg font-heading">{{
            league.coordinator
          }}</span>
          coordinates the league.
        </p>
        <p v-if="league.scoringMethod" class="w-full leading-6 text-gray-600">
          The scoring for the league is calculated using a
          <span class="text-gray-900 md:text-lg font-heading">{{
            scoringMethodShorthandToFull(league.scoringMethod)
          }}</span>

          <span
            v-if="league.numberOfCountingEvents && league.numberOfEvents"
            class="block"
          >
            Your
            <span class="text-gray-900 md:text-lg font-heading"
              >best {{ league.numberOfCountingEvents }} scores</span
            >
            from all
            {{ league.numberOfEvents }}
            events, count towards your score.
          </span>
        </p>

        <p
          v-if="league.moreInformation"
          class="w-full my-2 leading-6 text-gray-600"
        >
          <span
            v-for="line of league.moreInformation.split('|')"
            :key="line"
            class="block"
          >
            {{ line }}
          </span>
        </p>

        <p v-if="league.website" class="w-full mt-2 leading-6 text-gray-600">
          More information can be found at:
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-1 link font-heading text-main-800"
            >{{ league.website }}</a
          >
        </p>
      </section>
    </template>

    <template #fullWidth>
      <section
        v-if="auth.user && league && league.name"
        class="w-full col-span-2 pt-5 pb-6 text-center text-white bg-main-500"
      >
        <h2 class="text-2xl font-bold font-heading">Admin Actions</h2>
        <div class="w-10/12 mx-auto sm:mt-2">
          <router-link :to="`${$route.path}/edit`" class="button-white"
            >Edit League</router-link
          >
          <button class="button-white" @click="deleteLeague">
            Delete League
          </button>
          <router-link
            :to="`/leagues/${$route.params.name}/competitors`"
            class="button-white"
            >Manage Competitors</router-link
          >
        </div>
      </section>
      <section
        v-if="league.courses && league.courses.length > 0"
        class="col-span-2 pt-5 pb-6 text-center text-white bg-main-700"
      >
        <h2 class="text-2xl font-bold font-heading">
          League Results
        </h2>
        <div class="w-10/12 mx-auto sm:mt-2">
          <router-link
            v-for="course of league.courses"
            :key="course"
            :to="$route.path + '/results/' + course"
            class="button-white"
            >{{ course }}</router-link
          >
        </div>
      </section>
    </template>

    <template v-if="league && league.name">
      <div
        v-if="events && events.length > 0"
        class="flex items-center justify-between w-full col-span-2 py-2 bg-gray-100 sm:py-0"
      >
        <h2
          class="text-lg leading-5 uppercase align-middle font-heading text-main-700"
        >
          Events
        </h2>

        <router-link
          v-if="auth.user"
          :to="`${$route.path}/create-event`"
          class="inline-block px-4 pt-2 pb-1 text-sm leading-6 tracking-wide text-right uppercase transition duration-300 text-main-600 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape"
        >
          <span class="mr-1 text-xl">+</span> Add Event
        </router-link>
      </div>
      <EventOverviewCard
        v-for="event of events"
        :key="event.name"
        :event="event"
        :league="league"
        :auth="auth"
        class="col-span-2"
        @eventChanged="refreshDetails"
      />
    </template>
    <NotFound v-if="!league" />
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import EventOverviewCard from '@/components/cards/EventOverviewCard.vue'

const NotFound = () => import('@/views/NotFound.vue')

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
    refreshDetails: function () {
      return this.getLeague().then(() => this.getLeagueEvents())
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
