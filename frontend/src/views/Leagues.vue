<template>
  <Layout title="Leagues">
    <Meta
      title="Munro - Leagues"
      description="League Results on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/leagues"
      :block-robots="false"
    />
    <CardLeague
      v-for="league of leagues"
      :key="league?.name ?? ''"
      :title="league?.name ?? ''"
      :description="league?.description ?? ''"
    />
  </Layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getLeagues } from '../api/leagues'
import Layout from '../components/Layout.vue'
import CardLeague from '../components/CardLeague.vue'

const leagues = ref<League[]>([])

onMounted(async () => {
  leagues.value = (await getLeagues()) ?? []
})
</script>
