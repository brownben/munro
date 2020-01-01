<!--
  Latest Results

  List of events with the latest results
-->

<template>
  <div class="view">
    <vue-headful
      title="Munro - Latest Results"
      description="The latest results from events on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/latest-results"
      :head="{
        'meta': {name: 'robots', content:'all'},
      }"
    />
    <h1 class="text-main text-3xl font-normal font-heading">Latest Results</h1>
    <div v-for="event of events" :key="event.name" class="p-4 pb-1 card my-5">
      <h2 class="text-2xl font-heading my-2">{{ event.league }} - {{ event.name }}</h2>
      <p v-if="event.date">
        On {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{ event.date.split('-')[0] }}
        <template
          v-if="event.organiser"
        >
          organised by {{ event.organiser }}
        </template>
      </p>
      <p v-if="event.website">
        More Information can be found on their
        <a
          :href="event.website"
          target="_blank"
          rel="noopener noreferrer"
        >website</a>
      </p>
      <span>
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
      </span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      events: [],
    }
  },

  watch: {
    // Update details if the league in the URL changes (VueJS problem where no reload if the parameter part changes, so needs watched)
    '$route': async function () {
      this.getEventsWithResults()
    },
  },

  mounted: async function () {
    // Get details on load
    this.getEventsWithResults()
  },

  methods: {
    scoringMethodShorthandToFull: value => {
      if (value === 'position') return 'Position Based (100 Max)'
      else if (value === 'position50') return 'Position Based (50 Max)'
      else if (value === 'position99') return 'Position Based (99 Max)'
      else if (value === 'position99average') return 'Position Based (99 Max, Reduced in a Draw)'
      else return ''
    },

    getEventsWithResults: function () {
      return axios.get('/api/events/latest-results')
        .then(response => { this.events = response.data })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },
  },
}
</script>
