<!--
  League Events Page for Embedding
-->

<template>
  <Layout v-if="league && league.name" :not-found="!league && !loading">
    <Meta
      :title="`Munro - ${$route.params.name} League`"
      :description="`Event Information and Results for the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
    />

    <EventOverviewCard
      v-for="event of events"
      :key="event.name"
      :event="event"
      :league="league"
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
import { ref, watch, onMounted, computed } from 'vue'

import { toSingleString } from '../scripts/typeHelpers'

import $store from '../store/index'
import $router from '../router/index'
const { currentRoute: $route } = $router

import { getLeague } from '../api/leagues'
import { getLeagueEvents } from '../api/events'

const loading = ref(true)
const league = ref<League | null>(null)
const events = ref<Event[]>([])

const refreshDetails = async () => {
  const routeParamsName = toSingleString($route.value.params.name)
  loading.value = true

  await Promise.all([
    getLeagueEvents(routeParamsName, $store.getters.loggedIn).then(
      (eventDetails) => {
        events.value = eventDetails
      }
    ),
    getLeague(routeParamsName).then((leagueDetails) => {
      league.value = leagueDetails
    }),
  ])

  loading.value = false
}

watch($route, refreshDetails, { immediate: true })
</script>
