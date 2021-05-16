<template>
  <Layout has-mobile-sub-title gray :not-found="!competitor?.name">
    <Meta
      :title="`Munro - ${competitor?.name ?? ''} - Competitor`"
      :description="`Results for ${competitor?.name ?? ''} in the ${
        competitor?.league ?? ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munroleagues.com/competitors/${$route.params.id}`"
      :block-robots="false"
    />
    <template #title>
      <router-link
        :to="`/leagues/${competitor?.league}`"
        class="mb-1 text-xl font-bold  text-main-700 font-heading focus-visible:shadow-outline rounded-shape"
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
      v-if="competitor && auth.loggedIn"
      class="col-span-2 card card-color-dark"
    >
      <h2 class="text-3xl font-bold text-white font-heading">Admin Actions</h2>

      <div>
        <router-link
          :to="`/leagues/${competitor?.league}/competitors`"
          class="button button-white"
        >
          All Competitors
        </router-link>
        <router-link
          :to="`/competitors/${$route.params.id}/edit`"
          class="button button-white"
        >
          Edit Competitor
        </router-link>
        <router-link
          :to="`/competitors/merge?league=${competitor?.league}&course=${competitor?.course}&competitorToKeep=${competitor?.id}`"
          class="button button-white"
        >
          Merge Competitors
        </router-link>
        <router-link
          :to="`/results/transfer?league=${competitor?.league}`"
          class="button button-white"
        >
          Transfer Result
        </router-link>
        <router-link
          :to="`/results/manual?league=${competitor?.league}`"
          class="button button-white"
        >
          Manual Points
        </router-link>
      </div>
    </div>

    <CardResult
      v-for="result of results"
      :key="result?.id ?? 0"
      :result="result"
      :show-time="league?.dynamicEventResults"
      @result-changed="refreshResults"
    />
  </Layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import CardResult from '../components/CardResult.vue'

import { toSingleString } from '../scripts/typeHelpers'

import { useAuthentication } from '../store/authentication'

import { useLeague } from '../api/leagues'
import { useCompetitor } from '../api/competitors'
import { useCompetitorResults } from '../api/results'

const route = useRoute()
const auth = useAuthentication()

/* Get Data */

const routeParamsId = computed(() => toSingleString(route.params.id))
const [competitor] = await useCompetitor(routeParamsId)
const competitorLeague = computed(() => competitor.value?.league ?? '')
const [league] = await useLeague(competitorLeague)
const [results, refreshResults] = await useCompetitorResults(routeParamsId)
</script>
