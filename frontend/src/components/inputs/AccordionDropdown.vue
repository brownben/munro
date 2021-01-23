<template>
  <details
    class="transition-all duration-300 bg-white shadow-md outline-none appearance-none select-none rounded-shape-xl focus:shadow-lg"
  >
    <summary
      class="transition-all duration-300 outline-none appearance-none select-none rounded-shape-xl"
    >
      <h2
        class="inline-block px-6 pt-3 pb-2 text-2xl select-none font-heading text-main-700"
      >
        {{ title }}
      </h2>
      <svg
        class="float-right h-12 p-2 mt-1 mr-2 transition-all duration-300 ease-in-out fill-current transform rotate-0 open:rotate-180 text-main-600"
        viewBox="0 0 24 24"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    </summary>
    <section class="px-6 pt-2 pb-4 transition-all duration-300">
      <slot />
    </section>
  </details>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Title' },
})
</script>
