<template>
  <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
    <InputText
      v-model="name"
      label="Name:"
      class="col-span-2"
      @update:modelValue="onChange"
    />
    <InputText
      v-model="club"
      label="Club:"
      class="col-span-2"
      @update:modelValue="onChange"
    />
    <InputNumber
      v-model.number="minAge"
      :min="0"
      :max="120"
      label="Min Age:"
      class="col-span-1"
      @update:modelValue="onChange"
    />
    <InputNumber
      v-model.number="maxAge"
      :min="0"
      :max="120"
      label="Max Age:"
      class="col-span-1"
      @update:modelValue="onChange"
    />
    <InputCheckbox
      v-model="male"
      class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 text-center md:pt-4 md:pb-0"
      label="Male"
      @update:modelValue="onChange"
    />
    <InputCheckbox
      v-model="female"
      label="Female"
      class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 md:pt-4 md:pb-0text-center"
      @update:modelValue="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmit } from 'vue'

import InputText from './InputText.vue'
import InputNumber from './InputNumber.vue'
import InputCheckbox from './InputCheckbox.vue'

const emit = defineEmit(['changed'])

const name = ref('')
const club = ref('')
const minAge = ref(0)
const maxAge = ref(100)
const male = ref(true)
const female = ref(true)

const onChange = () =>
  emit('changed', {
    name: name.value,
    club: club.value,
    minAge: minAge.value || 0,
    maxAge: maxAge.value || 100,
    male: male.value,
    female: female.value,
  })
</script>
