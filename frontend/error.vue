<template>
  <div id="app">
    <a
      href="#content"
      class="focus:shadow-outline text-main-700 sr-only z-50 rounded-md bg-white focus:not-sr-only focus:absolute focus:m-4 focus:block focus:px-3 focus:py-2 dark:bg-gray-900"
    >
      Skip to main content
    </a>
    <Menu />
    <div class="grow bg-white dark:bg-gray-900">
      <main
        class="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-10 sm:py-16 lg:px-8"
      >
        <p
          class="text-main-600 dark:text-main-600 text-lg font-bold tracking-wide uppercase"
        >
          500 Error
        </p>
        <h1
          class="text-5xl font-black tracking-tight text-gray-900 md:text-6xl dark:text-gray-100"
        >
          Something has gone wrong
        </h1>
        <p
          class="mt-3 text-lg leading-tight text-gray-500 md:text-xl dark:text-gray-300"
        >
          Sorry, something has gone wrong and I can't load the page
        </p>
        <button
          class="text-main-600 hover:text-main-700 dark:text-main-600 dark:hover:text-main-500 mt-6 inline-block"
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
