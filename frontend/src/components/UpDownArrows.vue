<!--
  Up and Down Arrows for Table

  The arrows for the table indicating sort preference and direction. The data is passed through props and watched for changes.
-->

<template>
  <div class="up-down-arrow">
    <svg :class="{ 'active-arrow': active && !ascending }" viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5z" />
    </svg>
    <svg :class="{ 'active-arrow': active && ascending }" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'UpDownArrows',

  props: {
    active: {
      type: Boolean,
      default: false,
    },

    ascending: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss">
.up-down-arrow {
  height: 20px;
  @apply inline-block;
}

.up-down-arrow svg {
  @apply relative block;
  height: 15px;
}

.up-down-arrow svg:first-child {
  bottom: -3px;
}

.up-down-arrow svg:last-child {
  top: -5px;
}

.active-arrow {
  @apply fill-current text-main;
}
</style>
