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
      <h2 class="text-xl font-bold sm:text-2xl">
        {{ name }}
      </h2>
      <p class="mt-2 text-gray-600">
        {{ description }}
      </p>
    </div>
    <table class="col-span-2 text-left">
      <tr class="border-b border-main-400">
        <th class="px-4 py-1 font-medium">Position</th>
        <th v-if="exampleTimes.length" class="px-4 py-1 font-medium">Time</th>
        <th class="px-4 py-1 font-medium">Points</th>
      </tr>
      <tr
        v-for="(position, index) in examplePositions"
        :key="index"
        :class="{ 'bg-main-50': index % 2 == 1 }"
      >
        <td class="px-4 py-1 ordinal">{{ position }}</td>
        <td v-if="exampleTimes.length" class="px-4 py-1">
          {{ exampleTimes[index] }}
        </td>
        <td class="px-4 py-1">{{ examplePoints[index] }}</td>
      </tr>
    </table>
  </article>
</template>
