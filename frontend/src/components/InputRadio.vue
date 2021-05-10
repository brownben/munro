<template>
  <RadioGroup
    as="div"
    :model-value="selected"
    @update:model-value="handleEvent"
    class="w-full select-none"
  >
    <RadioGroupLabel class="text-gray-600 select-none font-heading">
      {{ props.label }}
    </RadioGroupLabel>
    <div class="mt-2 border divide-y rounded-shape-xl">
      <RadioGroupOption
        v-for="option in props.options"
        as="template"
        :key="option.title"
        :value="option"
        v-slot="{ active, checked }"
      >
        <div
          :class="{
            'shadow-outline z-10 relative': active,
            'bg-main-100 text-main-900': checked,
          }"
          class="
            flex
            px-5
            py-4
            outline-none
            cursor-pointer
            first:rounded-tl-xl
            last:rounded-br-xl
          "
        >
          <div class="flex items-center justify-between w-full">
            <div class="items-center text-sm">
              <RadioGroupLabel
                as="p"
                :class="checked ? 'text-main-800' : 'text-gray-900'"
                class="text-base font-heading"
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
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
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
    </div>
  </RadioGroup>
</template>
<script setup lang="ts">
import { computed, defineProps, defineEmit } from 'vue'
import type { PropType } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'

type Option = {
  title: string
  description: string
  value: string
}
const emit = defineEmit(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: true },
  options: { type: Array as PropType<Option[]>, required: true, default: [] },
})
const selected = computed(() =>
  props.options.find((option) => option.value === props.modelValue)
)

const handleEvent = (value: unknown) =>
  emit('update:modelValue', (value as Option)?.value ?? '')
</script>
