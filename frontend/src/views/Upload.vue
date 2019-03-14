<!--
  Upload Page

  Upload results to database.
-->

<template>
  <div>
    <h1>Upload Results</h1>
    <label>Event ID:</label>
    <input v-model.trim.lazy="eventId" type="text" @change="findEvent()">
    <p v-show="event.name" id="eventName">
      <b>Event Name:</b>
      {{ event.name }}
    </p>
    <label>Upload Key:</label>
    <input v-model.trim="uploadKey" type="text">
    <label>Results File:</label>
    <div class="file-input">
      <label for="file" class="button">Browse for File</label>
      <input id="file" type="file" accept=".csv" @change="fileChange">
      <p>{{ fileName }}</p>
    </div>
    <!-- If Event already have results, confirm they want to overwrite -->
    <Checkbox v-if="event.resultUploaded" v-model="overwrite" label="Overwrite Existing Results:" />
    <!-- Only show upload once all fields have been filled -->
    <button v-if="eventId && uploadKey && file" id="uploadButton" @click="uploadFile">Upload File</button>
  </div>
</template>

<script>
import axios from 'axios'
import CheckboxInput from '@/components/CheckboxInput'

export default {
  components: {
    'Checkbox': CheckboxInput,
  },

  data: function () {
    return {
      eventId: '',
      uploadKey: '',
      event: {},
      fileName: 'Select a File',
      file: '',
      overwrite: false,
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

    fileChange (event) {
      // When the file selected has been changed
      const storage = event.target || event.dataTransfer
      const files = storage.files
      if (!files || !files.length) return false
      this.fileName = files[0].name
      this.readFile(files[0])
    },

    readFile (file) {
      // read file using FileReader and save in data
      const reader = new FileReader()
      reader.onload = event => { this.file = event.target.result }
      reader.readAsText(file)
    },

    uploadFile () {
      // Send data to the server
      return axios.post('/api/upload', {
        eventId: this.eventId,
        uploadKey: this.uploadKey,
        file: this.file,
        overwrite: this.overwrite,
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

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

#router-view
  margin-left: 5%
  padding-top: 1rem
  width: 90%

h1
  margin-bottom: 0.5rem

button
  margin: 0.5rem 0

#eventName
  margin: 0 0 0.5rem

input[type='file']
  display: none

.file-input
  p, label
    display: inline-block
    margin-top: 0
    margin-right: 0.5rem
    font-size: 1rem

input, select
  width: 100% !important

#uploadButton
  margin-top: 0.5rem
</style>
