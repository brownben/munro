<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <section class="bg-main-600 text-white dark:bg-main-800">
    <div
      class="mx-auto flex max-w-screen-lg flex-col gap-2 px-6 py-10 text-center sm:py-16 lg:px-8"
    >
      <h2 class="text-4xl font-medium text-main-100 md:text-5xl">
        Find <strong class="font-black text-white">Everything</strong> You Need
      </h2>
      <p class="text-lg md:text-xl">
        Instantly search all leagues, events and competitors
      </p>
      <form action="/search" method="get" class="mt-6 flex justify-center">
        <label for="search-box" class="sr-only">Search Query:</label>
        <div class="relative w-full sm:w-1/2">
          <input
            id="search-box"
            name="query"
            type="search"
            class="w-full rounded border border-white bg-transparent p-2 pr-16 outline-none ring-white ring-offset-2 ring-offset-main-600 focus:ring"
          />
          <button
            class="absolute right-0 top-0 h-full rounded px-4 outline-none transition hover:bg-white hover:text-main-600 focus:bg-white focus:text-main-600"
          >
            <span class="sr-only">Search</span>
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
