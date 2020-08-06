<template>
  <section
    v-if="latestResults && latestResults.length > 1"
    class="w-full pt-8 pb-10 bg-gray-100"
  >
    <div
      class="flex flex-row flex-wrap justify-between w-10/12 mx-auto mb-4 xl:w-3/4"
    >
      <h2
        class="inline-block py-2 text-lg leading-6 tracking-wide uppercase font-heading text-main-600"
      >
        Latest Results
      </h2>
      <router-link
        to="/latest-results"
        class="inline-block px-4 pt-2 text-sm leading-6 tracking-wide text-right uppercase transition duration-300 text-main-600 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape"
      >
        View More →
      </router-link>
    </div>

    <div class="grid w-10/12 grid-cols-2 gap-8 mx-auto xl:w-3/4 md:grid-cols-3">
      <EventCard
        v-for="event of latestResults.slice(0, 3)"
        :key="event.key"
        :event="event"
      />
    </div>
  </section>
</template>
<script>
import axios from 'axios'

import EventCard from '@/components/cards/EventCardSmall.vue'

export default {
  components: {
    EventCard,
  },

  data: function () {
    return {
      latestResults: [],
    }
  },

  mounted: function () {
    this.getEventsWithResults()
  },

  methods: {
    getEventsWithResults: function () {
      return axios
        .get('/api/events/latest-results')
        .then((response) => {
          this.latestResults = response.data
        })
        .catch(() => {
          this.latestResults = false
        })
    },
  },
}
</script>
