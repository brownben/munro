<!--
  Filter Menu

  Holds all the input for the filter menu for the results table. Emits an event with the full selection criteria when a field is changed. No props are used as data only needs to come from it, no data needs passed to the component
-->

<template>
  <AccordionDropdown title="Filter Results">
    <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      <TextInput
        v-model="name"
        label="Name:"
        class="col-span-2"
        @update:modelValue="onChange"
      />
      <TextInput
        v-model="club"
        label="Club:"
        class="col-span-2"
        @update:modelValue="onChange"
      />
      <NumberInput
        v-model.number="minAge"
        :min="0"
        :max="120"
        label="Min Age:"
        class="col-span-1"
        @update:modelValue="onChange"
      />
      <NumberInput
        v-model.number="maxAge"
        :min="0"
        :max="120"
        label="Max Age:"
        class="col-span-1"
        @update:modelValue="onChange"
      />
      <CheckboxInput
        v-model="male"
        class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 text-center md:pt-4 md:pb-0"
        label="Male"
        @update:modelValue="onChange"
      />
      <CheckboxInput
        v-model="female"
        label="Female"
        class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 md:pt-4 md:pb-0text-center"
        @update:modelValue="onChange"
      />
    </div>
  </AccordionDropdown>
</template>

<script>
import AccordionDropdown from '/@/components/inputs/AccordionDropdown.vue'
import TextInput from '/@/components/inputs/TextInput.vue'
import NumberInput from '/@/components/inputs/NumberInput.vue'
import CheckboxInput from '/@/components/inputs/CheckboxInput.vue'

export default {
  components: {
    AccordionDropdown,
    TextInput,
    NumberInput,
    CheckboxInput,
  },

  emits: ['changed'],

  data: () => ({
    name: '',
    club: '',
    minAge: 0,
    maxAge: 100,
    male: true,
    female: true,
  }),

  methods: {
    onChange: function () {
      this.$emit('changed', {
        name: this.name,
        club: this.club,
        minAge: this.minAge,
        maxAge: this.maxAge,
        male: this.male,
        female: this.female,
      })
    },
  },
}
</script>
