<!--
  Not Found

  Displayed when page is not found by the router, or data is not found from API
-->

<template>
  <Layout>
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - I'm Lost"
      description="Page Not Found on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
    />

    <div class="w-full col-span-2 text-center">
      <div class="inline-block w-full mt-8 md:w-2/3 xl:w-7/12">
        <img
          src="@/assets/images/UndrawLost.svg"
          class="object-contain w-full mx-auto max-h-112"
          alt="Person Lost looking at Map"
        />
      </div>
      <h1
        class="mt-8 text-4xl font-bold text-gray-900 md:mt-12 md:text-5xl leading-12"
      >
        Sorry, I'm Lost
      </h1>
      <h2 class="mt-6 text-lg text-gray-500 md:text-xl">
        I can't currently find what you are looking for, the link might be
        broken or the page may have moved.
      </h2>

      <p class="mt-8 text-lg text-gray-600 md:text-xl md:mt-12 font-heading">
        Try Looking Here:
      </p>
      <div class="mt-1">
        <router-link to="/" class="px-4 py-2 text-xl button">Home</router-link>
        <router-link to="/leagues" class="px-4 py-2 text-xl button"
          >Leagues</router-link
        >
        <router-link to="/latest-results" class="px-4 py-2 text-xl button"
          >Latest Results</router-link
        >
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>
