<script setup lang="ts">
import type { PropType } from 'vue'
import {
  UserIcon,
  CalendarIcon,
  GlobeIcon,
  CollectionIcon,
} from '@heroicons/vue/outline/index.js'
import { displayDate } from '~/utils/date'
import type { Event } from '~/api-types'

const props = defineProps({
  event: { type: Object as PropType<Event>, required: true },
  h2: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
})
const emit = defineEmits(['event-changed'])

const resultsLinks = computed(() =>
  Object.keys(props.event.results_links).filter(
    (link) => props.event.results_links[link]
  )
)

const deleteEvent = async () => {
  if (
    confirm(
      `Are you sure you want to delete event "${props.event.name}"? \nThis action cannot be reversed.`
    )
  ) {
    await useDelete(`events/${props.event.id}`)
    emit('event-changed')
  }
}
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2 v-if="h2" class="text-3xl font-black text-gray-900 sm:text-4xl">
      {{ event.name }}
    </h2>
    <h3 v-else class="text-3xl font-black text-gray-900 sm:text-4xl">
      {{ event.name }}
    </h3>
    <div class="flex flex-col gap-y-2 gap-x-7 sm:flex-row sm:flex-wrap">
      <ImageRow :icon="CalendarIcon" darker>
        {{ displayDate(event.date) }}
      </ImageRow>
      <ImageRow v-if="event.organiser" :icon="UserIcon" darker>
        Organised by
        <strong class="font-medium">{{ event.organiser }}</strong>
      </ImageRow>
      <ImageRow v-if="event.part_of" :icon="CollectionIcon" darker>
        Part of the
        <strong class="font-medium">{{ event.part_of }}</strong>
      </ImageRow>
      <ImageRow v-if="event.website" :icon="GlobeIcon" darker hover>
        <a :href="event.website" rel="noopener noreferrer" target="_blank">
          Event Website
        </a>
      </ImageRow>
    </div>
    <p v-if="event.more_information" class="text-gray-600">
      {{ event.more_information }}
    </p>
    <div v-if="event.results_uploaded" class="mt-3 flex flex-wrap gap-3">
      <NuxtLink
        :to="`/events/${event.id}/results`"
        class="rounded bg-main-100 px-2 py-1 text-sm font-medium text-main-700 transition hover:bg-main-200"
      >
        Results
      </NuxtLink>
      <a
        v-for="result_type in resultsLinks"
        :key="result_type"
        :href="props.event.results_links[result_type]"
        class="rounded bg-main-100 px-2 py-1 text-sm font-medium text-main-700 transition hover:bg-main-200"
      >
        {{ result_type }}
      </a>
    </div>
    <template v-if="admin">
      <dl class="text-gray-800">
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium">Event ID:</dt>
          <dd class="select-all truncate">{{ event.id }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium">Upload Key:</dt>
          <dd class="select-all">{{ event.upload_key }}</dd>
        </div>
      </dl>
      <div class="-mb-2 flex flex-wrap gap-3">
        <NuxtLink
          :to="`/upload/file?event_id=${event.id}&upload_key=${event.upload_key}`"
          class="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Upload Results
        </NuxtLink>
        <NuxtLink
          :to="`/events/${event.id}/edit`"
          class="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Edit Event
        </NuxtLink>
        <button
          class="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          @click="deleteEvent"
        >
          Delete Event
        </button>
      </div>
    </template>
  </article>
</template>
