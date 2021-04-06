<template>
  <section class="w-full py-10 border-t md:py-12 border-main-100">
    <div
      class="flex flex-col items-center justify-between w-10/12 mx-auto md:flex-row-reverse lg:w-3/4 xl:max-w-screen-xl"
    >
      <div class="w-full text-center md:mb-12 md:w-1/2 md:text-left md:m-0">
        <h2
          class="mb-2 text-4xl tracking-tight xl:text-5xl text-main-800 font-heading leading-12 xl:leading-14"
        >
          Just How
          <strong class="tracking-normal text-main-700">You</strong> Want It
        </h2>
        <h3 class="mt-3 text-2xl leading-8 text-gray-500 font-heading">
          Sort and Filter the Results
        </h3>
        <h3 class="mb-2 text-2xl leading-8 text-gray-500 md:mb-3 font-heading">
          or Build Your Own Way to View Results
        </h3>
        <router-link to="/developers" class="w-auto mx-0 mt-2 button">
          View API Docs
        </router-link>
      </div>

      <div class="w-2/3 md:w-5/12 xl:w-1/3 mt-4 md:mt-0">
        <Image class="h-full" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Image from './images/BuildingWall.vue'
</script>
