<template>
  <div class="ml-1 inline-block print:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inline-block duration-300 motion-safe:transition-all"
      :class="{
        '-mt-2 h-2 text-gray-500 dark:text-gray-400': !ascending && active,
        'text-main-700 dark:text-main-600 -mt-1 h-5': ascending && active,
        '-mt-1 h-4 text-gray-400 opacity-75 dark:text-gray-300': !active,
      }"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="16" y1="9" x2="12" y2="5" />
      <line x1="8" y1="9" x2="12" y2="5" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="-ml-2 inline-block duration-300 motion-safe:transition-all"
      :class="{
        'mt-1 h-2 text-gray-500': ascending && active,
        'text-main-700 -mt-1 h-5': !ascending && active,
        '-mt-1 h-4 text-gray-400 opacity-75': !active,
      }"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="16" y1="15" x2="12" y2="19" />
      <line x1="8" y1="15" x2="12" y2="19" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: { type: Boolean, default: false },
  ascending: { type: Boolean, default: false },
})
</script>
