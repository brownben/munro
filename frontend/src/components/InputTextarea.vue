<template>
  <div>
    <label
      class="block pb-1 select-none font-heading"
      :class="focus ? 'text-main-600' : 'text-gray-600'"
      :for="label"
    >
      {{ label }}
    </label>
    <textarea
      :id="label"
      :value="modelValue"
      class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main-400"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmit, defineProps } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
})
const emits = defineEmit(['update:modelValue'])

const focus = ref(false)
</script>