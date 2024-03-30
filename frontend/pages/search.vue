<script setup lang="ts">
import type { Search } from '~/api-types'

const route = useRoute()
const { data } = await useData<Search>(`search?query=${route.query.query}`)

useTitle({
  title: `Search "${route.query.query}"`,
  description: `Search results for "${route.params.query}"`,
})
</script>

<template>
  <div>
    <Heading title="Search">
      <template #rightAction>
        <InputSearch />
      </template>
    </Heading>
    <main
      class="mx-auto flex max-w-screen-lg flex-col gap-12 px-6 py-10 sm:py-12 lg:px-8"
    >
      <div
        v-if="
          data?.leagues.length == 0 &&
          data?.events.length == 0 &&
          data?.competitors.length == 0
        "
      >
        <p class="text-3xl font-extrabold text-gray-600 dark:text-gray-300">
          No results found
        </p>
        <p class="mt-2 text-lg text-gray-400 dark:text-gray-400">
          Try an alternative query
        </p>
      </div>

      <section v-if="data?.leagues.length ?? 0 > 0">
        <div class="flex grid-cols-3 flex-col sm:grid">
          <h2
            class="col-span-1 pb-8 text-2xl font-bold text-gray-600 sm:px-0 sm:pb-0 sm:text-3xl dark:text-gray-300"
          >
            Leagues
          </h2>

          <div
            class="col-span-2 -mb-4 -mt-10 flex flex-col divide-y dark:divide-gray-600"
          >
            <League
              v-for="league in data?.leagues"
              :key="league.name"
              :league="league"
              :h3="false"
              class="py-10 sm:px-4"
            />
          </div>
        </div>
      </section>

      <section v-if="data?.events.length ?? 0 > 0">
        <div class="flex grid-cols-3 flex-col sm:grid">
          <h2
            class="col-span-1 pb-8 text-2xl font-bold text-gray-600 sm:px-0 sm:pb-0 sm:text-3xl dark:text-gray-300"
          >
            Events
          </h2>

          <div
            class="col-span-2 -mb-4 -mt-10 flex flex-col divide-y dark:divide-gray-600"
          >
            <Event
              v-for="event in data?.events"
              :key="event.id"
              :event="event"
              class="py-10 sm:px-4"
            />
          </div>
        </div>
      </section>

      <section v-if="data?.competitors.length ?? 0 > 0">
        <div class="flex grid-cols-3 flex-col sm:grid">
          <h2
            class="col-span-1 pb-8 text-2xl font-bold text-gray-600 sm:px-0 sm:pb-0 sm:text-3xl dark:text-gray-300"
          >
            Competitors
          </h2>

          <div
            class="col-span-2 -mb-4 -mt-10 flex flex-col divide-y dark:divide-gray-600"
          >
            <Competitor
              v-for="competitor in data?.competitors"
              :key="competitor.id"
              :competitor="competitor"
              class="py-10 sm:px-4"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
