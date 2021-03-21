<template>
  <div>
    <label
      class="block pb-1 select-none font-heading"
      :class="{
        'text-main-600': state === 'focused',
        'text-gray-600': state === 'unfocused',
        'text-red-600': state === 'invalid',
      }"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      :value="modelValue"
      :type="type"
      class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline"
      :class="{
        'border-red-500 focus:border-red-500 focus:shadow-outline-red':
          state == 'invalid',
        'focus:border-main-400': state !== 'invalid',
      }"
      @input="handleEvent($event)"
      @focus="setFocused()"
      @blur="setBlur()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmit, defineProps } from 'vue'
import { useRoute } from 'vue-router'

type State = 'focused' | 'unfocused' | 'invalid'

const route = useRoute()
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '', required: true },
  type: { type: String, default: 'text' },
  urlParameter: { type: String, default: '' },
})
const emit = defineEmit(['update:modelValue'])
const state = ref<State>('unfocused')

const handleEvent = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const setFocused = () => {
  state.value = 'focused'
}
const setBlur = () => {
  state.value = 'unfocused'
}

watch(
  () => route.query,
  () => {
    if (props.urlParameter && route.query?.[props.urlParameter]) {
      emit('update:modelValue', route.query?.[props.urlParameter])
    }
  },
  { immediate: true }
)
</script>
