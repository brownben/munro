<!--
  League Events Page for Embedding
-->

<template>
  <div>
    <Layout v-if="league">
      <vue-headful
        :title="`Munro - ${$route.params.name} League`"
        :description="`Event Information and Results for the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
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
    </Layout>
    <not-found v-if="!league" />
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import EventOverviewCard from '@/components/cards/EventOverviewCard.vue'
const NotFound = defineAsyncComponent(() => import('@/views/NotFound.vue'))

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
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    $route: function () {
      return this.getLeague().then(() => this.getLeagueEvents())
    },
  },

  mounted: function () {
    // Get details on load
    return this.getLeague().then(() => this.getLeagueEvents())
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
