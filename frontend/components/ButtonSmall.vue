<script setup lang="ts">
defineProps({
  link: { type: String, default: '' },
  coloured: { type: Boolean, default: false },
  external: { type: Boolean, default: false },
})
</script>
<template>
  <NuxtLink
    v-if="link"
    :to="link"
    :external="external"
    class="inline-flex items-center gap-2 rounded border px-2 py-1 text-sm font-medium leading-tight transition duration-100 hover:border-main-300 hover:bg-main-100 hover:text-main-800"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500': !coloured,
      'border-main-200 bg-main-50 text-main-700': coloured,
    }"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    class="inline-flex items-center gap-2 rounded border px-2 py-1 text-sm font-medium leading-tight transition duration-100 hover:border-main-300 hover:bg-main-100 hover:text-main-800"
    :class="{
      'border-gray-200 bg-gray-50 text-gray-500': !coloured,
      'border-main-200 bg-main-50 text-main-700': coloured,
    }"
  >
    <slot />
  </button>
</template>
