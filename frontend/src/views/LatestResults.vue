<template>
  <Layout title="Latest Results">
    <Meta
      title="Munro - Latest Results"
      description="The latest results from events on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/latest-results"
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
import { ref, onMounted } from 'vue'
import { getLatestResults } from '../api/events'
import Layout from '../components/Layout.vue'
import CardEvent from '../components/CardEvent.vue'

const events = ref<LeagueEvent[]>([])

onMounted(async () => {
  events.value = (await getLatestResults()) ?? []
})
</script>
