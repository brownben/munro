<!--
  Latest Results

  List of events with the latest results
-->

<template>
  <Layout title="Latest Results" :footer="events && events.length > 0">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Latest Results"
      description="The latest results from events on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/latest-results"
    />

    <EventOverviewCard
      v-for="event of events"
      :key="event.id"
      :event="event"
      :league="{ dynamicEventResults: true }"
      :show-league-name="true"
      :show-full-details="false"
    />
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import EventOverviewCard from '/@/components/cards/EventOverviewCard.vue'

export default {
  components: {
    Layout,
    EventOverviewCard,
  },
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { Event, getLatestResults } from '../api/events'

export const events = ref<Event[]>([])

onMounted(async () => {
  events.value = await getLatestResults()
})
</script>
