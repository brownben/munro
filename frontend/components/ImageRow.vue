<script setup lang="ts">
import type { PropType, Component } from 'vue'

defineProps({
  icon: { type: Function as unknown as PropType<Component>, required: true },
  darker: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
})
</script>
<template>
  <div
    class="group flex flex-row items-center leading-tight transition"
    :class="{
      'text-gray-500': !darker,
      'text-gray-600': darker,
      'hover:text-main-700': hover,
    }"
  >
    <component
      :is="icon"
      class="inline-block h-5 w-5 transition"
      :class="{
        'text-gray-400': !darker,
        'text-gray-500': darker,
        'group-hover:text-main-600': hover,
      }"
      aria-hidden="true"
    />

    <p class="ml-2 inline-block">
      <slot></slot>
    </p>
  </div>
</template>
