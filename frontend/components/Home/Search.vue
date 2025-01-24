<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <section class="bg-main-600 dark:bg-main-800 text-white">
    <div
      class="mx-auto flex max-w-(--breakpoint-lg) flex-col gap-2 px-6 py-10 text-center sm:py-16 lg:px-8"
    >
      <h2 class="text-main-100 text-4xl font-medium md:text-5xl">
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
            class="ring-offset-main-600 w-full rounded-sm border border-white bg-transparent p-2 pr-16 ring-white ring-offset-2 outline-hidden focus:ring-3"
          />
          <button
            class="hover:text-main-600 focus:text-main-600 absolute top-0 right-0 h-full rounded-sm px-4 outline-hidden transition hover:bg-white focus:bg-white"
          >
            <span class="sr-only">Search</span>
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
