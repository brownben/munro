<script setup lang="ts">
import type { PropType } from 'vue'
import type { Validator } from '~/utils/validation'

const emit = defineEmits(['update:modelValue'])
defineProps({
  label: { type: String, required: true },
  modelValue: { type: Number, default: 0 },
  formProps: { type: Object, default: () => ({}) },
  validator: {
    type: Object as PropType<Validator>,
    default: () => ({
      checker: () => true,
      message: '',
      fieldProperties: {},
    }),
  },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 120 },
  step: { type: Number, default: 1 },
})
</script>
<template>
  <Input
    :label="label"
    type="number"
    :form-props="{ min, max, step }"
    :model-value="modelValue.toString()"
    :validator="validator"
    @update:model-value="emit('update:modelValue', Number($event))"
  />
</template>
