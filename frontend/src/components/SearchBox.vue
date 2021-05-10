<template>
  <form
    class="relative w-full sm:w-1/2 lg:w-1/3"
    @submit.prevent="go(`/search/${query}`)"
  >
    <label for="searchBox" class="sr-only">Search Query:</label>
    <input
      id="searchBox"
      v-model="query"
      type="text"
      spellcheck="false"
      class="
        w-full
        py-2
        pl-10
        pr-24
        font-sans
        leading-snug
        text-gray-500
        transition
        duration-300
        ease-in-out
        border border-gray-100
        outline-none
        appearance-none
        bg-gray-50
        rounded-shape
        focus:border-main-300
        focus:text-gray-900
        focus:bg-white
        focus:shadow-outline
      "
      @focus="searchFocused = true"
      @blur="searchFocused = false"
    />
    <button
      class="
        absolute
        top-0
        right-0
        px-4
        py-2
        transition
        duration-300
        outline-none
        font-heading
        rounded-shape
      "
      :class="
        searchFocused
          ? 'bg-main-400 text-white hover:bg-main-500 focus:bg-main-500 hover:text-white focus:text-white'
          : 'text-gray-600 bg-gray-100 hover:bg-main-200 focus:bg-main-200 hover:text-main-700 focus:text-main-700'
      "
      @click="go(`/search/${query}`)"
    >
      Search
    </button>
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      class="absolute top-0 left-0 w-6 h-6 py-px my-2 ml-2"
      :class="searchFocused ? 'text-main-500' : 'text-gray-400'"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchFocused = ref(false)
const query = ref(route.params.query)

const go = (location: string) => {
  if (location !== route.path) router.push(location)
}
</script>
