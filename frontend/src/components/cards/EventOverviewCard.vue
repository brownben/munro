<template>
  <div
    class="flex flex-col items-center justify-between col-span-2 pt-4 text-center bg-white shadow-md rounded-shape-xl"
  >
    <div class="px-4 md:px-6 lg:px-8">
      <h3
        v-if="showLeagueName"
        class="text-xl font-bold leading-6 font-heading text-main-700"
      >
        {{ event.league }}
      </h3>
      <h2 class="text-3xl font-bold font-heading text-main-900">
        {{ event.name }}
      </h2>
      <h4 class="text-lg text-opacity-75 font-heading text-main-900">
        <template v-if="event.date">
          {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
            event.date.split('-')[0]
          }}
        </template>
        <template v-if="event.organiser && event.date"> - </template>
        <template v-if="event.organiser"
          >Organised By {{ event.organiser }}</template
        >
      </h4>

      <div
        class="mb-2"
        :class="{
          'py-2': event.moreInformation || event.website,
        }"
      >
        <p v-if="event.moreInformation" class="mb-1">
          {{ event.moreInformation }}
        </p>
        <p v-if="event.website" class="mt-1">
          More Information can be found on the
          <a
            :href="event.website"
            target="_blank"
            rel="noopener noreferrer"
            class="link text-main-700"
            >event website</a
          >
        </p>
      </div>

      <div class="pb-4 mt-2">
        <router-link
          v-if="event.resultUploaded && league.dynamicEventResults"
          :to="`/events/${event.id}/results`"
          class="button"
          >Results</router-link
        >
        <a
          v-if="event.results"
          :href="event.results"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >Raw Results</a
        >
        <a
          v-if="event.winsplits"
          :href="event.winsplits"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >WinSplits</a
        >
        <a
          v-if="event.routegadget"
          :href="event.routegadget"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          >Routegadget</a
        >
      </div>
    </div>
    <div
      v-if="auth.user"
      class="w-full px-4 pt-4 pb-4 mt-2 shadow md:px-6 bg-main-100 rounded-shape-xl"
    >
      <h4 class="text-2xl font-bold text-center text-main-800 font-heading">
        Admin Actions
      </h4>

      <p class="mt-2">
        <b class="mr-1 text-main-800">Event ID:</b>
        {{ event.id }}
      </p>
      <p v-if="event.uploadKey" class="mb-2">
        <b class="mr-1 text-main-800">Event Upload Key:</b>
        {{ event.uploadKey }}
      </p>

      <router-link :to="'/events/' + event.id + '/edit'" class="button-dark"
        >Edit Event</router-link
      >
      <router-link :to="'/upload/' + event.id" class="button-dark"
        >Upload Results</router-link
      >
      <button class="button-dark" @click="deleteEvent(event)">
        Delete Event
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    showLeagueName: { type: Boolean, default: false },
    event: { type: Object, default: () => ({}) },
    league: { type: Object, default: () => ({}) },
    auth: { type: Object, default: () => ({}) },
  },

  methods: {
    deleteEvent: function (event) {
      if (
        confirm(
          `Are you Sure you Want to Delete Event - ${event.name}? \nThis Action Can't Be Recovered`
        )
      ) {
        return axios
          .delete(`/api/events/${event.id}`)
          .then(() =>
            this.$messages.addMessage(`Event: ${event.name} was Deleted`)
          )
          .then(() => this.$emit('eventChanged'))
          .catch(() =>
            this.$messages.addMessage(
              'Problem Deleting Event - Please Try Again'
            )
          )
      }
    },
  },
}
</script>
