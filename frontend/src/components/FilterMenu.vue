<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <accordion-dropdown title="Filter">
    <text-input
      v-model="preferences.name"
      label="Name:"
      class="w-full md:w-1/2 inline-block md:pr-2"
      @input="onChange"
    />
    <text-input
      v-model="preferences.club"
      label="Club:"
      class="w-full md:w-1/2 inline-block md:pl-2"
      @input="onChange"
    />
    <number-input
      v-model.number="preferences.minAge"
      label="Min Age:"
      class="w-1/2 md:w-1/4 inline-block pr-2 md:mb--4"
      :min="0"
      :max="120"
      @input="onChange"
    />
    <number-input
      v-model.number="preferences.maxAge"
      label="Max Age:"
      class="w-1/2 md:w-1/4 inline-block pl-2 md:mb--4"
      :min="0"
      :max="120"
      @input="onChange"
    />
    <checkbox
      v-model="preferences.male"
      class="w-1/2 md:w-1/4 inline-block pr-2 text-center"
      label="Male:"
      @input="onChange"
    />
    <checkbox
      v-model="preferences.female"
      class="w-1/2 md:w-1/4 inline-block pl-2 text-center"
      label="Female:"
      @input="onChange"
    />
  </accordion-dropdown>
</template>

<script>
import Checkbox from './CheckboxInput'
import AccordionDropdown from './AccordionDropdown'
import TextInput from './TextInput'
import NumberInput from './NumberInput'

export default {
  components: {
    'Checkbox': Checkbox,
    'AccordionDropdown': AccordionDropdown,
    'TextInput': TextInput,
    'NumberInput': NumberInput,
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

<style  scoped>
</style>
