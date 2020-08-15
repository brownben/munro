<template>
  <tbody v-bind="$attrs">
    <tr :class="{ striped: striped }" @click="open = !open">
      <slot />
      <td v-if="smallWindow">
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
      <template v-if="smallWindow && open">
        <tr :class="{ striped: striped }" class="row-expansion">
          <slot name="expansion" />
        </tr>
      </template>
    </transition>
  </tbody>
</template>

<script>
export default {
  props: {
    smallWindow: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
  },

  data: () => ({
    open: false,
  }),
}
</script>
<style>
.shrink-enter-active,
.shrink-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}
.shrink-enter-from {
  opacity: 0;
  transform: scaleY(0.9);
}
.shrink-leave-to {
  opacity: 0;
}
</style>
