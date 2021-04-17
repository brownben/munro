<template>
  <Meta
    title="Munro - I'm Lost"
    description="Page Not Found on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
    :block-robots="true"
  />

  <div class="w-full col-span-2 px-6 mb-8 text-center">
    <div class="inline-block w-full mt-8 md:w-2/3 xl:w-7/12">
      <Image class="object-contain w-full mx-auto max-h-112" />
    </div>
    <h1
      class="mt-8 text-4xl font-bold text-gray-900 md:mt-12 md:text-5xl leading-12"
    >
      Sorry, I'm Lost
    </h1>
    <h2 class="mt-6 text-lg text-gray-500 md:text-xl">
      I can't currently find what you are looking for, the link might be broken
      or the page may have moved
    </h2>

    <div class="flex flex-row items-center justify-center mt-12">
      <SearchBox />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBox from '../components/SearchBox.vue'
import Image from '../components/images/Lost.vue'
</script>
