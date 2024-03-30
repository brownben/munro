<script setup lang="ts">
import type { PropType } from 'vue'
import {
  UserIcon,
  CalendarIcon,
  GlobeEuropeAfricaIcon as GlobeIcon,
  PuzzlePieceIcon,
  TagIcon,
  CloudArrowUpIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/vue/24/outline'
import { displayDate } from '~/utils/date'
import type { Event } from '~/api-types'

const props = defineProps({
  event: { type: Object as PropType<Event>, required: true },
  h2: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
})
const emit = defineEmits(['event-changed'])

const resultsLinks = computed(() =>
  Object.keys(props.event.results_links).filter(
    (link) => props.event.results_links[link],
  ),
)
const uploadLink = `/upload/file?event_id=${encodeURIComponent(
  props.event.id,
)}&upload_key=${encodeURIComponent(props.event.upload_key ?? '')}`

const deleteEvent = async () => {
  if (
    confirm(
      `Are you sure you want to delete event "${props.event.name}"? \n\nThe event will be deleted from all leagues. This action cannot be reversed.`,
    )
  ) {
    await useDelete(`events/${props.event.id}`)
    emit('event-changed')
  }
}
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2
      v-if="h2"
      class="text-3xl font-black text-gray-900 sm:text-4xl dark:text-gray-100"
    >
      {{ event.name }}
    </h2>
    <h3
      v-else
      class="text-3xl font-black text-gray-900 sm:text-4xl dark:text-gray-100"
    >
      {{ event.name }}
    </h3>

    <div class="flex flex-col gap-x-7 gap-y-2 sm:flex-row sm:flex-wrap">
      <ImageRow :icon="CalendarIcon" darker>
        {{ displayDate(event.date) }}
      </ImageRow>
      <ImageRow v-if="event.organiser" :icon="UserIcon" darker>
        Organised by
        <strong class="font-medium">{{ event.organiser }}</strong>
      </ImageRow>
      <ImageRow v-if="event.part_of" :icon="PuzzlePieceIcon" darker>
        Part of
        <strong class="font-medium">{{ event.part_of }}</strong>
      </ImageRow>
      <ImageRow v-if="event?.group" :icon="TagIcon" darker>
        <strong class="font-medium">{{ event?.group }}</strong>
      </ImageRow>
      <ImageRow v-if="event.website" :icon="GlobeIcon" darker hover>
        <a :href="event.website" rel="noopener noreferrer" target="_blank">
          Event Website
        </a>
      </ImageRow>
    </div>

    <p
      v-if="event.more_information && !small"
      class="text-gray-600 dark:text-gray-400"
    >
      {{ event.more_information }}
    </p>

    <div v-if="event.results_uploaded" class="mt-3 flex flex-wrap gap-3">
      <ButtonSmall :link="`/events/${event.id}/results`" coloured>
        Results
      </ButtonSmall>
      <ButtonSmall
        v-for="result_type in resultsLinks"
        :key="result_type"
        :link="props.event.results_links[result_type]"
        coloured
        external
      >
        {{ result_type }}
      </ButtonSmall>
    </div>

    <template v-if="admin">
      <dl class="text-gray-800 dark:text-gray-400">
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">
            Event ID:
          </dt>
          <dd class="select-all truncate">{{ event.id }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">
            Upload Key:
          </dt>
          <dd class="select-all">{{ event.upload_key }}</dd>
        </div>
      </dl>

      <div class="-mb-2 flex flex-wrap gap-3">
        <ButtonSmall :link="uploadLink">
          <CloudArrowUpIcon class="size-4" aria-hidden="true" />
          Upload Results
        </ButtonSmall>
        <ButtonSmall :link="`/events/${event.id}/edit`">
          <PencilSquareIcon class="size-4" aria-hidden="true" />
          Edit
        </ButtonSmall>
        <ButtonSmall @click="deleteEvent">
          <TrashIcon class="size-4" aria-hidden="true" />
          Delete
        </ButtonSmall>
      </div>
    </template>
  </article>
</template>
