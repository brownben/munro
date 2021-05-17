<template>
  <div class="relative z-10 w-full bg-white">
    <section
      class="flex-row-reverse items-center justify-between w-full pt-4 pb-12 mx-auto text-center font-heading md:flex md:w-10/12 md:text-left xl:max-w-screen-xl xl:px-12 xl:pt-8 xl:pb-12"
    >
      <div
        class="w-full py-4 mx-auto mb-8 select-none md:m-0 sm:mb-10 sm:w-3/4 md:w-1/2"
      >
        <div class="w-full">
          <Image />
        </div>
      </div>

      <div>
        <h1>
          <span
            class="block text-4xl leading-tight tracking-tight text-main-800 md:text-5xl xl:text-6xl"
          >
            League Results.
          </span>
          <span
            class="block text-5xl font-bold text-main-600 sm:text-6xl lg:text-7xl"
          >
            Sorted.
          </span>
        </h1>
        <router-link to="/leagues" class="w-auto mx-0 mt-3 md:mt-4 button">
          View All Leagues
        </router-link>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import Image from './images/RunnerLeagueTable.vue'
</script>
