<!--
  Upload Page

  Upload results to database.
-->

<template>
  <Layout title="Upload Results File">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Upload Results File"
      description="Upload Results Files to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/file"
    />

    <div class="col-span-2 mt-4 card-color">
      <p>
        For instructions on how to upload results please visit
        <router-link
          to="/upload/instructions"
          class="inline ml-1 text-white link"
        >
          /upload/instructions
        </router-link>
      </p>
    </div>
    <div class="col-span-2">
      <TextInput
        v-model.trim.lazy="eventId"
        label="Event ID:"
        @input="findEvent"
      />

      <p v-show="event.name" class="mt-4 mb-4">
        <b class="mr-2 text-main-800">Event Name:</b>
        {{ event.name }}
      </p>

      <TextInput v-model.trim="uploadKey" label="Upload Key:" class="mt-4" />

      <!-- If Event already have results, confirm they want to overwrite -->
      <CheckboxInput
        v-if="event.resultUploaded"
        v-model="overwrite"
        label="Overwrite Existing Results:"
        class="mt-6 text-left"
      />

      <FileInput label="Results File:" class="mt-4" @file="fileRead" />

      <TextInput
        v-model.trim="event.results"
        label="Results (URL):"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.routegadget"
        label="Routegadget (URL):"
        type="url"
        class="mt-4"
      />
      <TextInput
        v-model.trim="event.winsplits"
        label="Winsplits: (URL):"
        type="url"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="eventId && uploadKey && file"
        class="mt-6 button-lg"
        @click="uploadFile"
      >
        Upload File
      </button>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'

import TextInput from '@/components/inputs/TextInput'
import FileInput from '@/components/inputs/FileInput'
import CheckboxInput from '@/components/inputs/CheckboxInput'

export default {
  components: {
    Layout,
    TextInput,
    FileInput,
    CheckboxInput,
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
      return axios
        .get(`/api/events/${this.eventId}`)
        .then((response) => {
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
      return axios
        .post('/api/upload', {
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
          this.$router.push(`/events/${this.eventId}/results`)
        })
        .catch((error) =>
          this.$messages.addMessage(error.response.data.message)
        )
    },
  },
}
</script>
