<script setup lang="ts">
defineProps({
  link: { type: String, default: '' },
  coloured: { type: Boolean, default: false },
  external: { type: Boolean, default: false },
})
</script>
<template>
  <NuxtLink
    v-if="link"
    :to="link"
    :external="external"
    class="inline-flex items-center gap-2 rounded border px-2 py-1 text-sm font-medium leading-tight transition duration-100 hover:border-main-300 hover:bg-main-100 hover:text-main-800 dark:hover:border-main-600 dark:hover:bg-main-800 dark:hover:text-main-100"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 ':
        !coloured,
      'border-main-200 bg-main-50 text-main-700 dark:border-main-700 dark:bg-main-900 dark:text-main-200 ':
        coloured,
    }"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="inline-flex items-center gap-2 rounded border px-2 py-1 text-sm font-medium leading-tight transition duration-100 hover:border-main-300 hover:bg-main-100 hover:text-main-800 dark:hover:border-main-600 dark:hover:bg-main-700 dark:hover:text-main-100"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300':
        !coloured,
      'border-main-200 bg-main-50 text-main-700 dark:border-main-700 dark:bg-main-900 dark:text-main-200':
        coloured,
    }"
  >
    <slot />
  </button>
</template>
