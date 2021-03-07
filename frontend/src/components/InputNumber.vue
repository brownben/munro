<template>
  <div>
    <label
      class="block pb-1 select-none font-heading"
      :class="focus ? 'text-main-600' : 'text-gray-600'"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      :value="modelValue"
      :min="min"
      :max="max"
      type="number"
      class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main-400"
      @input="handleEvent($event)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmit, defineProps } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  label: { type: String, default: '' },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
})
const emit = defineEmit(['update:modelValue'])

const focus = ref(false)

const handleEvent = (event: Event) =>
  emit(
    'update:modelValue',
    parseInt((event.target as HTMLInputElement).value, 10)
  )
</script>
