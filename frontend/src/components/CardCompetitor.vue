<template>
  <section
    class="flex flex-col items-center justify-around col-span-2 px-6 pt-4 pb-4 text-center bg-white shadow-md lg:col-span-1 rounded-shape-xl sm:px-6 sm:flex-row sm:justify-between sm:text-left lg:px-6"
  >
    <div class="flex-shrink text-center sm:text-left">
      <router-link
        :to="`/leagues/${competitor.league}`"
        class="text-xs font-bold leading-tight tracking-widest uppercase font-heading text-main-700 focus-visible:shadow-outline rounded-shape"
      >
        {{ competitor.league }}
      </router-link>
      <h2
        class="mt-1 mb-1 text-3xl font-bold leading-tight tracking-tight text-gray-900 font-heading sm:tracking-normal"
      >
        {{ competitor.name }}
      </h2>
      <p class="text-lg leading-tight text-gray-500 font-heading">
        {{ competitor.course }}
        <span
          v-if="competitor.course && (competitor.club || competitor.ageClass)"
          class="mx-1"
        >
          -
        </span>
        {{ competitor.ageClass }}
        <span v-if="competitor.ageClass && competitor.club" class="mx-1">
          -
        </span>
        {{ competitor.club }}
      </p>
    </div>

    <router-link
      class="inline-block w-auto px-3 py-2 mt-2 text-base leading-tight whitespace-nowrap transition duration-300 ease-in-out select-none text-main-700 font-heading rounded-shape hover:text-main-800 focus:text-main-800 sm:my-0 hover:bg-main-100 focus:bg-main-100 sm:mr-0 sm:ml-4 focus-visible:shadow-outline"
      :to="`/competitors/${competitor.id}`"
    >
      View Results &rarr;
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  competitor: { type: Object, default: () => ({}) },
})
</script>
