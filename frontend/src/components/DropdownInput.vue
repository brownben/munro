<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div class="dropdown-input">
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option v-if="includeBlank" />
      <option v-for="item in list" :key="item">{{ item }}</option>
    </select>
    <label>
      <svg fill="#9E9E9E" height="24" viewBox="0 0 24 24" width="24">
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',

  props: {
    'value': {
      type: String,
      default: '',
    },
    'list': {
      type: Array,
      default: () => [],
    },
    'includeBlank': {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="stylus">
@import '../assets/styles/helpers.styl'

.dropdown-input
  margin-bottom: -35px

  select
    box-sizing: border-box
    padding: 0.2rem 0
    width: 100%
    outline: 0
    border: 1px solid main-color
    background-color: white
    color: black
    font-weight: 300
    font-size: 1rem
    font-family: default-font
    -webkit-appearance: none

  select:focus+label
    svg
      fill: main-color

  svg
    position: relative
    top: -35px
    right: calc(-100% + 27px)
    transition: 0.3s ease-out
    fill: main-color
</style>
