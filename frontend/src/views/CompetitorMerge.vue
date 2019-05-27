<!--
  Merge Competitors

  Allows to merge two comopetitors together (when a duplicate)
-->

<template>
  <div>
    <vue-headful
      title="Munro - Merge Competitors"
      description
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <h1>Merge Competitors</h1>
    <form @submit.prevent="merge()">
      <label>League:</label>
      <dropdown-input
        v-model="league"
        :list="leagues.map(league => league.name)"
        :include-blank="true"
      />
      <label>Course:</label>
      <dropdown-input v-model="course" :list="coursesInLeague" :include-blank="true" />
      <label>Competitor to Keep:</label>
      <dropdown-input
        v-model="competitorKeep"
        :list="competitorsForLeague.map(competitor => competitor.id+' - '+competitor.name+' - '+competitor.ageClass+' - '+competitor.club)"
        :include-blank="true"
      />
      <label>Competitor to be Merged:</label>
      <dropdown-input
        v-model="competitorMerge"
        :list="competitorsForLeague.map(competitor => competitor.id+' - '+competitor.name+' - '+competitor.ageClass+' - '+competitor.club)"
        :include-blank="true"
      />
      <button>Merge Competitors</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import DropdownInput from '@/components/DropdownInput'

export default {
  components: {
    DropdownInput: DropdownInput,
  },

  data: () => ({
    competitors: [],
    leagues: [],
    league: '',
    competitorMerge: '',
    competitorKeep: '',
    course: '',
  }),

  computed: {
    competitorsForLeague: function () {
      const filtered = this.competitors.filter(competitor => competitor.league === this.league && competitor.course === this.course)
      return filtered.sort((a, b) => a.name > b.name)
    },

    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(league => league.name === this.league)
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },
  },

  mounted: async function () {
    await this.getCompetitors()
    await this.getLeagues()
  },

  methods: {
    getCompetitors: function () {
      return axios.get('/api/competitors')
        .then(response => { this.competitors = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching Competitors'))
    },

    getLeagues: function () {
      return axios.get('/api/leagues')
        .then(response => { this.leagues = response.data })
        .catch(() => this.$messages.addMessage('Problem Fetching League Details'))
    },

    validateForm: function () {
      return (
        this.competitorMerge !== this.competitorKeep &&
        this.competitorMerge !== '' &&
        this.competitorKeep !== '')
    },

    merge: function () {
      if (this.validateForm()) {
        return axios.post('/api/competitors/merge', {
          competitorKeep: this.competitorKeep.split(' -')[0],
          competitorMerge: this.competitorMerge.split(' -')[0],
        })
          .then(response => this.returnToCompetitorsPage(response))
          .catch(error => this.$messages.addMessage(error.response.data.message))
      }
      else this.$messages.addMessage('The Competitors Selected are the Same')
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push('/competitors')
    },

    competitorTransformForSelect: function (competitor) {
      if (competitor.club && competitor.ageClass) return competitor.name + ' (' + competitor.ageClass + ', ' + competitor.club + ') [' + competitor.id + ']'
      else if (competitor.club) return competitor.name + ' (' + competitor.club + ') [' + competitor.id + ']'
      else if (competitor.ageClass) return competitor.name + ' (' + competitor.ageClass + ') [' + competitor.id + ']'
      else return competitor.name + ' [' + competitor.id + ']'
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

h1
  margin-bottom: 0.5rem
</style>
