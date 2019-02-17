<!--
  Up and Down Arrows for Table

  The arrows for the table indicating sort preference and direction. The data is passed through props and watched for changes.
-->

<template>
  <div id="up-down-arrows">
    <svg :class="{ active: (activeValue && !ascendingValue) }" viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5z" />
    </svg>
    <svg :class="{ active: (activeValue && ascendingValue) }" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'UpDownArrows',

  props: {
    'active': {
      type: Boolean,
      default: false,
    },

    'ascending': {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    activeValue: false,
    ascendingValue: false,
  }),

  watch: {
    active (value) { this.activeValue = value },
    ascending (value) { this.ascendingValue = value },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'

#up-down-arrows
  display: inline-block
  height: 20px

  svg
    position: relative
    display: block
    height: 15px

    &:first-child
      bottom: -3px

    &:last-child
      top: -5px

.active
  fill: purple-500
</style>
