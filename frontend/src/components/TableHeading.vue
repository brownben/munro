<template>
  <th
    class="relative font-heading select-none font-normal py-2 group"
    :class="{
      'pl-0 pr-0 px-0': compressed,
      'pl-6 text-left': leftOnMobile,
      'text-center': !leftOnMobile,
      'hidden md:table-cell': compressed,
      'hidden sm:table-cell': hideOnMobile,
      'table-cell': !compressed && !hideOnMobile,
    }"
  >
    <p class="inline-block">{{ text }}</p>
    <span
      v-if="tooltip"
      class="absolute block z-40 opacity-0 transition duration-300 py-2 px-2 font-sans text-sm leading-tight text-center break-words whitespace-normal shadow bg-white rounded-shape group-hover:opacity-100"
      style="width: calc(100% + 3.5rem); left: -1.75rem"
    >
      {{ tooltip }}
    </span>
    <UpDownArrow
      class="inline-block ml-1"
      :class="compressed && 'hidden xl:inline-block'"
      :ascending="ascending"
      :active="active"
    />
  </th>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import UpDownArrow from '/@/components/UpDownArrows.vue'

const props = defineProps({
  text: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  compressed: { type: Boolean, default: false },
  ascending: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  leftOnMobile: { type: Boolean, default: false },
  hideOnMobile: { type: Boolean, default: false },
})
</script>
