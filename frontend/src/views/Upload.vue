<template>
  <Layout title="Upload Results">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro - Upload Results"
      description="Upload Results to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/upload"
    />

    <router-link
      class="flex flex-col items-center justify-around col-span-2 px-4 py-6 text-center transition duration-300 bg-white shadow-md md:px-3 xl:px-4 hover:shadow-lg rounded-shape-xl"
      to="/upload/file"
    >
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 mb-2 text-main-700"
      >
        <path
          d="M8 17a5 5 0 01-.916-9.916 5.002 5.002 0 019.832 0A5.002 5.002 0 0116 17m-7-5l3-3m0 0l3 3m-3-3v12"
        />
      </svg>
      <h2
        class="my-2 text-2xl font-bold lg:text-3xl xl:text-25xl font-heading text-main-900"
      >
        Upload Results File
      </h2>
      <p class="text-lg text-opacity-75 font-heading text-main-900">
        Upload a Results File for an Event
      </p>
    </router-link>
    <router-link
      class="flex flex-col items-center justify-around col-span-2 px-4 py-6 text-center transition duration-300 bg-white shadow-md md:col-span-1 md:px-2 xl:px-4 hover:shadow-lg rounded-shape-xl"
      to="/upload/result"
    >
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 mb-2 text-main-700"
      >
        <path
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <h2
        class="my-2 text-2xl font-bold lg:text-3xl xl:text-25xl font-heading text-main-900"
      >
        Submit Result
      </h2>
      <p class="text-lg text-opacity-75 font-heading text-main-900">
        Manually Submit a Result for an Event
      </p>
    </router-link>
    <router-link
      class="flex flex-col items-center justify-around col-span-2 px-4 py-6 text-center transition duration-300 bg-white shadow-md md:col-span-1 md:px-2 xl:px-4 hover:shadow-lg rounded-shape-xl"
      to="/upload/maprun"
    >
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 mb-2 text-main-700"
      >
        <path
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2
        class="my-2 text-2xl font-bold lg:text-3xl xl:text-25xl font-heading text-main-900"
      >
        Import from MapRun
      </h2>
      <p class="text-lg text-opacity-75 font-heading text-main-900">
        Import the Results of an Event From MapRun
      </p>
    </router-link>

    <router-link
      class="flex flex-col items-center justify-around col-span-2 px-4 py-6 text-center transition duration-300 bg-white shadow-md md:px-2 xl:px-4 hover:shadow-lg rounded-shape-xl"
      to="/upload/instructions"
    >
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 mb-2 text-main-700"
      >
        <path
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h2
        class="my-2 text-2xl font-bold text-main-900 lg:text-3xl xl:text-25xl font-heading"
      >
        Upload Instructions
      </h2>
      <p class="text-lg text-opacity-75 text-main-900 font-heading">
        How to Upload Results Files to Munro
      </p>
    </router-link>
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
