<template>
  <div id="app">
    <a
      href="#content"
      class="focus:shadow-outline text-main-700 sr-only z-50 rounded-md bg-white focus:not-sr-only focus:absolute focus:m-4 focus:block focus:px-3 focus:py-2"
    >
      Skip to main content
    </a>
    <Menu />
    <div class="flex-grow">
      <main class="mx-auto w-full max-w-screen-lg px-6 py-10 sm:py-16 lg:px-8">
        <p class="text-main-600 text-lg font-bold tracking-wide uppercase">
          500 Error
        </p>
        <h1
          class="text-5xl font-black tracking-tight text-gray-900 md:text-6xl"
        >
          Something has gone wrong
        </h1>
        <p class="mt-3 text-lg leading-tight text-gray-500 md:text-xl">
          Sorry, something has gone wrong and I can't load the page
        </p>
        <button
          class="text-main-600 hover:text-main-700 mt-6 inline-block"
          @click="handleError"
        >
          Go back home →
        </button>
      </main>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
</script>
