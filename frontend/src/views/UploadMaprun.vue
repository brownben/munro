<template>
  <Layout title="Import MapRun Results">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Import MapRun Results"
      description="Import results from MapRun to to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/maprun"
    />

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
      <TextInput
        v-model.trim="maprunId"
        label="MapRun Event Id:"
        class="mt-4"
      />

      <DropdownInput
        v-model="course"
        label="Course:"
        :list="league.courses"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="eventId && uploadKey && course"
        class="mt-6 button-lg"
        @click="uploadFile"
      >
        Import Data
      </button>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '/@/components/Layout.vue'

import TextInput from '/@/components/inputs/TextInput.vue'
import DropdownInput from '/@/components/inputs/DropdownInput.vue'

export default {
  components: {
    Layout,
    TextInput,
    DropdownInput,
  },

  data: function () {
    return {
      eventId: '',
      uploadKey: '',
      event: {},
      league: {},
      maprunId: '',
      course: '',
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
            this.league = {}
            this.event.name = 'No Event Found'
          } else return axios.get(`/api/leagues/${this.event.league}`)
        })
        .then((response) => {
          if (response) this.league = response.data
        })
        .catch(() => this.$messages.addMessage('Problem Fetching Event Name'))
    },

    uploadFile: function () {
      return this.getMaprunData()
        .then((file) => {
          if (!file || file.split('\n').length < 1)
            throw new Error('Error: No MapRun Event Found With That Id')

          this.$messages.addMessage('Upload Data Sent')
          return file
        })
        .then((file) =>
          axios.post('/api/upload/stream', {
            eventId: this.eventId,
            uploadKey: this.uploadKey,
            file: file,
            course: this.course,
          })
        )
        .then(() => {
          this.$messages.addMessage('Results Uploaded Successfully')
          this.$router.push(`/events/${this.eventId}/results`)
        })
        .catch((error) =>
          this.$messages.addMessage(
            error?.response?.data?.message ?? error?.message
          )
        )
    },

    maprunHTMLtoCSV: function (html) {
      return html
        .replace(/\n/g, '')
        .replace(/<\/.*?>/g, '')
        .replace(/'>Track/g, '')
        .replace(/<a href='reitti.cgi.*?pID=/g, '')
        .replace(/<a.*?>/g, '')
        .replace(/\(Rev[0-9]+\)/g, '')
        .split('<tr>')
        .filter((row) => !row.includes('DOCTYPE') && !row.includes('<th'))
        .map((row) =>
          row
            .split(/<td.*?>/g)
            .slice(2, 6)
            .map((string) => string.trim())
            .join()
        )
        .join('\n')
    },

    getMaprunData: function () {
      return axios
        .get(
          `https://www.p.fne.com.au/rg/cgi-bin/SelectResultFileForSplitsBrowserFiltered.cgi?act=fileToSplitsBrowser&eventName=CombinedResults_${this.maprunId}.csv`
        )
        .then((response) => response.data)
        .then((data) => this.maprunHTMLtoCSV(data))
        .catch((error) =>
          this.$messages.addMessage(
            'Error: Problem Connecting to MapRun Server'
          )
        )
    },
  },
}
</script>
