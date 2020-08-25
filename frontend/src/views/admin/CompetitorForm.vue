<!--
  Competitor Form

  The form for Creating/ Updating Competitor
-->

<template>
  <div>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      :title="`Munro - ${title}`"
      description
    />

    <Layout v-if="!notFound" :title="title">
      <!-- @submit on submit via enter key in the last field, .prevent prevents page reload -->
      <form class="col-span-2" @submit.prevent="submit">
        <TextInput v-model.trim="name" label="Name:" />
        <TextInput v-model.trim="club" label="Club:" class="mt-4" />
        <TextInput v-model.trim="ageClass" label="Age Class:" class="mt-4" />
        <DropdownInput
          v-model="league"
          :list="leagues.map((league) => league.name)"
          label="League:"
          class="mt-4"
        />
        <DropdownInput
          v-model="course"
          :list="coursesInLeague"
          label="Course:"
          class="mt-4"
        />

        <button v-if="create" class="mt-8 button-lg">Create Competitor</button>
        <button v-else class="mt-8 button-lg">Update Competitor</button>
      </form>
    </Layout>
    <not-found v-else />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

import Layout from '/@/components/Layout.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'
import TextInput from '/@/components/inputs/TextInput.vue'

const NotFound = defineAsyncComponent(() => import('/@/views/NotFound.vue'))

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
    NotFound,
  },

  data: function () {
    return {
      id: '',
      notFound: false,
      create: true,
      leagues: [],
      name: '',
      club: '',
      ageClass: '',
      league: '',
      course: '',
    }
  },

  computed: {
    title: function () {
      if (this.create) return 'Create Competitor'
      else return 'Edit Competitor'
    },

    coursesInLeague: function () {
      const selectedLeague = this.leagues.filter(
        (league) => league.name === this.league
      )
      if (selectedLeague.length > 0) return selectedLeague[0].courses
      else return []
    },
  },

  // On Load
  mounted: function () {
    this.getLeagues()
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getCompetitorDetails()
    }
  },

  methods: {
    submit: function () {
      if (this.create) this.createCompetitor()
      else this.updateCompetitor()
    },

    getCompetitorDetails: function () {
      return axios
        .get(`/api/competitors/${this.$route.params.id}`)
        .then((response) => {
          if (!response.data) this.notFound = true
          else {
            this.id = this.$route.params.id
            this.name = response.data.name
            this.club = response.data.club
            this.ageClass = response.data.ageClass
            this.league = response.data.league
            this.course = response.data.course
          }
        })
        .catch(() =>
          this.$store.dispatch(
            'createMessage',
            'Problem Getting Competitor Details'
          )
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
            'Problem Fetching List of Leagues'
          )
        )
    },

    validateForm: function () {
      return this.name !== '' && this.league !== '' && this.course !== ''
    },

    createCompetitor: function () {
      if (this.validateForm()) {
        return axios
          .post('/api/competitors', {
            name: this.name,
            club: this.club,
            ageClass: this.ageClass,
            league: this.league,
            course: this.course,
          })
          .then((response) => this.returnToCompetitorsPage(response))
          .catch(() =>
            this.$store.dispatch(
              'createMessage',
              'Error: Problem Creating Competitor - Please Try Again'
            )
          )
      } else
        this.$store.dispatch(
          'createMessage',
          'Please Ensure Name and League Fields are not Blank'
        )
    },

    updateCompetitor: function () {
      if (this.validateForm()) {
        return axios
          .put(`/api/competitors/${this.id}`, {
            id: this.id,
            name: this.name,
            club: this.club,
            ageClass: this.ageClass,
            league: this.league,
            course: this.course,
          })
          .then((response) => this.returnToCompetitorsPage(response))
          .catch((error) =>
            this.$store.dispatch('createMessage', error.response.data.message)
          )
      } else
        this.$store.dispatch(
          'createMessage',
          'Please Ensure Name and League Fields are not Blank'
        )
    },

    returnToCompetitorsPage: function (response) {
      // Go to league page after successful update/ creation
      this.$store.dispatch('createMessage', response.data.message)
      this.$router.push(`/leagues/${this.league}/competitors`)
    },
  },
}
</script>
