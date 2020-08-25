<template>
  <tbody v-bind="$attrs" class="group">
    <tr
      class="transition duration-300 ease-in-out bg-white border-collapse group-hover:bg-main-200"
      :class="{ 'bg-main-50': striped }"
      @click="open = !open"
    >
      <slot />
      <td class="table-cell md:hidden">
        <svg
          :class="{ 'rotate-180': open }"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          class="transition-all duration-300 transform fill-current text-main-700"
        >
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </td>
    </tr>
    <transition name="shrink">
      <tr
        v-show="open"
        class="text-right transition duration-300 bg-white border-collapse md:hidden group-hover:bg-main-200"
        :class="{ 'bg-main-50': striped }"
      >
        <td colspan="100%">
          <slot name="expansion" />
        </td>
      </tr>
    </transition>
  </tbody>
</template>

<script>
export default {
  props: {
    striped: { type: Boolean, default: false },
  },

  data: () => ({
    open: false,
  }),
}
</script>
