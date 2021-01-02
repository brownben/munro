<template>
  <section
    class="flex flex-col items-center justify-around px-4 pb-4 text-center bg-white shadow-md rounded-shape-xl sm:px-6 sm:pt-6"
    :class="
      smaller
        ? 'pt-6 col-span-2 md:col-span-1'
        : 'pt-6 col-span-2 sm:flex-row sm:justify-between sm:text-left sm:pb-6 lg:px-6'
    "
  >
    <div class="flex-shrink text-center" :class="{ ' sm:text-left': !smaller }">
      <h2
        class="text-2xl font-bold leading-tight text-gray-900 font-heading"
        :class="
          smaller ? 'tracking-tight' : 'tracking-tight sm:tracking-normal'
        "
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-3 font-sans text-base leading-tight text-gray-500 sm:mt-2"
      >
        {{ description }}
      </p>
    </div>

    <router-link
      class="inline-block w-auto px-3 py-2 text-base leading-tight whitespace-no-wrap transition duration-300 ease-in-out select-none text-main-700 font-heading rounded-shape hover:text-main-800 focus:text-main-800 sm:my-0 hover:bg-main-100 focus:bg-main-100"
      :class="
        smaller
          ? 'w-full bg-main-100 hover:bg-main-200 focus:bg-main-200 px-4 mt-6 sm:mt-5 sm:w-auto md:bg-transparent md:hover:bg-main-100 md:focus:bg-main-100'
          : 'mt-4 sm:mr-0 sm:ml-4'
      "
      :to="alternativeLink || `/leagues/${title}`"
    >
      {{ buttonText }}
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  website: { type: String, default: '' },
  alternativeLink: { type: String, default: '' },
  buttonText: { type: String, default: 'View League →' },
  smaller: { type: Boolean, default: false },
})
</script>
