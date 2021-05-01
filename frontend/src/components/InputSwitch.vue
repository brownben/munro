<template>
  <SwitchGroup as="div" class="flex items-center justify-between select-none">
    <div>
      <SwitchLabel class="text-base font-heading">
        {{ props.label }}
      </SwitchLabel>
      <SwitchDescription class="text-gray-600">
        {{ props.description }}
      </SwitchDescription>
    </div>

    <Switch
      :modelValue="modelValue"
      @update:modelValue="handleEvent"
      :class="modelValue ? 'bg-main-600' : 'bg-gray-200'"
      class="relative inline-flex items-center flex-shrink-0 h-6 ml-4 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-400"
    >
      <span
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
      />
    </Switch>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import {
  Switch,
  SwitchGroup,
  SwitchDescription,
  SwitchLabel,
} from '@headlessui/vue'

const emit = defineEmit(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, required: true },
  description: { type: String, required: true },
})

const handleEvent = (value: boolean | undefined) =>
  emit('update:modelValue', value ?? false)
</script>
