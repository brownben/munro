<!--
  Event Form

  The form for Creating/ Updating Events

  On Create:
    - Show form
  - Fetch Leagues
  - Autofill league if passed in the URL

  On Edit:
    - Show Form
    - Fetch leagues
    - Fetch event data and display it (Event ID from URL)
-->

<template>
  <div>
    <vue-headful
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
        <TextInput
          v-model.trim="date"
          label="Date: (YYYY-MM-DD)"
          class="mt-4"
        />
        <TextInput
          v-model.trim="organiser"
          label="Club/ Organiser:"
          class="mt-4"
        />
        <TextInput
          v-model.trim="website"
          label="Website: (URL)"
          type="url"
          class="mt-4"
        />
        <TextInput
          v-model.trim="results"
          label="Results: (URL)"
          type="url"
          class="mt-4"
        />
        <TextInput
          v-model.trim="winsplits"
          label="Winsplits: (URL)"
          type="url"
          class="mt-4"
        />
        <TextInput
          v-model.trim="routegadget"
          label="Routegadget: (URL)"
          type="url"
          class="mt-4"
        />
        <DropdownInput
          v-model="league"
          :list="leagues.map((league) => league.name)"
          label="League:"
          class="mt-4"
        />
        <TextInput
          v-model.trim="moreInformation"
          label="More Information:"
          class="mt-4"
        />
        <CheckboxInput
          v-model="userSubmittedResults"
          label="Allow Users to Submit Results"
          class="mt-6 text-left"
        />
        <button v-if="create" class="mt-8 button-lg">Create Event</button>
        <button v-if="!create" class="mt-8 button-lg">Update Event</button>
      </form>
    </Layout>
    <not-found v-else />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

import Layout from '@/components/Layout.vue'

import DropdownInput from '@/components/inputs/DropdownInput.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'

const NotFound = defineAsyncComponent(() => import('@/views/NotFound.vue'))

export default {
  components: {
    Layout,
    DropdownInput,
    TextInput,
    CheckboxInput,
    NotFound,
  },

  data: function () {
    return {
      id: '',
      notFound: false,
      create: true,
      leagues: [],
      name: '',
      date: '',
      resultUploaded: false,
      organiser: '',
      moreInformation: '',
      website: '',
      results: '',
      winsplits: '',
      routegadget: '',
      userSubmittedResults: false,
      league: this.$route.params.league,
    }
  },

  computed: {
    title: function () {
      if (this.create) return 'Create Event'
      else return 'Edit Event'
    },
  },

  // On Load
  mounted: function () {
    this.getLeagues()
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getEventDetails()
    }
  },

  methods: {
    submit: function () {
      if (this.create) this.createEvent()
      else this.updateEvent()
    },

    getEventDetails: function () {
      return axios
        .get(`/api/events/${this.$route.params.id}`)
        .then((response) => {
          if (!response.data) this.notFound = true
          else {
            this.id = this.$route.params.id
            this.name = response.data.name
            this.date = response.data.date
            this.resultUploaded = response.data.resultUploaded
            this.organiser = response.data.organiser
            this.moreInformation = response.data.moreInformation
            this.website = response.data.website
            this.results = response.data.results
            this.winsplits = response.data.winsplits
            this.routegadget = response.data.routegadget
            this.league = response.data.league
            this.userSubmittedResults = response.data.userSubmittedResults
          }
        })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },

    getLeagues: function () {
      return axios
        .get('/api/leagues')
        .then((response) => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching List of Leagues')
        )
    },

    validateForm: function () {
      if (this.name === '' || this.league === '') {
        this.$messages.addMessage(
          'Please Ensure Name and League Fields are not Blank'
        )
        return false
      } else if (this.name.includes('/') || this.name.includes('\\')) {
        this.$messages.addMessage(
          "Please Ensure Name doesn't Include any Slashes"
        )
        return false
      } else return true
    },

    createEvent: function () {
      if (this.validateForm()) {
        return axios
          .post('/api/events', {
            name: this.name,
            date: this.date,
            resultUploaded: this.resultUploaded,
            organiser: this.organiser,
            moreInformation: this.moreInformation,
            website: this.website,
            results: this.results,
            winsplits: this.winsplits,
            routegadget: this.routegadget,
            league: this.league,
            userSubmittedResults: this.userSubmittedResults,
          })
          .then((response) => this.returnToLeaguePage(response))
          .catch(() =>
            this.$messages.addMessage(
              'Error: Problem Creating Event - Please Try Again'
            )
          )
      }
    },

    updateEvent: function () {
      if (this.validateForm()) {
        return axios
          .put(`/api/events/${this.id}`, {
            name: this.name,
            date: this.date,
            resultUploaded: this.resultUploaded,
            organiser: this.organiser,
            moreInformation: this.moreInformation,
            website: this.website,
            results: this.results,
            winsplits: this.winsplits,
            routegadget: this.routegadget,
            league: this.league,
            userSubmittedResults: this.userSubmittedResults,
          })
          .then((response) => this.returnToLeaguePage(response))
          .catch((error) =>
            this.$messages.addMessage(error.response.data.message)
          )
      }
    },

    returnToLeaguePage: function (response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push(`/leagues/${this.league}`)
    },
  },
}
</script>
