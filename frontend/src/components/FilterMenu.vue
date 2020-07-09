<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <accordion-dropdown title="Filter">
    <text-input
      v-model="preferences.name"
      label="Name:"
      class="inline-block w-full md:w-1/2 md:pr-2"
      @input="onChange"
    />
    <text-input
      v-model="preferences.club"
      label="Club:"
      class="inline-block w-full md:w-1/2 md:pl-2"
      @input="onChange"
    />
    <number-input
      v-model.number="preferences.minAge"
      :min="0"
      :max="120"
      label="Min Age:"
      class="inline-block w-1/2 pr-2 md:w-1/4 md:-mb-4"
      @input="onChange"
    />
    <number-input
      v-model.number="preferences.maxAge"
      :min="0"
      :max="120"
      label="Max Age:"
      class="inline-block w-1/2 pl-2 md:w-1/4 md:-mb-4"
      @input="onChange"
    />
    <checkbox-input
      v-model="preferences.male"
      class="inline-block w-1/2 pr-2 text-center md:w-1/4"
      label="Male:"
      @input="onChange"
    />
    <checkbox-input
      v-model="preferences.female"
      class="inline-block w-1/2 pl-2 text-center md:w-1/4"
      label="Female:"
      @input="onChange"
    />
  </accordion-dropdown>
</template>

<script>
import CheckboxInput from './CheckboxInput'
import AccordionDropdown from './AccordionDropdown'
import TextInput from './TextInput'
import NumberInput from './NumberInput'

export default {
  components: {
    CheckboxInput,
    AccordionDropdown,
    TextInput,
    NumberInput,
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
