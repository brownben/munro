<template>
  <form class="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
    <InputText
      :modelValue="props.preferences.name"
      label="Name:"
      class="col-span-2"
      @update:modelValue="onChange('name')($event ?? '')"
    />
    <InputText
      :modelValue="props.preferences.club"
      label="Club:"
      class="col-span-2"
      @update:modelValue="onChange('club')($event ?? '')"
    />
    <InputNumber
      :modelValue="props.preferences.minAge"
      :min="0"
      :max="120"
      label="Min Age:"
      class="col-span-1"
      @update:modelValue="onChange('minAge')($event ?? 0)"
    />
    <InputNumber
      :modelValue="props.preferences.maxAge"
      :min="0"
      :max="120"
      label="Max Age:"
      class="col-span-1"
      @update:modelValue="onChange('maxAge')($event ?? 100)"
    />
    <InputCheckbox
      :modelValue="props.preferences.male"
      label="Male"
      class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 text-center md:pt-4 md:pb-0"
      @update:modelValue="onChange('male')($event ?? true)"
    />
    <InputCheckbox
      :modelValue="props.preferences.female"
      label="Female"
      class="flex flex-col items-center justify-center col-span-1 pt-2 pb-2 md:pt-4 md:pb-0text-center"
      @update:modelValue="onChange('female')($event ?? true)"
    />
  </form>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from 'vue'
import type { PropType } from 'vue'

import InputText from './InputText.vue'
import InputNumber from './InputNumber.vue'
import InputCheckbox from './InputCheckbox.vue'

const emit = defineEmit({
  changed: (_filterData: Partial<FilterPreferences>) => true,
})
const props = defineProps({
  preferences: {
    type: Object as PropType<FilterPreferences>,
    required: true,
  },
})

const onChange = (key: keyof FilterPreferences) => (
  value: FilterPreferences[keyof FilterPreferences]
) => emit('changed', { [key]: value })
</script>
