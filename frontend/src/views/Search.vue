<template>
  <Layout has-mobile-sub-title gray>
    <template #title>
      <Meta
        :head="{ meta: { name: 'robots', content: 'all' } }"
        :title="`Munro - &quot;${$route.params.query || ''}&quot;`"
        description="Munro - League Results.
    Sorted. Sports League Results Calculated Quick and Easily, with Results
    Sorting and Filtering Options"
        url="https://munro-leagues.herokuapp.com/search"
      />
      <div
        class="flex flex-col items-start justify-between sm:items-center sm:flex-row"
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
        class="inline-block py-2 leading-tight tracking-wide uppercase select-none font-heading text-main-600"
      >
        Leagues
      </h2>
      <router-link
        to="/leagues"
        class="inline-block px-4 pt-2 text-xs leading-6 tracking-wider text-right uppercase transition duration-300 select-none text-main-600 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape"
      >
        View All Leagues →
      </router-link>
    </div>

    <LeagueOverviewCard
      v-for="league of leagues"
      :key="league.name"
      :title="league.name"
      :description="league.description"
    />

    <h2
      v-if="events.length > 0"
      class="col-span-2 -mb-4 uppercase select-none font-heading text-main-700"
    >
      Events
    </h2>

    <EventOverviewCard
      v-for="event of events"
      :key="event.id"
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

    <CompetitorOverviewCard
      v-for="competitor of competitors"
      :key="competitor.id"
      :competitor="competitor"
    />
    <NoResults
      v-if="
        leagues.length === 0 &&
        events.length === 0 &&
        competitors.length === 0 &&
        !loading &&
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
import { ref, watch, onMounted, computed, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import SearchBox from '../components/inputs/SearchBox.vue'
import EventOverviewCard from '../components/cards/EventOverviewCard.vue'
import LeagueOverviewCard from '../components/cards/LeagueOverviewCard.vue'
import CompetitorOverviewCard from '../components/cards/CompetitorOverviewCard.vue'

const NoResults = defineAsyncComponent(
  () => import('../components/cards/NoResultsCard.vue')
)

import { toSingleString } from '../scripts/typeHelpers'

import { getQuery } from '../api/search'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const leagues = ref<League[]>([])
const events = ref<Event[]>([])
const competitors = ref<Competitor[]>([])

const getDetails = async () => {
  loading.value = true
  const routeParamsQuery = toSingleString(route.params.query || '')
  const queryResult = await getQuery(routeParamsQuery)
  if (queryResult) {
    leagues.value = queryResult.leagues
    events.value = queryResult.events
    competitors.value = queryResult.competitors
  }
  loading.value = false
}

watch(route, getDetails, { immediate: true })
</script>
