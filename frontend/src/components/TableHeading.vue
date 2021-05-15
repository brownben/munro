<template>
  <th
    class="relative select-none py-2 group font-heading font-normal"
    :class="{
      'pl-0 pr-0 px-0': compressed,
      'pl-6 text-left': leftOnMobile,
      'text-center': !leftOnMobile,
      'hidden md:table-cell': compressed,
      'hidden sm:table-cell': hideOnMobile,
      'table-cell': !compressed && !hideOnMobile,
    }"
    :aria-sort="ariaSorted"
  >
    <button
      type="button"
      class="focus-visible:ring rounded-md ring-main-200 px-1"
      @click="$emit('toggle')"
    >
      <span
        class="inline-block text-sm"
        :aria-hidden="screenreaderText ? 'true' : undefined"
      >
        {{ text }}
      </span>
      <span v-if="screenreaderText" class="sr-only">
        {{ screenreaderText }}
      </span>
      <span
        v-if="tooltip"
        class="
          absolute
          block
          z-40
          opacity-0
          transition
          duration-300
          py-2
          px-2
          font-sans
          text-sm
          leading-tight
          text-center
          break-words
          whitespace-normal
          shadow
          bg-white
          rounded-shape
          group-hover:opacity-100
          -left-7
          w-[calc(100%+3.5rem)]
        "
      >
        {{ tooltip }}
      </span>

      <UpDownArrow
        class="ml-1 inline-block"
        :class="compressed && 'hidden xl:inline-block'"
        :ascending="ascending"
        :active="active"
        aria-hidden="true"
      />
    </button>
  </th>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import UpDownArrow from './UpDownArrows.vue'

const props = defineProps({
  text: { type: String, default: '' },
  screenreaderText: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  compressed: { type: Boolean, default: false },
  ascending: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  leftOnMobile: { type: Boolean, default: false },
  hideOnMobile: { type: Boolean, default: false },
})

const ariaSorted = computed(() => {
  if (props.active && props.ascending) return 'ascending'
  else if (props.active) return 'descending'
  else return undefined
})
</script>
