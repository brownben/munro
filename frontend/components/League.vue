<script setup lang="ts">
import type { PropType } from 'vue'
import type { League } from '~/api-types'

defineProps({
  league: { type: Object as PropType<League>, required: true },
  h2: { type: Boolean, default: true },
})
</script>

<template>
  <article>
    <h2
      v-if="h2"
      class="text-3xl font-black text-gray-900 sm:text-4xl dark:text-gray-100"
    >
      {{ league.name }}
    </h2>
    <h3
      v-else
      class="text-3xl font-black text-gray-900 sm:text-4xl dark:text-gray-100"
    >
      {{ league.name }}
    </h3>

    <p class="pt-2 leading-tight text-gray-600 sm:text-xl dark:text-gray-400">
      {{ league.tagline }}
    </p>

    <NuxtLink
      :to="`/leagues/${league.name}`"
      class="mt-6 inline-block text-main-700 hover:text-main-600 dark:text-main-600 dark:hover:text-main-500"
    >
      View details →
    </NuxtLink>
  </article>
</template>
