<template>
  <section
    class="w-full pt-10 pb-8 text-white bg-main-50 md:py-12 border-t border-main-100"
  >
    <div
      class="flex flex-col-reverse items-center justify-around w-11/12 mx-auto md:flex-row md:w-10/12 xl:max-w-screen-xl"
    >
      <div class="w-full mt-12 text-center md:w-1/2 md:text-left md:m-0">
        <h2
          class="text-2xl tracking-tight text-main-700 md:mb-2 lg:text-3xl font-heading"
        >
          Made for Orienteering
        </h2>
        <h2
          class="text-4xl tracking-tight text-main-700 leading-tight md:mb-2 md:text-5xl font-heading"
        >
          <strong class="font-bold tracking-normal text-main-800">
            Perfect
          </strong>
          for All Leagues
        </h2>
        <router-link
          to="/about"
          class="inline-block w-auto px-4 py-1 mx-0 mt-1 text-main-700 transition duration-300 ease-in-out outline-none appearance-none select-none md:mt-2 md:text-lg bg-main-100 font-heading rounded-shape hover:bg-main-200 focus:bg-main-200 focus-visible:shadow-outline"
        >
          Introducing Munro Leagues
        </router-link>
      </div>
      <!--  -->
      <div class="h-64 md:h-56 lg:h-64">
        <Image />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Image from './images/OFlag.vue'
</script>
