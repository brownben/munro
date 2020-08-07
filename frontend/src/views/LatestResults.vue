<!--
  Latest Results

  List of events with the latest results
-->

<template>
  <Layout title="Latest Results" :footer="events && events.length > 0">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Latest Results"
      description="The latest results from events on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/latest-results"
    />

    <EventOverviewCard
      v-for="event of events"
      :key="event.name"
      :event="event"
      :league="{ dynamicEventResults: true }"
      :showLeagueName="true"
    />
  </Layout>
</template>
<script>
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import EventOverviewCard from '@/components/cards/EventOverviewCard.vue'

export default {
  components: {
    Layout,
    EventOverviewCard,
  },

  data: function () {
    return {
      events: [],
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    $route: function () {
      this.getEventsWithResults()
    },
  },

  mounted: function () {
    // Get details on load
    this.getEventsWithResults()
  },

  methods: {
    getEventsWithResults: function () {
      return axios
        .get('/api/events/latest-results')
        .then((response) => {
          this.events = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },
  },
}
</script>
