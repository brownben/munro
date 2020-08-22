<!--
  Leagues

  List of leagues
-->

<template>
  <Layout title="Leagues" :footer="leagues && leagues.length > 0">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Leagues"
      description="League Results on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/leagues"
    />

    <LeagueOverviewCard
      v-for="league of leagues"
      :key="league.name"
      :title="league.name"
      :description="league.description"
    />
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import LeagueOverviewCard from '/@/components/cards/LeagueOverviewCard.vue'

export default {
  components: {
    Layout,
    LeagueOverviewCard,
  },
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { League, getLeagues } from '/@/api/leagues'

export const leagues = ref<League[]>([])

onMounted(async () => {
  leagues.value = await getLeagues()
})
</script>
