<template>
  <Disclosure v-slot="{ open }" as="tbody" class="group">
    <tr
      class="border-collapse bg-white text-gray-800 transition duration-300 ease-in-out group-focus-within:bg-main-200 group-hover:bg-main-200"
      :class="{ 'bg-main-100': striped }"
    >
      <slot />
      <td class="relative table-cell text-center md:hidden">
        <DisclosureButton
          class="table-expansion-button rounded-sm outline-none"
        >
          <svg
            :class="{ 'rotate-180': open }"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="transform fill-current text-gray-500 duration-300 group-hover:text-main-700 motion-safe:transition-all"
            aria-hidden="true"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <span class="sr-only">Show Event Points</span>
        </DisclosureButton>
      </td>
    </tr>

    <DisclosurePanel
      as="tr"
      class="border-collapse bg-white text-right transition duration-300 group-focus-within:bg-main-200 group-hover:bg-main-200 md:hidden"
      :class="{ 'bg-main-100': striped }"
    >
      <td class="pb-2" :colspan="100">
        <slot name="expansion" />
      </td>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

defineProps({
  striped: { type: Boolean, default: false },
})
</script>
<style>
.table-expansion-button::after {
  content: '';
  width: calc(100vw - 4rem);
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
