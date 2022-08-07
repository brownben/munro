<template>
  <div id="app">
    <a
      href="#content"
      class="focus:shadow-outline sr-only z-50 rounded-md bg-white text-main-700 focus:not-sr-only focus:absolute focus:m-4 focus:block focus:px-3 focus:py-2"
    >
      Skip to main content
    </a>
    <Menu />
    <div class="flex-grow">
      <main class="mx-auto w-full max-w-screen-lg px-6 py-10 sm:py-16 lg:px-8">
        <p class="text-lg font-bold uppercase tracking-wide text-main-600">
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
          class="mt-6 inline-block text-main-600 hover:text-main-700"
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
<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --main-50: #fdf4ff;
  --main-100: #fae8ff;
  --main-200: #f5d0fe;
  --main-300: #f0abfc;
  --main-400: #e879f9;
  --main-500: #d946ef;
  --main-600: #c026d3;
  --main-700: #a21caf;
  --main-800: #86198f;
  --main-900: #701a75;

  --gray-50: #fbf9fb;
  --gray-100: #f7f4f7;
  --gray-200: #eae5eb;
  --gray-300: #dad2dc;
  --gray-400: #af9fb2;
  --gray-500: #7d6b80;
  --gray-600: #5f4b63;
  --gray-700: #4d3751;
  --gray-800: #3b253f;
  --gray-900: #2a162e;
}

html,
body,
#app,
#__nuxt {
  @apply flex h-full flex-col;
}

a,
button {
  @apply rounded ring-main-200 focus:outline-none focus-visible:ring;
}

::selection {
  background: var(--main-100, #fae8ff);
}
::-moz-selection {
  background: var(--main-100, #fae8ff);
}

@media print {
  @page {
    size: A3;
  }
}
</style>
