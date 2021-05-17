<template>
  <Disclosure v-slot="{ open }" as="tbody" class="group">
    <tr
      class="transition duration-300 ease-in-out bg-white border-collapse group-hover:bg-main-200 group-focus-within:bg-main-200"
      :class="{ 'bg-main-100': striped }"
    >
      <slot />
      <td v-if="expanding" class="relative table-cell text-center md:hidden">
        <DisclosureButton
          class="rounded-sm outline-none table-expansion-button"
        >
          <svg
            :class="{ 'rotate-180': open }"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="text-gray-500 duration-300 transform fill-current motion-safe:transition-all group-hover:text-main-700"
            aria-hidden="true"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <span class="sr-only">Show Event Points</span>
        </DisclosureButton>
      </td>
    </tr>
    <transition v-if="$slots.expansion" name="shrink">
      <DisclosurePanel
        as="tr"
        class="text-right transition duration-300 bg-white border-collapse md:hidden group-hover:bg-main-200 group-focus-within:bg-main-200"
        :class="{ 'bg-main-100': striped }"
      >
        <td class="pb-2" :colspan="100">
          <slot name="expansion" />
        </td>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const props = defineProps({
  striped: { type: Boolean, default: false },
  expanding: { type: Boolean, default: true },
})
</script>
<style lang="postcss">
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
