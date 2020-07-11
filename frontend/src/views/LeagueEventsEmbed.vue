<!--
  League Events Page for Embedding
-->

<template>
  <div>
    <div v-if="league">
      <vue-headful
        :title="'Munro - ' + $route.params.name"
        :description="
          'Event Information and Results for the ' +
          $route.params.name +
          'league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features'
        "
        :head="{
          meta: { name: 'robots', content: 'noindex' },
        }"
      />

      <EventOverviewCard
        v-for="event of events"
        :key="event.name"
        :event="event"
        :league="league"
        :auth="auth"
      />
    </div>
    <not-found v-if="!league" />
  </div>
</template>
<script>
import axios from 'axios'

import EventOverviewCard from '@/components/EventOverviewCard'
const NotFound = () => import('@/views/NotFound')

export default {
  components: {
    EventOverviewCard,
    NotFound,
  },

  data: function () {
    return {
      league: {},
      events: [],
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    $route: async function () {
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
      if (this.league) {
        return axios
          .get(`/api/leagues/${this.league.name}/events`)
          .then((response) => {
            this.events = response.data
          })
          .catch(() =>
            this.$messages.addMessage('Problem Getting Event Details')
          )
      }
      return false
    },
  },
}
</script>
