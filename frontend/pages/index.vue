<script setup lang="ts">
import type { Home } from '~/api-types'

const user = useUser()
const loggedIn = useLoggedIn()
const { data } = await useData<Home>(`misc/home`)

useSeoMeta({
  title: 'Munro',
  description:
    'League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options',
})
</script>

<template>
  <main>
    <HomeHero />

    <LinksSection
      v-if="loggedIn"
      :links="[
        { text: 'Create League', location: '/leagues/create' },
        { text: 'Upload Results', location: '/upload/file' },
      ]"
      dark
    >
      <span class="text-main-100 text-3xl">
        Hello
        <span class="font-black text-white">
          {{ user?.displayName ?? 'Admin' }} </span
        >!
      </span>
    </LinksSection>

    <section
      v-if="data?.latestResults"
      class="mx-auto grid max-w-(--breakpoint-lg) grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 sm:py-12 lg:px-8"
    >
      <div class="py-2 sm:py-4">
        <h2 class="text-3xl font-black text-gray-700 dark:text-gray-300">
          Latest Results
        </h2>
        <NuxtLink
          to="/latest-results"
          class="hover:text-main-700 dark:hover:text-main-500 mt-4 inline-block text-gray-600 dark:text-gray-400"
        >
          View More →
        </NuxtLink>
      </div>

      <Event
        v-for="event in data.latestResults.slice(0, 3) ?? []"
        :key="event.id"
        :event="event"
        small
        class="py-2 sm:py-4"
      />
    </section>

    <HomeSearch />
    <HomeUpload />
    <HomeAbout />
  </main>
</template>
