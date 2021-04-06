<template>
  <section
    class="w-full py-8 md:py-10 lg:py-14 text-white bg-gradient-to-r from-main-600 to-main-500"
  >
    <div
      class="flex flex-col items-center max-w-screen-xl px-6 mx-auto text-center sm:px-12 lg:px-8"
    >
      <h2
        class="md:mb-2 text-4xl leading-tight tracking-tighter md:text-5xl font-heading"
      >
        Find <span class="font-bold tracking-normal">Everything</span> You Need
      </h2>
      <h3 class="text-lg font-light md:text-xl font-heading">
        Instantly Search All Leagues, Events and Competitors
      </h3>
      <form
        class="relative block w-full mt-6 md:mt-8 sm:w-3/4 lg:w-1/2 xl:w-1/3"
        @submit.prevent="$router.push(`/search/${searchQuery}`)"
      >
        <label for="searchBox" class="sr-only">Search Query:</label>
        <input
          id="searchBox"
          v-model="searchQuery"
          type="text"
          spellcheck="false"
          class="w-full py-2 pl-10 pr-24 font-sans leading-snug text-white transition duration-300 ease-in-out bg-transparent border border-main-300 outline-none appearance-none focus:border-white rounded-shape focus:shadow-outline-white"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
        />
        <button
          class="absolute top-0 right-0 px-4 py-2 transition duration-300 outline-none font-heading rounded-shape"
          :class="
            searchFocused
              ? 'bg-white text-main-700 hover:bg-main-200 focus:bg-main-200'
              : 'bg-white text-main-700 hover:bg-white focus:bg-white'
          "
        >
          Search
        </button>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="absolute top-0 left-0 w-6 h-6 py-px my-2 ml-2"
          :class="searchFocused ? 'text-white' : 'text-main-100'"
          role="img"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchFocused = ref(false)
const searchQuery = ref('')
</script>
