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
        class="ring-main-600 focus:border-main-600 dark:focus:border-main-500 w-full rounded-sm border border-gray-300 bg-transparent p-2 pr-12 text-sm ring-offset-2 outline-hidden focus:ring-3 dark:ring-offset-gray-800"
        :value="$route.query.query"
      />
      <button
        class="hover:bg-main-500 focus:bg-main-500 group-focus-within:text-main-500 dark:group-focus-within:text-main-500 absolute top-0 right-0 h-full rounded-sm px-3 text-gray-400 outline-hidden transition hover:text-white hover:group-focus-within:text-white focus:group-focus-within:text-white dark:text-gray-300"
      >
        <span class="sr-only">Search</span>
        <MagnifyingGlassIcon class="h-5 w-5" />
      </button>
    </div>
  </form>
</template>
