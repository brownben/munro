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
  <article id="position-average" class="grid gap-8 sm:gap-12 sm:grid-cols-5">
    <div class="col-span-3">
      <h2 class="font-bold text-xl sm:text-2xl">
        {{ name }}
      </h2>
      <p class="text-gray-600 mt-2">
        {{ description }}
      </p>
    </div>
    <table class="text-left col-span-2">
      <tr class="border-b border-main-400">
        <th class="font-medium px-4 py-1">Position</th>
        <th v-if="exampleTimes.length" class="font-medium px-4 py-1">Time</th>
        <th class="font-medium px-4 py-1">Points</th>
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
