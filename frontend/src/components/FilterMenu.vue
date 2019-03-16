<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <accordion-dropdown title="Filter">
    <div class="half input">
      <label>Name:</label>
      <input v-model="preferences.name" type="text" @input="onChange">
    </div>
    <div class="half input">
      <label>Club:</label>
      <input v-model="preferences.club" type="text" @input="onChange">
    </div>
    <div class="quarter input">
      <label>Min Age:</label>
      <input v-model.number="preferences.minAge" type="number" min="0" max="120" @input="onChange">
    </div>
    <div class="quarter input">
      <label>Max Age:</label>
      <input v-model.number="preferences.maxAge" type="number" min="0" max="120" @input="onChange">
    </div>
    <checkbox v-model="preferences.male" class="quarter" label="Male:" @input="onChange" />
    <checkbox v-model="preferences.female" class="quarter" label="Female:" @input="onChange" />
  </accordion-dropdown>
</template>

<script>
import Checkbox from './CheckboxInput'
import AccordionDropdown from './AccordionDropdown'

export default {
  components: {
    'Checkbox': Checkbox,
    'AccordionDropdown': AccordionDropdown,
  },

  data: () => ({
    preferences: {
      name: '',
      club: '',
      minAge: 0,
      maxAge: 100,
      male: true,
      female: true,
    },
  }),

  methods: {
    onChange: function () { this.$emit('changed', this.preferences) },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

.list
  overflow: hidden
  border: 1px solid black
  transition: transform 0.4s ease-in-out
  transform-origin: top

.half
  width: 50%

  @media (max-width: 700px)
    width: 100%

    input[type='text'], input[type='number']
      width: 100%

.quarter
  width: 25%
  text-align: center

  label
    text-align: left

  @media (max-width: 700px)
    width: 50%

    input[type='text'], input[type='number']
      width: calc(100% - 0.5rem)

.checkbox-input
  padding-top: 0.5rem !important

  @media (min-width: 700px)
    padding: 1.4rem 0 0 !important
</style>
