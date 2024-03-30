<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  examplePositions: { type: Array as PropType<string[]>, required: true },
  examplePoints: { type: Array as PropType<string[]>, required: true },
  exampleTimes: { type: Array as PropType<string[]>, default: () => [] },
})
</script>
<template>
  <article id="position-average" class="grid gap-8 sm:grid-cols-5 sm:gap-12">
    <div class="col-span-3">
      <h2
        class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100"
      >
        {{ name }}
      </h2>
      <p class="mt-2 max-w-prose text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>
    </div>
    <table class="col-span-2 text-left text-sm">
      <tr
        class="border-b border-main-200 font-medium text-gray-600 dark:border-gray-400 dark:text-gray-300"
      >
        <th class="px-4 py-2">Position</th>
        <th v-if="exampleTimes.length" class="px-4">Time</th>
        <th class="px-4">Points</th>
      </tr>
      <tr
        v-for="(position, index) in examplePositions"
        :key="index"
        :class="{ 'bg-main-100 dark:bg-gray-700': index % 2 == 1 }"
        class="text-gray-900 dark:text-gray-100"
      >
        <td class="px-4 py-2 ordinal">{{ position }}</td>
        <td v-if="exampleTimes.length" class="px-4">
          {{ exampleTimes[index] }}
        </td>
        <td class="px-4">{{ examplePoints[index] }}</td>
      </tr>
    </table>
  </article>
</template>
