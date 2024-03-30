<script setup lang="ts">
import type { League } from '~/api-types'

const { data: leagues } = await useData<League[]>('leagues/')

useTitle({
  title: 'Leagues',
  description: 'All the leagues with results on Munro',
})
</script>

<template>
  <div>
    <Heading title="Leagues" />
    <main
      class="mx-auto max-w-screen-lg gap-8 px-6 py-10 sm:py-12 md:py-14 lg:px-8"
    >
      <div
        class="col-span-2 -mx-4 -mb-4 -mt-8 flex flex-col divide-y dark:divide-gray-600"
      >
        <League
          v-for="league in leagues"
          :key="league.name"
          :league="league"
          class="px-4 py-10"
        />
      </div>
    </main>
  </div>
</template>
