<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from '@headlessui/vue'
import type { PropType } from 'vue'

type Option = {
  title: string
  description: string
  value: string
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    default: () => [],
  },
})
const selected = computed(() =>
  props.options.find((option) => option.value === props.modelValue),
)

const handleEvent = (value: unknown) =>
  emit('update:modelValue', (value as Option)?.value ?? '')
</script>

<template>
  <RadioGroup
    :model-value="selected"
    class="flex flex-col gap-2"
    @update:model-value="handleEvent"
  >
    <RadioGroupLabel
      class="block select-none pb-1 text-sm font-medium text-gray-500"
    >
      {{ label }}
    </RadioGroupLabel>
    <RadioGroupOption
      v-for="option in options"
      :key="option.title"
      v-slot="{ active, checked }"
      :value="option"
    >
      <div
        :class="{
          'relative z-10 border-main-600 ring-2': active,
          'border-main-400 bg-main-100 text-main-900': checked,
        }"
        class="flex cursor-pointer rounded border border-gray-200 px-5 py-4 outline-none ring-main-600 ring-offset-2"
      >
        <div class="flex w-full items-center justify-between">
          <div class="items-center text-sm">
            <RadioGroupLabel
              as="p"
              :class="checked ? 'text-main-800' : 'text-gray-900'"
              class="font-bold"
            >
              {{ option.title }}
            </RadioGroupLabel>
            <RadioGroupDescription
              as="span"
              :class="checked ? 'text-main-700' : 'text-gray-500'"
              class="inline"
            >
              {{ option.description }}
            </RadioGroupDescription>
          </div>
          <div v-show="checked" class="flex-shrink-0 text-main-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="currentColor"
                fill-opacity="0.2"
              />
              <path
                d="M7 13l3 3 7-7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>
