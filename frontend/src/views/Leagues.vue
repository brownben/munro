<template>
  <Layout title="Leagues">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Leagues"
      description="League Results on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/leagues"
    />

    <CardLeague
      v-for="league of leagues"
      :key="league.name"
      :title="league.name"
      :description="league.description"
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
