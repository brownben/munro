<script setup lang="ts">
import { UserGroupIcon, CakeIcon } from '@heroicons/vue/24/outline'
import type { CompetitorOverview } from '~/api-types'

const route = useRoute()
const loggedIn = useLoggedIn()

const { data: competitor, refresh } = await useData<CompetitorOverview>(
  `competitors/${route.params.id}/results`,
)
</script>
<template>
  <div v-if="competitor">
    <Heading
      :title="competitor.name"
      :link-text="competitor.league"
      :link-location="`/leagues/${competitor.league}`"
    >
      <template v-if="competitor.club || competitor.age_class" #default>
        <ImageRow v-if="competitor.club" :icon="UserGroupIcon">
          Club:
          <strong class="font-medium">{{ competitor.club }}</strong>
        </ImageRow>
        <ImageRow v-if="competitor.age_class" :icon="CakeIcon">
          Age Class:
          <strong class="font-medium">{{ competitor.age_class }}</strong>
        </ImageRow>
      </template>
    </Heading>

    <LinksSection
      v-if="loggedIn"
      :links="[
        {
          text: 'Edit Competitor',
          location: `/competitors/${competitor.id}/edit`,
        },
        {
          text: 'Add Result',
          location: `/results/manual?competitor_pool=${competitor.competitor_pool}&competitor=${competitor.id}`,
        },
        {
          text: 'Merge Competitor',
          location: `/competitors/merge?competitor_to_merge=${competitor.id}&competitor_pool=${competitor.competitor_pool}`,
        },
      ]"
      dark
    >
      Manage competitor
    </LinksSection>

    <main
      class="mx-auto flex max-w-(--breakpoint-lg) flex-col px-6 py-10 sm:py-12 md:py-14 lg:px-8"
    >
      <div class="flex grid-cols-3 flex-col sm:grid">
        <h2
          class="col-span-1 pb-8 text-2xl font-bold text-gray-500 sm:px-0 sm:pb-0 sm:text-3xl dark:text-gray-300"
        >
          Results
        </h2>

        <div
          class="col-span-2 -mt-8 -mb-4 flex flex-col divide-y divide-gray-200 dark:divide-gray-600"
        >
          <template v-for="result in competitor.results" :key="result.id">
            <Result
              v-if="result.visible == true || loggedIn"
              :result="result"
              :competitor-pool="competitor.competitor_pool"
              :admin="loggedIn"
              @result-changed="refresh"
            />
          </template>
        </div>
      </div>
    </main>
  </div>
  <LazyError v-else />
</template>
