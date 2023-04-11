<script setup lang="ts">
import type { Event } from '~/api-types'

const { data: events } = await useData<Event[]>(`events/latest-results`)

useTitle({
  title: 'Latest Results',
  description: 'Events with the latest results',
})
</script>
<template>
  <div>
    <Heading title="Latest Results" />

    <main
      class="mx-auto max-w-screen-lg gap-8 px-6 py-6 sm:py-10 md:py-14 lg:px-8"
    >
      <div class="col-span-2 -mx-4 -mb-4 -mt-8 flex flex-col divide-y">
        <Event
          v-for="event in events"
          :key="event.id"
          :event="event"
          h2
          class="px-4 py-10"
        />
      </div>
    </main>
  </div>
</template>
