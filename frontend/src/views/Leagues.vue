<template>
  <Layout title="Leagues">
    <Meta
      title="Munro - Leagues"
      description="League Results on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/leagues"
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
import Layout from '../components/Layout.vue'
import CardLeague from '../components/CardLeague.vue'

import { useLeagues } from '../api/leagues'

const [leagues] = await useLeagues()
</script>
