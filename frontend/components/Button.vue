<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
})
</script>

<template>
  <button
    class="flex select-none rounded bg-gradient-to-r from-main-500 to-main-600 font-medium text-white ring-main-600 ring-offset-2 transition hover:from-main-600 hover:to-main-700 hover:shadow focus:outline-none focus-visible:ring dark:ring-offset-gray-800"
    :class="{ 'px-4 py-2 text-sm': small, 'px-6 py-2': !small }"
    :disabled="loading"
  >
    <template v-if="!loading">
      <slot />
    </template>
    <template v-else>
      <span class="sr-only">Loading</span>
      <svg
        class="h-6 w-6 animate-spin text-white"
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
