<template>
  <Layout has-mobile-sub-title gray :not-found="!loading && !competitor?.name">
    <Meta
      :title="`Munro - ${competitor?.name ?? ''} - Competitor`"
      :description="`Results for ${competitor?.name ?? ''} in the ${
        competitor?.league ?? ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/competitors/${$route.params.id}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />
    <template #title>
      <router-link
        :to="`/leagues/${competitor?.league}`"
        class="mb-1 text-xl font-bold text-main-700 font-heading"
      >
        {{ competitor?.league }}
      </router-link>
      <h1 class="text-4xl font-bold font-heading leading-12">
        {{ competitor?.name }}
      </h1>
      <h2 class="text-xl text-gray-600 font-heading">
        <span class="mr-2 md:mr-4">{{ competitor?.course }}</span>
        <span v-if="competitor?.club" class="mr-2 md:mr-4">
          {{ competitor?.club }}
        </span>
        <span v-if="competitor?.ageClass"> {{ competitor?.ageClass }}</span>
      </h2>
    </template>

    <div
      v-if="competitor && $store.getters.loggedIn"
      class="col-span-2 card card-color-dark"
    >
      <h2 class="text-3xl font-bold text-white font-heading">Admin Actions</h2>

      <div>
        <router-link
          :to="`/competitors/${$route.params.id}/edit`"
          class="button button-white"
        >
          Edit Competitor
        </router-link>
        <router-link to="/competitors/merge" class="button button-white">
          Merge Competitors
        </router-link>
        <router-link to="/results/transfer" class="button button-white">
          Transfer Result
        </router-link>
        <router-link to="/results/manual" class="button button-white">
          Manual Points
        </router-link>
      </div>
    </div>

    <CardResult
      v-for="result of results"
      :key="result?.id ?? 0"
      :result="result"
      :show-time="league?.dynamicEventResults"
      @result-changed="refreshDetails"
    />
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import CardResult from '../components/CardResult.vue'

import { toSingleString } from '../scripts/typeHelpers'

import { getLeague } from '../api/leagues'
import { getCompetitor } from '../api/competitors'
import { getCompetitorResults } from '../api/results'

const route = useRoute()

/* Get Data */
const loading = ref(true)
const league = ref<League | null>(null)
const competitor = ref<Competitor | null>(null)
const results = ref<EventResult[]>([])

const refreshDetails = async () => {
  const routeParamsId = toSingleString(route.params.id)
  loading.value = true

  await Promise.all([
    getCompetitor(routeParamsId)
      .then((competitorDetails) => {
        competitor.value = competitorDetails
      })
      .then(() => getLeague(competitor.value?.league ?? ''))
      .then((leagueDetails) => {
        league.value = leagueDetails
      }),
    getCompetitorResults(routeParamsId).then((resultDetails) => {
      results.value = resultDetails ?? []
    }),
  ])

  loading.value = false
}
watch(route, refreshDetails, { immediate: true })
</script>
