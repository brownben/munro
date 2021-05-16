<template>
  <Layout v-if="league && league.name" :not-found="!league">
    <Meta
      :title="`Munro - ${$route.params.name} League`"
      :description="`Event Information and Results for the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :block-robots="true"
    />
    <CardEvent
      v-for="event of events"
      :key="event?.name ?? 0"
      :event="event"
      :league="league"
    />
  </Layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import CardEvent from '../components/CardEvent.vue'

import { toSingleString } from '../scripts/typeHelpers'

import { useLeague } from '../api/leagues'
import { useLeagueEvents } from '../api/events'

const route = useRoute()

const routeParamsName = computed(() => toSingleString(route.params.name))
const [league] = await useLeague(routeParamsName)
const [events] = await useLeagueEvents(routeParamsName)
</script>
