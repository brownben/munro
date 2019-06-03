<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div class="dropdown-input">
    <div class="visible" @click="toggle">
      <label>{{ label }}</label>
      <p>{{ currentValue }}</p>
      <svg :class="{ active: open }" fill="#9E9E9E" height="24" viewBox="0 0 24 24" width="24">
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
    </div>
    <transition name="open">
      <div v-show="open" class="dropdown">
        <p v-for="item in list" :key="item" @click="changeSelection(item)">{{ item }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',

  props: {
    'label': {
      type: String,
      default: '',
    },
    'value': {
      type: String,
      default: '',
    },
    'list': {
      type: Array,
      default: () => [],
    },
  },

  data: function () {
    return {
      open: false,
      currentValue: this.value,
    }
  },

  watch: {
    value: function (value) {
      this.currentValue = value
    },
  },

  methods: {
    changeSelection: function (value) {
      this.open = false
      this.currentValue = value
      this.$emit('input', value)
    },

    toggle: function () {
      this.open = !this.open
      if (this.open) this.$emit('opened')
    },
  },
}
</script>

<style scoped lang="stylus">
@import '../assets/styles/helpers'

.dropdown-input
  display: block
  box-sizing: border-box
  padding: 0.2rem 0
  width: 100%
  height: 1.84rem
  outline: 0
  border: main-color solid 1px
  background-color: white
  font-weight: 300
  font-size: 1rem
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
  user-select: none

  &:last-child
    border-bottom: 0

.visible
  position: relative

  p
    display: inline-block
    padding-left: 0.25rem
    color: black
    font-size: 1rem

  label
    display: inline-block
    width: auto
    color: main-color
    font-size: 1rem

  svg
    position: absolute
    top: -0.1rem
    right: 0

    .active
      fill: main-color

.dropdown
  position: relative
  top: 0.2rem
  left: -0.05rem
  z-index: 2
  box-sizing: border-box
  width: calc(100% + 0.1rem)
  border: 1px solid alpha(main-color, 0.4)
  background-color: white
  color: black
  font-size: 1rem

  p
    display: block
    padding: 0.25rem

    &:hover
      background-color: #E1BEE7

.open-enter-active, .open-leave-active
  transition: 0.3s transform
  transform: scaleY(1)
  transform-origin: top

.open-enter, .open-leave-to
  transform: scaleY(0)
  transform-origin: top
</style>
