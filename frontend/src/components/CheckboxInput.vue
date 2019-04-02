<!--
  Checkbox Form Input

  Checkbox for forms. When unchecked a grey box but when clicked it becomes a purple tick.
    It spins between states.

  'Emits' a value to form when changed
-->

<template>
  <div class="checkbox-input">
    <label>
      {{ label }}
      <input
        :checked="value"
        type="checkbox"
        @change="$emit('input', $event.target.checked)"
      >
      <span />
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',

  props: {
    'value': {
      type: Boolean,
      default: false,
    },
    'label': {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="stylus">
@import '../assets/styles/helpers.styl'

.checkbox-input
  margin-bottom: 20px
  padding: 0
  padding-top: 2px
  height: 0

  input
    display: none

  label
    position: relative
    margin: 0
    width: 50px
    color: black
    font-weight: 300
    font-size: 16px
    font-family: default-font
    transition: 0.45s ease-out
    no-user-select()

    &:not(:first-child)
      margin-left: 20px

  span
    position: relative
    display: inline-block
    margin-left: 10px
    width: 10px
    height: 10px
    border: 1px solid alpha(main-color, 0.5)
    transition: 0.3s ease-out

  [type='checkbox']:checked+span
    position: relative
    display: inline-block
    margin-left: 13px
    width: 6px
    height: 12px
    border: 1.5px solid main-color
    border-top: 0
    border-left: 0
    transition: 0.3s ease-in-out
    transform: rotate(405deg)
</style>
