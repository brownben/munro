<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>
<template>
  <div class="col-span-2 pt-6 first:pt-0">
    <h2 class="text-lg font-bold tracking-tight text-gray-900">
      {{ title }}
    </h2>
    <p class="text-sm text-gray-600">
      {{ description }}
    </p>
  </div>
</template>
