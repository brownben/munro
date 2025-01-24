<script setup lang="ts">
import {
  Switch,
  SwitchGroup,
  SwitchDescription,
  SwitchLabel,
} from '@headlessui/vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  label: { type: String, required: true },
  description: { type: String, required: false, default: '' },
})

const handleEvent = (value: boolean) =>
  emit('update:modelValue', value ?? false)
</script>

<template>
  <SwitchGroup
    as="div"
    class="flex items-center select-none"
    :class="{ 'justify-between': description, 'justify-center': !description }"
  >
    <div>
      <SwitchLabel
        class="text-base"
        :class="{
          'font-bold text-gray-700 dark:text-gray-300': description,
          'mr-4 font-medium text-gray-500 dark:text-gray-300': !description,
        }"
      >
        {{ props.label }}
      </SwitchLabel>
      <SwitchDescription
        v-if="props.description"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ props.description }}
      </SwitchDescription>
    </div>

    <Switch
      :model-value="modelValue"
      :class="modelValue ? 'bg-main-600' : 'bg-gray-200 dark:bg-gray-600'"
      class="focus:ring-main-600 relative ml-4 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden dark:ring-offset-gray-800"
      label=""
      @update:model-value="handleEvent"
    >
      <span
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
      />
    </Switch>
  </SwitchGroup>
</template>
