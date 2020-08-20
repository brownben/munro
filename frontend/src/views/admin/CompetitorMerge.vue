<!--
  Merge Competitors

  Allows to merge two comopetitors together (when a duplicate)
-->

<template>
  <Layout title="Merge Competitors">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Merge Competitors"
      description
    />

    <form class="col-span-2" @submit.prevent="merge">
      <DropdownInput
        v-model="league"
        :list="leagues.map((league) => league.name)"
        :include-blank="true"
        label="League:"
      />
      <DropdownInput
        v-model="course"
        :list="coursesInLeague"
        :include-blank="true"
        label="Course:"
        class="mt-4"
      />
      <DropdownInput
        v-model="competitorKeep"
        :list="
          competitorsForLeague.map(
            (competitor) =>
              `${competitor.id} - ${competitor.name} - ${competitor.ageClass} - ${competitor.club}`
          )
        "
        :include-blank="true"
        label="Competitor to Keep:"
        class="mt-4"
      />
      <DropdownInput
        v-model="competitorMerge"
        :list="
          competitorsForLeague.map(
            (competitor) =>
              `${competitor.id} - ${competitor.name} - ${competitor.ageClass} - ${competitor.club}`
          )
        "
        :include-blank="true"
        label="Competitor to be Merged:"
        class="mt-4"
      />
      <button class="mt-8 button-lg">
        Merge Competitors
      </button>
    </form>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'

export default {
  components: {
    Layout,
    DropdownInput,
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
      const filtered = this.competitors.filter(
        (competitor) =>
          competitor.league === this.league && competitor.course === this.course
      )

      return filtered.sort((a, b) => (a.name > b.name) - (a.name < b.name))
    },

    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(
        (league) => league.name === this.league
      )
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },
  },

  mounted: function () {
    this.getCompetitors()
    this.getLeagues()
  },

  methods: {
    getCompetitors: function () {
      return axios
        .get('/api/competitors')
        .then((response) => {
          this.competitors = response.data
        })
        .catch(() =>
          this.$store.dispatch('createMessage', 'Problem Fetching Competitors')
        )
    },

    getLeagues: function () {
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$store.dispatch(
            'createMessage',
            'Problem Fetching League Details'
          )
        )
    },

    validateForm: function () {
      return (
        this.competitorMerge !== this.competitorKeep &&
        this.competitorMerge !== '' &&
        this.competitorKeep !== ''
      )
    },

    merge: function () {
      if (this.validateForm()) {
        return axios
          .post('/api/competitors/merge', {
            competitorKeep: this.competitorKeep.split(' -')[0],
            competitorMerge: this.competitorMerge.split(' -')[0],
          })
          .then((response) => this.returnToCompetitorsPage(response))
          .catch((error) =>
            this.$store.dispatch('createMessage', error.response.data.message)
          )
      } else
        this.$store.dispatch(
          'createMessage',
          'The Competitors Selected are the Same'
        )
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$store.dispatch('createMessage', response.data.message)
      this.$router.push(`/leagues/${this.league}/competitors`)
    },

    competitorTransformForSelect: function (competitor) {
      if (competitor.club && competitor.ageClass)
        return `${competitor.name} (${competitor.ageClass}, ${competitor.club}) [${competitor.id}]`
      else if (competitor.club)
        return `${competitor.name} (${competitor.club}) [${competitor.id}]`
      else if (competitor.ageClass)
        return `${competitor.name} (${competitor.ageClass}) [${competitor.id}]`
      else return `${competitor.name} [${competitor.id}]`
    },
  },
}
</script>
