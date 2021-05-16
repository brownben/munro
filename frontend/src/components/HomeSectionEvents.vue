<template>
  <section
    v-if="events && events.length >= 3"
    class="w-full pt-8 pb-10 bg-gray-50"
  >
    <div class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
      <div class="flex flex-row flex-wrap justify-between px-6 mx-auto mb-4">
        <h2
          class="inline-block py-2 text-lg leading-6 tracking-wide uppercase  font-heading text-main-700"
        >
          Latest Results
        </h2>
        <div>
          <router-link
            to="/latest-results"
            class="inline-block px-4 py-2 text-sm tracking-wide text-right uppercase transition duration-300  text-main-700 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape focus-visible:shadow-outline"
          >
            View More &rarr;
          </router-link>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-8 px-6 mx-auto md:grid-cols-3">
        <CardEvent
          v-for="event of events.slice(0, 3)"
          :key="event?.id"
          :event="event"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CardEvent from './CardEventSmall.vue'

import { useLatestResults } from '../api/events'

const [events] = await useLatestResults()
</script>
