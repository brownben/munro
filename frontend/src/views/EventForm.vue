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
  <div class="view">
    <vue-headful
      v-if="create"
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Create Event"
      description
    />
    <vue-headful
      v-else
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Edit Event"
      description
    />
    <div v-if="!notFound">
      <h1
        v-if="create"
        class="text-main text-3xl font-normal font-heading mb-2"
      >
        Create Event
      </h1>
      <h1
        v-if="!create"
        class="text-main text-3xl font-normal font-heading mb-2"
      >
        Edit Event
      </h1>
      <!-- @submit on submit via enter key in the last field, .prevent prevents page reload -->
      <form @submit.prevent="submit">
        <text-input v-model.trim="name" label="Name:" />
        <text-input v-model.trim="date" label="Date: (DD/MM/YYYY)" />
        <text-input v-model.trim="organiser" label="Club/ Organiser:" />
        <text-input v-model.trim="website" label="Website: (URL)" type="url" />
        <text-input v-model.trim="results" label="Results: (URL)" type="url" />
        <text-input
          v-model.trim="winsplits"
          label="Winsplits: (URL)"
          type="url"
        />
        <text-input
          v-model.trim="routegadget"
          label="Routegadget: (URL)"
          type="url"
        />
        <dropdown-input
          v-model="league"
          :list="leagues.map(league => league.name)"
          label="League:"
        />
        <text-input v-model.trim="moreInformation" label="More Information:" />
        <button v-if="create" class="button-lg">Create Event</button>
        <button v-if="!create" class="button-lg">Update Event</button>
      </form>
    </div>
    <not-found v-if="notFound" />
  </div>
</template>

<script>
import axios from 'axios'
import DropdownInput from '@/components/DropdownInput'
import TextInput from '@/components/TextInput'
const NotFound = () => import('@/views/NotFound')

export default {
  components: {
    NotFound,
    DropdownInput,
    TextInput,
  },

  data: function() {
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
      league: this.$route.params.league,
    }
  },

  // On Load
  mounted: function() {
    this.getLeagues()
    if (this.$route.path.includes('edit')) {
      this.create = false
      this.getEventDetails()
    }
  },

  methods: {
    submit: function() {
      if (this.create) this.createEvent()
      else this.updateEvent()
    },

    getEventDetails: function() {
      return axios
        .get(`/api/events/${this.$route.params.id}`)
        .then(response => {
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
          }
        })
        .catch(() => this.$messages.addMessage('Problem Getting Event Details'))
    },

    getLeagues: function() {
      return axios
        .get('/api/leagues')
        .then(response => {
          this.leagues = response.data
        })
        .catch(() =>
          this.$messages.addMessage('Problem Fetching List of Leagues')
        )
    },

    validateForm: function() {
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

    createEvent: function() {
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
          })
          .then(response => this.returnToLeaguePage(response))
          .catch(() =>
            this.$messages.addMessage(
              'Error: Problem Creating Event - Please Try Again'
            )
          )
      }
    },

    updateEvent: function() {
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
          })
          .then(response => this.returnToLeaguePage(response))
          .catch(error =>
            this.$messages.addMessage(error.response.data.message)
          )
      }
    },

    returnToLeaguePage: function(response) {
      // Go to league page after successful update/ creation
      this.$messages.addMessage(response.data.message)
      this.$router.push(`/leagues/${this.league}`)
    },
  },
}
</script>
