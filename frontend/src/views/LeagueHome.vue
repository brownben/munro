<!--
  League Home Page

  Shows all league details as well as all details for each event in the league, including
  the upload key and event id needed for event upload if logged in. If logged in it also diaplays
  options to edit/ update/ delete the events/ league. Also has links to results for each course
-->

<template>
  <Layout
    gray
    :not-found="!league && !loading"
    :footer="league && league.name && events && events.length > 0"
  >
    <Meta
      :title="`Munro - ${$route.params.name}`"
      :description="`Event Information and Results for the ${$route.params.name} league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/leagues/${$route.params.name}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        {{ league?.name || $route.params.name }}
      </h1>
      <h2 v-if="league && league.description" class="mt-2 text-lg font-heading">
        {{ league.description }}
      </h2>
    </template>

    <template v-if="league" #white>
      <section class="w-full text-left bg-white">
        <p v-if="league.courses" class="w-full leading-6 text-gray-600">
          There are normally
          {{ league.courses.length }} courses -
          <span class="text-gray-900 md:text-lg font-heading">
            {{ leagueCourses }}
          </span>
        </p>
        <p v-if="league.coordinator" class="w-full leading-6 text-gray-600">
          <span class="text-gray-900 md:text-lg font-heading">{{
            league.coordinator
          }}</span>
          coordinates the league.
        </p>
        <p v-if="league.scoringMethod" class="w-full leading-6 text-gray-600">
          The scoring for the league is calculated using a
          <span class="text-gray-900 md:text-lg font-heading">{{
            scoringMethodShorthandToFull(league.scoringMethod)
          }}</span>

          <span
            v-if="league.numberOfCountingEvents && league.numberOfEvents"
            class="block"
          >
            Your
            <span class="text-gray-900 md:text-lg font-heading">
              best {{ league.numberOfCountingEvents }} scores
            </span>
            from all
            {{ league.numberOfEvents }}
            events, count towards your score.
          </span>
        </p>

        <p
          v-if="league.moreInformation"
          class="w-full my-2 leading-6 text-gray-600"
        >
          <span
            v-for="line of league.moreInformation.split('|')"
            :key="line"
            class="block"
          >
            {{ line }}
          </span>
        </p>

        <p v-if="league.website" class="w-full mt-2 leading-6 text-gray-600">
          More information can be found at:
          <a
            :href="league.website"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-1 link font-heading text-main-800"
          >
            {{ league.website }}
          </a>
        </p>
      </section>
    </template>

    <template v-if="league" #fullWidth>
      <section
        v-if="$store.getters.loggedIn && league.name"
        class="w-full col-span-2 pt-5 pb-6 text-center text-white bg-main-600"
      >
        <h2 class="text-2xl font-bold font-heading">Admin Actions</h2>
        <div class="w-10/12 mx-auto sm:mt-2">
          <router-link :to="`${$route.path}/edit`" class="button button-white">
            Edit League
          </router-link>
          <button class="button button-white" @click="deleteLeagueConfirmation">
            Delete League
          </button>
          <router-link
            :to="`/leagues/${$route.params.name}/competitors`"
            class="button button-white"
          >
            Manage Competitors
          </router-link>
        </div>
      </section>
      <section
        v-if="league.courses && league.courses.length > 0"
        class="col-span-2 pt-5 pb-6 text-center text-white bg-main-500"
      >
        <h2 class="text-2xl font-bold font-heading">League Results</h2>
        <div class="w-full px-6 mx-auto sm:mt-2">
          <router-link
            v-for="course of league.courses"
            :key="course"
            :to="$route.path + '/results/' + course"
            class="button button-white"
          >
            {{ course }}
          </router-link>
        </div>
      </section>
    </template>

    <div
      v-if="events?.length > 0"
      class="flex items-center justify-between w-full col-span-2 py-2 sm:py-0"
    >
      <h2
        class="text-lg leading-5 uppercase align-middle font-heading text-main-700"
      >
        Events
      </h2>

      <router-link
        v-if="$store.getters.loggedIn"
        :to="`/events/create`"
        class="inline-block px-4 pt-2 pb-1 text-sm leading-6 tracking-wide text-right uppercase transition duration-300 text-main-600 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape"
      >
        <span class="mr-1 text-xl">+</span> Add Event
      </router-link>
    </div>
    <EventOverviewCard
      v-for="event of events"
      :key="event.name"
      :event="event"
      :league="league"
      class="col-span-2"
      @event-changed="refreshDetails"
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

import { League, getLeague, deleteLeague } from '../api/leagues'
import { Event, getLeagueEvents } from '../api/events'

/* Get Data */
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

export { loading, league, events, refreshDetails }

/* Template Methods */
const deleteLeagueConfirmation = () => {
  const routeParamsName = toSingleString($route.value.params.name)

  if (
    confirm(
      `Are you Sure you Want to Delete League - ${league.value.name}? \nThis Action Can't Be Recovered`
    )
  )
    deleteLeague(routeParamsName)
      .then(() => $router.push('/'))
      .catch(() => false)
}
const leagueCourses = computed(() => {
  const array = league.value?.courses
  if (array.length <= 1) return array.join(', ')
  else return `${array.slice(0, -1).join(', ')} and ${array[array.length - 1]}`
})
const scoringMethodShorthandToFull = (value: string): string => {
  if (value === 'position') return 'Position Based System (100 Max)'
  else if (value === 'position50') return 'Position Based System (50 Max)'
  else if (value === 'position99') return 'Position Based System (99 Max)'
  else if (value === 'position99average')
    return 'Position Based System (99 Max, Reduced in a Draw)'
  else if (value === 'positionDouble')
    return 'Position Based System (100 Max, Double Points)'
  else if (value === 'position50Double')
    return 'Position Based System (50 Max, Double Points)'
  else if (value === 'timeAverage')
    return 'Time Relative to Average System (1000 Average)'
  else if (value === 'timeAverage100')
    return 'Time Relative to Average System (100 Average)'
  else if (value === 'file') return 'from the points uploaded'
  else return ''
}

export { deleteLeagueConfirmation, leagueCourses, scoringMethodShorthandToFull }
</script>
