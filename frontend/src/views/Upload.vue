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
    <Checkbox
      v-if="event.resultUploaded"
      :state="false"
      label="Overwrite Existing Results:"
      @changed="checkboxChanged"
    />
    <button v-if="eventId && uploadKey && file" id="uploadButton" @click="uploadFile">Upload File</button>
  </div>
</template>
<script>
import axios from 'axios'
import Checkbox from '@/components/Checkbox'

export default {
  components: {
    'Checkbox': Checkbox,
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

  mounted: function () {
    if (this.$route.params.id) {
      this.eventId = this.$route.params.id
      this.findEvent()
    }
  },

  methods: {
    checkboxChanged: function (value) { this.overwrite = value },
    findEvent: function () {
      axios.get('/api/events/' + this.eventId)
        .then(response => {
          this.event = response.data
          if (!this.event.name) {
            this.event = {}
            this.event.name = 'No Event Found'
          }
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Event Name'))
    },

    fileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.fileName = files[0].name
      this.readFile(files[0])
    },

    readFile (file) {
      const reader = new FileReader()
      reader.onload = (e) => { this.file = e.target.result }
      reader.readAsText(file)
    },

    uploadFile () {
      axios.post('/api/upload', {
        'eventId': this.eventId,
        'uploadKey': this.uploadKey,
        'file': this.file,
        'overwrite': this.overwrite,
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
