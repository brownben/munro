<template>
  <Layout title="Latest Results">
    <Meta
      title="Munro - Latest Results"
      description="The latest results from events on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/latest-results"
      :block-robots="false"
    />
    <CardEvent
      v-for="event of events"
      :key="event?.id ?? 0"
      :event="event"
      :league="{ dynamicEventResults: true }"
      :show-league-name="true"
      :show-full-details="false"
    />
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '../components/Layout.vue'
import CardEvent from '../components/CardEvent.vue'

import { useLatestResults } from '../api/events'

const [events] = useLatestResults()
</script>
