<template>
  <td
    class="px-1 font-sans"
    :class="{
      'hidden sm:table-cell': showAfter === 'sm',
      'hidden md:table-cell': showAfter === 'md',
      'hidden lg:table-cell': showAfter === 'lg',
      'hidden xl:table-cell': showAfter === 'xl',
      'py-1 pl-6 text-left font-normal sm:font-light': $slots.secondary,
      'py-2 text-center font-light': !$slots.secondary,
      'pl-0 pr-0 px-0 text-sm xl:text-base': compressed,
    }"
  >
    <slot />
    <span
      v-if="$slots.secondary"
      class="block text-xs font-light text-gray-700"
      :class="{
        'table-cell sm:hidden': showSecondaryUntil == 'sm',
        'table-cell md:hidden': showSecondaryUntil == 'md',
        'table-cell lg:hidden': showSecondaryUntil == 'lg',
        'table-cell xl:hidden': showSecondaryUntil == 'xl',
      }"
    >
      <slot name="secondary" />
    </span>
  </td>
</template>

<script>
export default {
  props: {
    showAfter: { type: String, default: '' },
    showSecondaryUntil: { type: String, default: '' },
    compressed: { type: Boolean, default: false },
  },
}
</script>
