<script setup lang="ts">
import {
  UserIcon,
  CalculatorIcon,
  ChartBarSquareIcon,
  GlobeEuropeAfricaIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline'
import type { LeagueOverview } from '~/api-types'

const route = useRoute()
const loggedIn = useLoggedIn()

const { data: league, refresh } =
  await useRestrictedDataIfLoggedIn<LeagueOverview>(
    `leagues/${route.params.name}`,
    `leagues/${route.params.name}/uploadKey`,
  )

const events = league.value?.events ?? []
const latestEvents = events.filter((event) => event.results_uploaded).reverse()

const todaysDate = getCurrentDate()
const nextEvent = events.filter(
  (event) => event.date >= todaysDate && !event.results_uploaded,
)[0]

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
          {{ scoringShorthandToDescription[league.scoring_method]?.[0] }}
        </strong>
        {{ scoringShorthandToDescription[league.scoring_method]?.[1] }}
      </ImageRow>
      <ImageRow :icon="ChartBarSquareIcon">
        <template
          v-if="league.number_of_counting_events < league.events.length"
        >
          Your
          <strong class="font-medium">
            best {{ league.number_of_counting_events }} scores
          </strong>
          from all
          <strong class="font-medium">
            {{ league.events.length }} events count
          </strong>
        </template>
        <template v-else> All events count </template>
      </ImageRow>
      <ImageRow v-if="nextEvent" :icon="CalendarIcon" hover>
        <a
          :href="`https://munroleagues.com/api/leagues/${league.name}/events/calendar`"
        >
          Subscribe to calendar
        </a>
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
          class="mt-1 text-gray-500 dark:text-gray-300"
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
            text: 'Manage Competitors',
            location: `/competitor-pools/${league.competitor_pool}`,
          },
        ]"
        dark
      >
        Manage your league
      </LinksSection>

      <section
        v-if="
          events.length >= 2 && latestEvents[0] && latestEvents[1] && !loggedIn
        "
        class="mx-auto hidden max-w-(--breakpoint-lg) grid-cols-1 gap-8 px-6 py-8 sm:grid sm:grid-cols-2 sm:pt-10 sm:pb-6 lg:px-8"
      >
        <div>
          <h2
            class="font-bold text-gray-500 uppercase sm:pb-2 dark:text-gray-300"
          >
            Latest Results
          </h2>
          <Event :event="latestEvents[0]" class="pt-4 pb-6" small />
        </div>
        <div v-if="nextEvent">
          <h2
            class="font-bold text-gray-500 uppercase sm:pb-2 dark:text-gray-300"
          >
            Next Event
          </h2>
          <Event :event="nextEvent" class="pt-4 pb-6" small />
        </div>
        <div v-else>
          <p
            class="hidden font-bold text-gray-500 uppercase sm:block sm:pb-2"
            aria-hidden="true"
          >
            &nbsp;
          </p>
          <Event
            v-if="latestEvents.length > 1"
            :event="latestEvents[1]"
            class="pt-4 pb-6"
            small
          />
        </div>
      </section>

      <LinksSection
        v-if="league.classes.length > 0 && !loggedIn"
        :links="
          league.classes.map((course) => ({
            text: course.name,
            location: `/leagues/${league?.name}/results/${course.name}`,
          }))
        "
      >
        League Results
      </LinksSection>

      <section
        v-if="loggedIn"
        class="border-b border-gray-100 dark:border-gray-700"
      >
        <div
          class="mx-auto flex max-w-(--breakpoint-lg) grid-cols-3 flex-col gap-8 px-6 py-6 sm:grid sm:pt-10 sm:pb-6 lg:px-8"
        >
          <div class="pb-4">
            <h2
              class="col-span-1 mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300"
            >
              Classes
            </h2>
            <ButtonSmall :link="`/leagues/${route.params.name}/classes/create`">
              + Create Class
            </ButtonSmall>
          </div>

          <div
            class="col-span-2 -mt-6 flex flex-col divide-y divide-gray-200 dark:divide-gray-600"
          >
            <LeagueClass
              v-for="cls in league.classes"
              :key="cls.name"
              :cls="cls"
              class="py-6 sm:px-4"
              @class-changed="refresh"
            />

            <div v-if="league.classes.length == 0" class="mt-3 md:mt-6">
              <p
                class="text-2xl font-extrabold text-gray-700 dark:text-gray-300"
              >
                No Classes Created
              </p>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Create a class to calculate league results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="loggedIn && league?.groups.length > 0"
        class="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          class="mx-auto flex max-w-(--breakpoint-lg) grid-cols-3 flex-col gap-8 px-6 py-6 sm:grid sm:pt-10 sm:pb-4 lg:px-8"
        >
          <div class="pb-4">
            <h2
              class="col-span-1 mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300"
            >
              Groups
            </h2>
            <ButtonSmall :link="`/leagues/${route.params.name}/groups/create`">
              + Create Group
            </ButtonSmall>
          </div>

          <div
            class="col-span-2 -mt-6 flex flex-col divide-y divide-gray-200 dark:divide-gray-600"
          >
            <LeagueGroup
              v-for="group in league.groups"
              :key="group.name"
              :group="group"
              class="py-6 sm:px-4"
              @group-changed="refresh"
            />
          </div>
        </div>
      </section>

      <section
        class="mx-auto max-w-(--breakpoint-lg) gap-8 px-6 py-8 sm:py-12 lg:px-8"
      >
        <div class="flex grid-cols-3 flex-col sm:grid">
          <div class="col-span-1 pb-8 sm:pb-0">
            <h2 class="text-2xl font-bold text-gray-600 dark:text-gray-300">
              Events
            </h2>

            <div class="mt-2 flex flex-wrap gap-2">
              <ButtonSmall
                v-if="loggedIn"
                :link="`/events/create?league=${league.name}`"
              >
                + Create Event
              </ButtonSmall>
              <ButtonSmall
                v-if="loggedIn && league.competitor_pool != league.name"
                :link="`/events/add?league=${league.name}`"
              >
                + Add Event from Another League
              </ButtonSmall>
            </div>
          </div>

          <div
            class="col-span-2 -mt-10 -mb-4 flex flex-col divide-y divide-gray-200 dark:divide-gray-600"
          >
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
