<template>
  <Layout has-mobile-sub-title gray>
    <Meta
      :title="`Munro - &quot;${$route.params.query || ''}&quot;`"
      description="Munro - League Results.
    Sorted. Sports League Results Calculated Quick and Easily, with Results
    Sorting and Filtering Options"
      url="https://munroleagues.com/search"
      :block-robots="false"
    />

    <template #title>
      <div
        class="
          flex flex-col
          items-start
          justify-between
          sm:items-center
          sm:flex-row
        "
      >
        <h1 class="mb-4 text-3xl font-bold leading-tight sm:mb-0 font-heading">
          Search
        </h1>
        <SearchBox />
      </div>
    </template>

    <div
      v-if="leagues.length > 0"
      class="flex flex-row flex-wrap justify-between w-full col-span-2 -mb-4"
    >
      <h2
        class="
          inline-block
          py-2
          leading-tight
          tracking-wide
          uppercase
          select-none
          font-heading
          text-main-600
        "
      >
        Leagues
      </h2>
      <router-link
        to="/leagues"
        class="
          inline-block
          px-4
          pt-2
          text-xs
          leading-6
          tracking-wider
          text-right
          uppercase
          transition
          duration-300
          select-none
          text-main-600
          font-heading
          hover:bg-main-100
          focus:bg-main-100
          rounded-shape
        "
      >
        View All Leagues &rarr;
      </router-link>
    </div>

    <CardLeague
      v-for="league of leagues"
      :key="league?.name"
      :title="league?.name"
      :description="league?.description"
    />

    <h2
      v-if="events.length > 0"
      class="col-span-2 -mb-4 uppercase select-none font-heading text-main-700"
    >
      Events
    </h2>

    <CardEvent
      v-for="event of events"
      :key="event?.id ?? 0"
      :event="event"
      :league="{ dynamicEventResults: true }"
      :show-league-name="true"
      :show-full-details="false"
    />

    <h2
      v-if="competitors.length > 0"
      class="col-span-2 -mb-4 uppercase select-none font-heading text-main-700"
    >
      Competitors
    </h2>

    <CardCompetitor
      v-for="competitor of competitors"
      :key="competitor?.id"
      :competitor="competitor"
    />
    <NoResults
      v-if="
        leagues.length === 0 &&
        events.length === 0 &&
        competitors.length === 0 &&
        $route.params.query
      "
      :text="`Sorry I Couldn't Find &quot;${$route.params.query || ''}&quot;`"
      secondary-text="Try Tweaking Your Search Query To Find a Match"
      class="col-span-2"
    />
    <p v-else>&nbsp;</p>
  </Layout>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import SearchBox from '../components/SearchBox.vue'
import CardEvent from '../components/CardEvent.vue'
import CardLeague from '../components/CardLeague.vue'
import CardCompetitor from '../components/CardCompetitor.vue'

const NoResults = defineAsyncComponent(
  () => import('../components/CardNoResults.vue')
)

import { toSingleString } from '../scripts/typeHelpers'

import { useQuery } from '../api/search'

const route = useRoute()

const routeParamsQuery = computed(() => toSingleString(route.params.query))
const [data] = await useQuery(routeParamsQuery)
const leagues = computed(() => data.value?.leagues ?? [])
const events = computed(() => data.value?.events ?? [])
const competitors = computed(() => data.value?.competitors ?? [])
</script>
