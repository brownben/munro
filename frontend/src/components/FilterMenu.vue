<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <accordian-dropdown title="Filter">
    <div class="half input">
      <label>Name:</label>
      <input v-model="preferences.name" type="text" @change="onChange">
    </div>
    <div class="half input">
      <label>Club:</label>
      <input v-model="preferences.club" type="text" @change="onChange">
    </div>
    <div class="quarter input">
      <label>Min Age:</label>
      <input v-model.number="preferences.minAge" type="text" min="0" max="120" @change="onChange">
    </div>
    <div class="quarter input">
      <label>Max Age:</label>
      <input v-model.number="preferences.maxAge" type="text" min="0" max="120" @change="onChange">
    </div>
    <checkbox v-model="preferences.male" class="quarter" label="Male:" />
    <checkbox v-model="preferences.female" class="quarter" label="Female:" />
  </accordian-dropdown>
</template>

<script>
import Checkbox from './Checkbox'
import AccordianDropdown from './AccordianDropdown'

export default {
  components: {
    'Checkbox': Checkbox,
    'AccordianDropdown': AccordianDropdown,
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
    onChange: function () {
      this.$emit('changed', this.preferences)
    },
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
