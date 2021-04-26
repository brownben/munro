<template>
  <tbody class="group">
    <tr
      class="transition duration-300 ease-in-out bg-white border-collapse group-hover:bg-main-200"
      :class="{ 'bg-main-100': striped }"
      @click="toggle"
    >
      <slot />
      <td v-if="expanding" class="table-cell md:hidden">
        <svg
          :class="{ 'rotate-180': open }"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          class="text-gray-600 duration-300 transform fill-current motion-safe:transition-all group-hover:text-main-700"
          aria-hidden="true"
        >
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </td>
    </tr>
    <transition name="shrink">
      <tr
        v-if="$slots.expansion"
        v-show="open"
        class="text-right transition duration-300 bg-white border-collapse md:hidden group-hover:bg-main-200"
        :class="{ 'bg-main-100': striped }"
      >
        <td class="pb-2" :colspan="100">
          <slot name="expansion" />
        </td>
      </tr>
    </transition>
  </tbody>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  striped: { type: Boolean, default: false },
  expanding: { type: Boolean, default: true },
})

const open = ref(false)

const toggle = () => {
  open.value = !open.value
}
</script>
