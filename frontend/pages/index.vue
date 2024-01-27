<script setup lang="ts">
import type { Home } from '~/api-types'

const user = useUser()
const loggedIn = useLoggedIn()
const { data } = await useData<Home>(`misc/home`)
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
      <span class="text-3xl text-main-100">
        Hello
        <span class="font-black text-white">
          {{ user?.displayName ?? 'Admin' }} </span
        >!
      </span>
    </LinksSection>

    <section
      v-if="data?.latestResults"
      class="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 sm:py-12 lg:px-8"
    >
      <div class="py-2 sm:py-4">
        <h2 class="text-3xl font-black text-gray-700">Latest Results</h2>
        <NuxtLink
          to="/latest-results"
          class="mt-4 inline-block text-gray-600 hover:text-main-700"
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
    <HomeSITiming />
    <HomeAbout />
  </main>
</template>
