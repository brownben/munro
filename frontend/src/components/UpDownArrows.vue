<template>
  <div class="up-down-arrow print:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inline-block transition-all duration-300 text-main-900"
      :class="{
        'h-2 -mt-2': !ascending && active,
        'h-5 -mt-1': ascending && active,
        'h-7/2 -mt-1 opacity-75': !active,
      }"
      role="img"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="16" y1="9" x2="12" y2="5" />
      <line x1="8" y1="9" x2="12" y2="5" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inline-block -ml-2 transition-all duration-300 text-main-900"
      :class="{
        'h-2 mt-2': ascending && active,
        'h-5 -mt-1': !ascending && active,
        'h-7/2 -mt-1 opacity-75': !active,
      }"
      role="img"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="16" y1="15" x2="12" y2="19" />
      <line x1="8" y1="15" x2="12" y2="19" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  active: { type: Boolean, default: false },
  ascending: { type: Boolean, default: false },
})
</script>
