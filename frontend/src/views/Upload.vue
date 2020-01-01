<!--
  Upload Page

  Upload results to database.
-->

<template>
  <div class="view">
    <vue-headful
      title="Munro - Upload Results"
      description="Upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/upload"
      :head="{
        'meta': {name: 'robots', content:'all'},
      }"
    />
    <h1 class="text-main text-3xl font-normal font-heading mb-2">Upload Results</h1>
    <div class="card-color mt-2 mb-4">
      <p>
        For instructions on how to upload results please visit
        <router-link
          to="/upload-instructions"
          class="link inline text-white ml-1"
        >
          /upload-instructions
        </router-link>
      </p>
    </div>
    <text-input v-model.trim.lazy="eventId" label="Event ID:" @input="findEvent" />

    <p v-show="event.name" class="mb-3">
      <b class="text-normal font-heading">Event Name:</b>
      {{ event.name }}
    </p>

    <text-input v-model.trim="uploadKey" label="Upload Key:" />

    <!-- If Event already have results, confirm they want to overwrite -->
    <checkbox-input
      v-if="event.resultUploaded"
      v-model="overwrite"
      label="Overwrite Existing Results:"
      class="text-left mb-5"
    />

    <file-input label="Results File:" @file="fileRead" />

    <text-input v-model.trim="event.results" label="Results (URL):" type="url" />
    <text-input v-model.trim="event.routegadget" label="Routegadget (URL):" type="url" />
    <text-input v-model.trim="event.winsplits" label="Winsplits: (URL):" type="url" />

    <!-- Only show upload once all fields have been filled -->
    <button v-if="eventId && uploadKey && file" class="button-lg" @click="uploadFile">Upload File</button>
  </div>
</template>

<script>
import axios from 'axios'
import CheckboxInput from '@/components/CheckboxInput'
import TextInput from '@/components/TextInput'
import FileInput from '@/components/FileInput'

export default {
  components: {
    'CheckboxInput': CheckboxInput,
    'TextInput': TextInput,
    'FileInput': FileInput,
  },

  data: function () {
    return {
      eventId: '',
      uploadKey: '',
      event: {},
      file: '',
      overwrite: false,
      results: '',
      routegadget: '',
      winsplits: '',
    }
  },

  // On load
  mounted: function () {
    // If passed with Event ID, autofill Event ID
    if (this.$route.params.id) {
      this.eventId = this.$route.params.id
      this.findEvent()
    }
  },

  methods: {
    findEvent: function () {
      // Fetch event details so name of event can be checked and if results are uploaded
      return axios.get('/api/events/' + this.eventId)
        .then(response => {
          this.event = response.data
          if (!this.event.name) {
            this.event = {}
            this.event.name = 'No Event Found'
          }
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Event Name'))
    },

    fileRead: function (file) {
      this.file = file
    },

    uploadFile: function () {
      // Send data to the server
      this.$messages.addMessage('Upload Data Sent')
      return axios.post('/api/upload', {
        eventId: this.eventId,
        uploadKey: this.uploadKey,
        file: this.file,
        overwrite: this.overwrite,
        results: this.event.results,
        winsplits: this.event.winsplits,
        routegadget: this.event.routegadget,
      })
        .then(() => {
          this.$messages.addMessage('Results Uploaded Successfully')
          this.$router.push('/leagues/' + this.event.league)
        })
        .catch(error => this.$messages.addMessage(error.response.data.message))
    },
  },
}
</script>
