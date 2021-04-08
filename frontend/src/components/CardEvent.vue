<template>
  <section
    class="flex flex-col items-center justify-between col-span-2 pt-5 text-center bg-white shadow-md rounded-shape-xl"
    :class="{ 'xl:col-span-1': !showFullDetails }"
  >
    <div class="flex-grow w-full px-5 my-auto md:px-6 lg:px-8">
      <router-link
        v-if="showLeagueName"
        :to="`/leagues/${event.league}`"
        class="text-xs font-bold tracking-widest uppercase sm:tracking-wider sm:text-sm font-heading text-main-700 leading-none"
      >
        {{ event.league }}
      </router-link>
      <h2
        class="mt-2 mb-1 text-3xl font-bold leading-tight tracking-tight text-gray-900 font-heading"
      >
        {{ event.name }}
      </h2>
      <h3 class="mt-1 text-lg text-gray-600 font-heading last:mb-4 md:mt-0">
        <span v-if="event.date" class="leading-4">
          {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
            event.date.split('-')[0]
          }}
        </span>
        <span
          v-if="event.organiser && event.date"
          class="hidden mx-1 md:inline-block"
        >
          -
        </span>
        <span
          v-if="event.organiser"
          class="block text-base leading-tight md:inline-block md:text-lg"
        >
          Organised By {{ event.organiser }}
        </span>
      </h3>

      <div
        v-if="
          showFullDetails &&
          (event.moreInformation ||
            event.website ||
            event?.league !== league?.name)
        "
        class="mt-2 mb-4 text-base leading-snug"
      >
        <p
          v-if="event?.league !== league?.name"
          class="mb-1 text-gray-600 break-words"
        >
          This event is also in the {{ event.league }} league.
        </p>

        <p v-if="event.moreInformation" class="mb-1 text-gray-600 break-words">
          {{ event.moreInformation }}
        </p>

        <p v-if="event.website" class="text-gray-600">
          More Information can be found on the
          <a
            :href="event.website"
            target="_blank"
            rel="noopener noreferrer"
            class="link text-main-700"
          >
            event website
          </a>
        </p>
      </div>

      <div
        v-if="
          (event.resultUploaded && league?.dynamicEventResults) ||
          event.results ||
          event.winsplits ||
          event.routegadget
        "
        class="w-full pb-5 mt-3"
      >
        <router-link
          v-if="event.resultUploaded && league?.dynamicEventResults"
          :to="`/events/${event.id}/results`"
          class="button"
        >
          Results
        </router-link>
        <a
          v-if="event.results"
          :href="event.results"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >
          Raw Results
        </a>
        <a
          v-if="event.winsplits"
          :href="event.winsplits"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >
          WinSplits
        </a>
        <a
          v-if="event.routegadget"
          :href="event.routegadget"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >
          Routegadget
        </a>
      </div>
    </div>
    <div
      v-if="$store.getters.loggedIn"
      class="w-full px-4 pt-4 pb-4 mt-2 bg-main-50 md:px-6 rounded-shape-xl"
    >
      <div class="mb-2">
        <p class="mx-2">
          <b
            class="block mr-1 leading-tight select-none text-main-900 sm:inline-block"
          >
            Event ID:
          </b>
          <span class="select-all">{{ event.id }}</span>
        </p>
        <p v-if="event.uploadKey" class="leading-tight mt-3 sm:my-2">
          <b
            class="block mr-1 leading-tight select-none text-main-900 sm:inline-block"
          >
            Event Upload Key:
          </b>
          <span class="select-all leading-tight">{{ event.uploadKey }}</span>
        </p>
      </div>

      <router-link
        :to="'/events/' + event.id + '/edit'"
        class="button button-dark"
      >
        Edit Event
      </router-link>
      <router-link
        :to="`/upload/file?eventId=${event.id}&uploadKey=${event.uploadKey}`"
        class="button button-dark"
      >
        Upload Results
      </router-link>
      <button class="button button-dark" @click="deleteEvent(event)">
        Delete Event
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue'
import type { PropType } from 'vue'
import { deleteEvent as apiDeleteEvent } from '../api/events'

const props = defineProps({
  showLeagueName: { type: Boolean, default: false },
  event: { type: Object as PropType<LeagueEvent>, default: () => ({}) },
  league: {
    type: Object as PropType<Partial<League> | null>,
    default: () => ({}),
  },
  showFullDetails: { type: Boolean, default: true },
})
const emit = defineEmit({ 'event-changed': () => {} })

const deleteEvent = (event: LeagueEvent) => {
  if (
    confirm(
      `Are you Sure you Want to Delete Event - ${event.name}? \nThis Action Can't Be Recovered`
    )
  )
    apiDeleteEvent(event.id, event.name).then(() => emit('event-changed'))
}
</script>
