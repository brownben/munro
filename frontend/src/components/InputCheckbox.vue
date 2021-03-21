<template>
  <div>
    <label class="relative flex flex-row items-center select-none">
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute left-0 w-5 h-5 text-white"
      >
        <path
          d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"
        />
      </svg>
      <input
        type="checkbox"
        class="flex-shrink-0 inline-block w-5 h-5 align-middle transition duration-300 ease-in-out bg-white border outline-none appearance-none text-main-500 rounded-shape focus:shadow-outline focus:border-main-400 checked:bg-main-500 checked:border-main-400"
        :checked="modelValue"
        @change="handleEvent($event)"
      />
      <span class="ml-3 leading-tight text-gray-600 font-heading">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { watch, defineEmit, defineProps } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  urlParameter: { type: String, default: '' },
})
const emit = defineEmit(['update:modelValue'])

const handleEvent = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).checked)

watch(
  () => route.query,
  () => {
    if (props.urlParameter && route.query?.[props.urlParameter]) {
      emit('update:modelValue', route.query?.[props.urlParameter] !== 'false')
    }
  },
  { immediate: true }
)
</script>
