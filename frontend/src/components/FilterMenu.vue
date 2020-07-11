<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <accordion-dropdown title="Filter Results">
    <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      <text-input
        v-model="preferences.name"
        label="Name:"
        class="col-span-2"
        @input="onChange"
      />
      <text-input
        v-model="preferences.club"
        label="Club:"
        class="col-span-2"
        @input="onChange"
      />
      <number-input
        v-model.number="preferences.minAge"
        :min="0"
        :max="120"
        label="Min Age:"
        class="col-span-1"
        @input="onChange"
      />
      <number-input
        v-model.number="preferences.maxAge"
        :min="0"
        :max="120"
        label="Max Age:"
        class="col-span-1"
        @input="onChange"
      />
      <checkbox-input
        v-model="preferences.male"
        class="flex flex-col justify-center col-span-1 pt-2 text-center"
        label="Male:"
        @input="onChange"
      />
      <checkbox-input
        v-model="preferences.female"
        label="Female:"
        class="flex flex-col justify-center col-span-1 pt-2 text-center"
        @input="onChange"
      />
    </div>
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
