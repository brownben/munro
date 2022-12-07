<script setup lang="ts">
import {
  MapIcon,
  DeviceMobileIcon,
  SwitchVerticalIcon,
} from '@heroicons/vue/outline/index.js'
</script>
<template>
  <section
    class="mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-6 py-10 sm:py-16 md:grid-cols-3 md:gap-8 lg:gap-10 lg:px-8"
  >
    <div>
      <SwitchVerticalIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition"
      />
      <p class="mt-2 font-medium text-main-600">Sort + Filter</p>
      <p class="mt-4 text-xl font-bold text-gray-600">
        See the results you want.
      </p>
      <p class="mt-4 leading-snug text-gray-600">
        Full control over the results you see and their order. Don't settle for
        not seeing what you want.
      </p>
    </div>
    <div>
      <MapIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition"
      />
      <p class="mt-2 font-medium text-main-600">Made for Orienteering</p>
      <p class="mt-4 text-xl font-bold text-gray-600">It just works.</p>
      <p class="mt-4 leading-snug text-gray-600">
        Has all the options your league needs. Designed specifically for
        Orienteering, and to save volunteers time.
      </p>
    </div>
    <div>
      <DeviceMobileIcon
        aria-hidden="true"
        class="h-12 rounded-md bg-main-500 p-2 text-white transition"
      />
      <p class="mt-2 font-medium text-main-600">On the Go</p>
      <p class="mt-4 text-xl font-bold text-gray-600">Designed for Mobile.</p>
      <p class="mt-4 leading-snug text-gray-600">
        View all the information, on any device. See the results and manage
        leagues wherever you are.
      </p>
    </div>
    <NuxtLink
      to="/about"
      class="inline-block text-gray-600 hover:text-main-700 md:col-span-3 md:mt-4"
      no-prefetch
    >
      Read more about Munro, and why it was created →
    </NuxtLink>
  </section>
</template>
