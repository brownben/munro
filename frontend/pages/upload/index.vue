<script setup lang="ts">
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  InformationCircleIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

useTitle({
  title: 'Upload',
  description: 'Upload results to Munro',
})
</script>

<template>
  <div>
    <Heading title="Upload Results" />
    <main class="mx-auto grid max-w-screen-lg grid-cols-1 px-6 pb-12 lg:px-8">
      <div
        class="border-b border-gray-200 py-12 transition dark:border-gray-600"
        to="/upload/file"
      >
        <CloudArrowUpIcon
          aria-hidden="true"
          class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
        />
        <h2
          class="text-gray-80 0 mt-4 text-2xl font-bold leading-tight tracking-tight dark:text-gray-100"
        >
          Upload a File
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Upload a results file for an event
        </p>
        <NuxtLink
          to="/upload/file"
          class="mt-4 inline-block text-main-700 hover:text-main-800 dark:text-main-600 dark:hover:text-main-500"
        >
          Upload results file →
        </NuxtLink>
      </div>

      <div
        class="border-b border-gray-200 py-12 transition dark:border-gray-600"
      >
        <MapPinIcon
          aria-hidden="true"
          class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
        />
        <h2
          class="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-100"
        >
          Import from MapRun
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Import results from MapRun
        </p>
        <NuxtLink
          to="/upload/maprun"
          class="mt-4 inline-block text-main-700 hover:text-main-800 dark:text-main-600 dark:hover:text-main-500"
        >
          Import results →
        </NuxtLink>
      </div>

      <div
        class="border-b border-gray-200 py-12 transition dark:border-gray-600"
      >
        <PencilSquareIcon
          aria-hidden="true"
          class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
        />
        <h2
          class="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-100"
        >
          Submit a Result
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Manually submit a result for an event
        </p>
        <NuxtLink
          to="/upload/result"
          class="mt-4 inline-block text-main-700 hover:text-main-800 dark:text-main-600 dark:hover:text-main-500"
        >
          Submit a result →
        </NuxtLink>
      </div>

      <div class="rounded-lg py-12 transition" to="/upload/instructions">
        <InformationCircleIcon
          aria-hidden="true"
          class="h-12 rounded-md bg-main-500 p-2 text-white transition dark:text-gray-900"
        />
        <h2
          class="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-100"
        >
          Upload Instructions
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          How to upload results files to Munro
        </p>
        <NuxtLink
          to="/upload/instructions"
          class="mt-4 inline-block text-main-700 hover:text-main-800 dark:text-main-600 dark:hover:text-main-500"
        >
          View upload instructions →
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
