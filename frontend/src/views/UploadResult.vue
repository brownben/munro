<template>
  <Layout title="Submit Result">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Submit Result"
      description="Manually Submit a Result to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload/result"
    />

    <div class="col-span-2">
      <DropdownInput
        v-model="eventId"
        label="Event:"
        :optionTextDifferentToValue="true"
        :list="
          events.map((event) => ({
            text: `${event.league} - ${event.name}`,
            value: event.id,
          }))
        "
      />
      <DropdownInput
        v-model="course"
        label="Your Course:"
        :list="coursesAtEvent"
        class="mt-4"
      />
      <TextInput v-model.trim="name" label="Your Name:" class="mt-4" />
      <TextInput
        v-model.trim="time"
        label="Your Time: (HH:MM:SS)"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="eventId && course && name && time"
        class="mt-8 button-lg"
        @click="uploadResult"
      >
        Submit Result
      </button>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import DropdownInput from '@/components/inputs/DropdownInput.vue'

export default {
  components: {
    Layout,
    TextInput,
    DropdownInput,
  },

  data: function () {
    return {
      eventId: '',
      name: '',
      time: '',
      course: '',
      events: [],
      leagues: [],
    }
  },

  computed: {
    coursesAtEvent: function () {
      const eventSelected = this.events.find(
        (event) => event.id === this.eventId
      )
      const leagueOfEvent = this.leagues.find(
        (league) => league?.name === eventSelected?.league
      )

      return leagueOfEvent?.courses
    },
  },

  mounted: function () {
    return this.getEvents().then(() => this.getLeagues())
  },

  methods: {
    getEvents: function () {
      return axios
        .get('/api/events')
        .then((response) => {
          this.events = response.data.filter(
            (event) => event.userSubmittedResults
          )
          if (this.events.length < 1)
            this.$messages.addMessage(
              'Sorry, No Events Found to Submit Results For'
            )
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
          this.$messages.addMessage('Problem Fetching League Details')
        )
    },

    uploadResult: function () {
      return axios
        .post('/api/upload/result', {
          eventId: this.eventId,
          course: this.course,
          name: this.name,
          time: this.time,
        })
        .then(() => {
          this.$messages.addMessage('Result Uploaded Successfully')
          this.$router.push(`/events/${this.eventId}/results`)
        })
        .catch((error) =>
          this.$messages.addMessage(error.response.data.message)
        )
    },
  },
}
</script>
