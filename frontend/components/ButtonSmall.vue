<script setup lang="ts">
defineProps({
  link: { type: String, default: '' },
  coloured: { type: Boolean, default: false },
  external: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})
</script>
<template>
  <NuxtLink
    v-if="link"
    :to="link"
    :external="external"
    class="hover:border-main-300 hover:bg-main-100 hover:text-main-800 dark:hover:border-main-600 dark:hover:bg-main-800 dark:hover:text-main-100 inline-flex items-center gap-2 rounded-sm border px-2 py-1 text-sm leading-tight font-medium transition duration-100 select-none"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300':
        !coloured,
      'border-main-200 bg-main-50 text-main-700 dark:border-main-700 dark:bg-main-900 dark:text-main-200':
        coloured,
    }"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="hover:border-main-300 hover:bg-main-100 hover:text-main-800 dark:hover:border-main-600 dark:hover:bg-main-700 dark:hover:text-main-100 inline-flex items-center gap-2 rounded-sm border px-2 py-1 text-sm leading-tight font-medium transition duration-100"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300':
        !coloured,
      'border-main-200 bg-main-50 text-main-700 dark:border-main-700 dark:bg-main-900 dark:text-main-200':
        coloured,
    }"
    :disabled="loading"
  >
    <template v-if="!loading">
      <slot />
    </template>
    <template v-else>
      <span class="sr-only">Loading</span>
      <svg
        class="text-main-600 h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </template>
  </button>
</template>
