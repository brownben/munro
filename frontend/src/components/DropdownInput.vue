<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element. =
  The 'props' (values passed to the component) are watched for changes and when changed it emits a
    function with the updated data
-->

<template>
  <div class="dropdown-input">
    <select v-model="output" :onchange="onChange()">
      <option v-for="item in list" :key="item">{{ item }}</option>
    </select>
    <label>
      <svg height="24" viewBox="0 0 24 24" width="24">
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
        <path d="M0-.75h24v24H0z" fill="none"></path>
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',

  props: {
    'initial': {
      type: String,
      default: '',
    },

    'list': {
      type: Array,
      default: [],
    },
  },

  data: () => ({ output: '' }),

  watch: {
    initial (value) { this.output = value },
  },

  methods: {
    onChange: function () { this.$emit('changed', this.output) },
  },
}
</script>

<style scoped lang="stylus">
@import '../assets/styles/helpers.styl'

.dropdown-input
  margin-bottom: -20px

  select
    padding: 0.1rem
    width: 100%
    outline: 0
    border: 1px solid purple-300
    color: black
    font-weight: 300
    font-size: 1rem
    font-family: default-font
    -webkit-appearance: none

    &:focus
      outline: none
      border: 1px solid purple-500

    &::-moz-focus-inner
      border: 0

  select:focus+label
    svg
      fill: purple-500

  svg
    position: relative
    top: -25px
    right: calc(-100% + 25px)
    transition: 0.3s ease-out
    fill: purple-300
</style>
