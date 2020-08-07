<template>
  <section
    class="flex flex-col items-center justify-between col-span-2 pt-5 text-center bg-white shadow-md rounded-shape-xl"
  >
    <div class="w-full px-5 md:px-6 lg:px-8">
      <h3
        v-if="showLeagueName"
        class="text-xl font-bold leading-6 font-heading text-main-700"
      >
        {{ event.league }}
      </h3>
      <h2
        class="mt-2 mb-1 text-3xl font-bold leading-8 font-heading text-gray-900"
      >
        {{ event.name }}
      </h2>
      <h4
        class="mt-1 text-lg text-opacity-75 font-heading text-gray-900 last:mb-4 md:mt-0"
      >
        <span v-if="event.date" class="leading-4">
          {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
            event.date.split('-')[0]
          }}
        </span>
        <span
          v-if="event.organiser && event.date"
          class="hidden mx-1 md:inline-block"
          >-</span
        >
        <span
          v-if="event.organiser"
          class="block text-base leading-4 md:inline-block md:text-lg"
        >
          Organised By {{ event.organiser }}
        </span>
      </h4>

      <div
        v-if="event.moreInformation || event.website"
        class="mt-3 mb-2 md:mt-0"
        :class="{
          'py-3': event.moreInformation || event.website,
        }"
      >
        <p v-if="event.moreInformation" class="text-opacity-75 text-gray-900">
          {{ event.moreInformation }}
        </p>
        <p v-if="event.website" class="mt-1 text-opacity-75 text-gray-900">
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

      <div
        v-if="
          event.resultUploaded ||
          event.results ||
          event.winsplits ||
          event.routegadget
        "
        class="w-full pb-4 mt-2"
      >
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
      class="w-full px-4 pt-4 pb-4 mt-2 bg-main-50 md:px-6 rounded-shape-xl"
    >
      <p class="mx-2 mt-2">
        <b class="mr-1 select-none text-main-800">Event ID:</b>
        {{ event.id }}
      </p>
      <p v-if="event.uploadKey" class="mb-3">
        <b class="mr-1 select-none text-main-800">Event Upload Key:</b>
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
  </section>
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
<style lang="postcss">
.last\:mb-4:last-child {
  @apply mb-4;
}
</style>
