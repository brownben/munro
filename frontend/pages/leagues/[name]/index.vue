<script setup lang="ts">
import {
  UserIcon,
  CalculatorIcon,
  ChartBarSquareIcon,
  GlobeEuropeAfricaIcon,
} from '@heroicons/vue/24/outline/index.js'
import type { LeagueOverview } from '~/api-types'

const route = useRoute()
const loggedIn = useLoggedIn()

const { data: league, refresh } =
  await useRestrictedDataIfLoggedIn<LeagueOverview>(
    `leagues/${route.params.name}`,
    `leagues/${route.params.name}/uploadKey`
  )

const events = league.value?.events ?? []
const latestEvents = events.filter((event) => event.results_uploaded).reverse()

const todaysDate = getCurrentDate()
const nextEvent = events.filter(
  (event) => event.date >= todaysDate && !event.results_uploaded
)[0]

const scoringMethods: Record<string, [string, string]> = {
  position: ['Position Based Scoring', 'System (100 Max)'],
  position50: ['Position Based Scoring', 'System (50 Max)'],
  position99: ['Position Based Scoring', 'System (99 Max)'],
  position99average: [
    'Position Based Scoring',
    'System (99 Max, Reduced in a Draw)',
  ],
  positionDouble: ['Position Based Scoring', 'System (100 Max, Double Points)'],
  position50Double: [
    'Position Based Scoring',
    'System (50 Max, Double Points)',
  ],
  timeAverage: ['Time Relative to Average Scoring', 'System (1000 Average)'],
  timeAverage100: ['Time Relative to Average Scoring', 'System (100 Average)'],
  timeTop3: ['Time Relative to the Average Time of the Top 3', ''],
  timeTop3Adjusted: [
    'Time Relative to the Average Time of the Top 3',
    '(Adjusted by Course/Age Class)',
  ],
  timeTopAdjustedWelsh: [
    'Time Relative to Winner',
    'System (Adjusted by Course/Age Class - Welsh Multipliers)',
  ],
  positionStaggered: ['Position Based Scoring', 'System (Staggered, 60 Max)'],
  file: ['Points from File', ''],
}

if (league.value) {
  useTitle({
    title: league.value.name,
    description: `${league.value.tagline} - All the results and event information for the ${league.value.name} league on Munro`,
  })
}
</script>
<template>
  <div v-if="league">
    <Heading :title="league.name" :tagline="league.tagline">
      <ImageRow v-if="league.coordinator" :icon="UserIcon">
        Coordinated by
        <strong class="font-medium">{{ league.coordinator }}</strong>
      </ImageRow>
      <ImageRow v-if="league.scoring_method" :icon="CalculatorIcon">
        <strong class="font-medium">
          {{ scoringMethods[league.scoring_method][0] }}
        </strong>
        {{ scoringMethods[league.scoring_method][1] }}
      </ImageRow>
      <ImageRow :icon="ChartBarSquareIcon">
        Your
        <strong class="font-medium">
          best {{ league.number_of_counting_events }} scores
        </strong>
        from all
        <strong class="font-medium">
          {{ league.events.length }} events count
        </strong>
      </ImageRow>
      <ImageRow v-if="league.website" :icon="GlobeEuropeAfricaIcon" hover>
        <a :href="league.website" rel="noopener noreferrer" target="_blank">
          {{ league.website }}
        </a>
      </ImageRow>
      <template v-if="league.more_information" #extra>
        <p
          v-for="paragraph in league.more_information.split('|')"
          :key="paragraph"
          class="mt-1 text-gray-500"
        >
          {{ paragraph }}
        </p>
      </template>
    </Heading>
    <main>
      <LinksSection
        v-if="loggedIn"
        :links="[
          {
            text: 'Edit League',
            location: `/leagues/${league.name}/edit`,
          },
          {
            text: 'Create Event',
            location: `/events/create?league=${league.name}`,
          },
          {
            text: 'Manage Competitors',
            location: `/competitor-pools/${league.competitor_pool}`,
          },
        ]"
        dark
      >
        Manage your league
      </LinksSection>

      <section
        v-if="events.length >= 2 && latestEvents.length > 0"
        class="mx-auto hidden max-w-screen-lg grid-cols-1 gap-8 px-6 py-8 sm:grid sm:grid-cols-2 sm:pt-10 sm:pb-6 lg:px-8"
      >
        <div>
          <h2 class="font-bold uppercase text-gray-500 sm:pb-2">
            Latest Results
          </h2>
          <Event :event="latestEvents[0]" class="pt-4 pb-6" />
        </div>
        <div v-if="nextEvent">
          <h2 class="font-bold uppercase text-gray-500 sm:pb-2">Next Event</h2>
          <Event :event="nextEvent" class="pt-4 pb-6" />
        </div>
        <div v-else>
          <p
            class="hidden font-bold uppercase text-gray-500 sm:block sm:pb-2"
            aria-hidden="true"
          >
            &nbsp;
          </p>
          <Event
            v-if="latestEvents.length > 1"
            :event="latestEvents[1]"
            class="pt-4 pb-6"
          />
        </div>
      </section>

      <LinksSection
        v-if="league.classes.length > 0"
        :links="
          league.classes.map((course) => ({
            text: course.name,
            location: `/leagues/${league?.name}/results/${course.name}`,
          }))
        "
      >
        League Results
      </LinksSection>

      <section v-if="loggedIn">
        <div
          class="mx-auto flex max-w-screen-lg grid-cols-3 flex-col gap-8 px-6 py-6 sm:grid sm:pt-10 sm:pb-6 lg:px-8"
        >
          <div class="pb-4">
            <h2 class="col-span-1 text-2xl font-bold text-gray-500">Classes</h2>
            <NuxtLink
              :to="`/leagues/${route.params.name}/classes/create`"
              class="mt-2 inline-block rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
            >
              + Add Class
            </NuxtLink>
          </div>

          <div class="col-span-2 -mt-6 flex flex-col divide-y">
            <LeagueClass
              v-for="cls in league.classes"
              :key="cls.name"
              :cls="cls"
              class="py-6 sm:px-4"
              @class-changed="refresh"
            />
          </div>
        </div>
      </section>

      <section
        class="mx-auto max-w-screen-lg gap-8 px-6 py-6 sm:py-12 md:py-14 lg:px-8"
      >
        <div class="flex grid-cols-3 flex-col sm:grid">
          <div class="col-span-1 pb-8 sm:pb-0">
            <h2 class="text-2xl font-bold text-gray-500">Events</h2>
            <NuxtLink
              v-if="loggedIn"
              :to="`/events/create?league=${league.name}`"
              class="mt-2 inline-block rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
            >
              + Add Event
            </NuxtLink>
          </div>

          <div class="col-span-2 -mt-10 -mb-4 flex flex-col divide-y">
            <Event
              v-for="event in league.events"
              :key="event.id"
              :event="event"
              class="py-10 sm:px-4"
              :admin="loggedIn"
              @event-changed="refresh"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
  <LazyError v-else />
</template>
