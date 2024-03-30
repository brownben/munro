<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <form method="get" action="/search" class="flex justify-center sm:mb-4">
    <label for="search-box" class="sr-only">Search Query:</label>
    <div class="group relative w-full">
      <input
        id="search-box"
        name="query"
        type="search"
        class="w-full rounded border border-gray-300 bg-transparent p-2 pr-12 text-sm outline-none ring-main-600 ring-offset-2 focus:border-main-600 focus:ring dark:ring-offset-gray-800 dark:focus:border-main-500"
        :value="$route.query.query"
      />
      <button
        class="absolute right-0 top-0 h-full rounded px-3 text-gray-400 outline-none transition hover:bg-main-500 hover:text-white focus:bg-main-500 group-focus-within:text-main-500 group-focus-within:hover:text-white group-focus-within:focus:text-white dark:text-gray-300 dark:group-focus-within:text-main-500"
      >
        <span class="sr-only">Search</span>
        <MagnifyingGlassIcon class="h-5 w-5" />
      </button>
    </div>
  </form>
</template>
