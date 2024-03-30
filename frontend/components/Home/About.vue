<script setup lang="ts">
import {
  MapIcon,
  DevicePhoneMobileIcon,
  ArrowsUpDownIcon,
} from '@heroicons/vue/24/outline'
</script>
<template>
  <section
    class="mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-6 py-10 text-gray-600 sm:py-16 md:grid-cols-3 md:gap-8 lg:gap-10 lg:px-8 dark:text-gray-300"
  >
    <div>
      <ArrowsUpDownIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
      />
      <p class="mt-2 font-medium text-main-600">Sort + Filter</p>
      <p class="mt-4 text-xl font-bold dark:text-gray-200">
        See the results you want.
      </p>
      <p class="mt-4 leading-snug">
        Full control over the results you see and their order. Don't settle for
        not seeing what you want.
      </p>
    </div>
    <div>
      <MapIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
      />
      <p class="mt-2 font-medium text-main-600">Made for Orienteering</p>
      <p class="mt-4 text-xl font-bold dark:text-gray-200">It just works.</p>
      <p class="mt-4 leading-snug">
        Has all the options your league needs. Designed specifically for
        Orienteering, and to save volunteers time.
      </p>
    </div>
    <div>
      <DevicePhoneMobileIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
      />
      <p class="mt-2 font-medium text-main-600">On the Go</p>
      <p class="mt-4 text-xl font-bold dark:text-gray-200">
        Designed for Mobile.
      </p>
      <p class="mt-4 leading-snug">
        View all the information, on any device. See the results and manage
        leagues wherever you are.
      </p>
    </div>
    <NuxtLink
      to="/about"
      class="inline-block hover:text-main-700 md:col-span-3 md:mt-4 dark:hover:text-main-500"
      no-prefetch
    >
      Read more about Munro, and why it was created →
    </NuxtLink>
  </section>
</template>
