<script setup>
useTitle({ title: "I'm Lost", description: 'Page not found' })
setResponseStatus(404)
</script>

<template>
  <main
    class="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-10 sm:py-16 lg:px-8"
  >
    <p
      class="text-main-600 dark:text-main-600 text-lg font-bold tracking-wide uppercase"
    >
      404 Error
    </p>
    <h1
      class="text-5xl font-black tracking-tight text-gray-900 md:text-6xl dark:text-gray-100"
    >
      Sorry, I'm Lost
    </h1>
    <p
      class="mt-3 text-lg leading-tight text-gray-500 md:text-xl dark:text-gray-300"
    >
      I can't currently find what you are looking for.
    </p>
    <NuxtLink
      to="/"
      class="text-main-600 hover:text-main-700 dark:text-main-600 dark:hover:text-main-500 mt-6 inline-block"
    >
      Go back home →
    </NuxtLink>
  </main>
</template>
