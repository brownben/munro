<!--
  League Events Page for Embedding
-->

<template>
  <div>
    <div v-if="league">
      <vue-headful
        :title="'Munro - '+$route.params.name"
        :description="'Event Information and Results for the '+ $route.params.name + 'league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features'"
        :head="{
          'meta': {name: 'robots', content:'noindex'},
        }"
      />
      <div v-for="event of events" :key="event.name" class="card my-4">
        <h2 class="font-heading text-xl my-1">{{ event.name }}</h2>
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
          More Information can be found on their
          <a
            :href="event.website"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >website</a>
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
      if (this.league) {
        return axios.get('/api/leagues/' + this.league.name + '/events')
          .then(response => { this.events = response.data })
          .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
      }
      return false
    },
  },
}
</script>
