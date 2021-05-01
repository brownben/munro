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
    <textarea
      :id="label"
      :value="modelValue"
      :type="type"
      class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline"
      :class="{
        'border-red-500 focus:border-red-500 focus:shadow-outline-red':
          state == 'invalid',
        'focus:border-main-400': state !== 'invalid',
      }"
      v-bind="inputValidationProps"
      @input="handleEvent($event)"
      @focus="setFocused()"
      @blur="setBlur()"
    />
    <p
      v-if="state === 'invalid'"
      :id="`${label}-error-message`"
      class="flex items-center text-red-600 select-none font-heading"
      aria-live="assertive"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-block w-4 h-4 text-red-600"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="px-2 py-1">
        {{ validationMessage }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineEmit, defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PropType } from 'vue'
import type { Validator } from '../scripts/inputValidation'

type State = 'focused' | 'unfocused' | 'invalid'

const route = useRoute()
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '', required: true },
  type: { type: String, default: 'text' },
  urlParameter: { type: String, default: '' },
  validators: { type: Array as PropType<Validator[]>, default: [] },
})
const emit = defineEmit(['update:modelValue'])
const state = ref<State>('unfocused')
const validationMessage = ref<string>('')

const handleEvent = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const setFocused = () => {
  if (state.value !== 'invalid') state.value = 'focused'
}

const setBlur = () => {
  if (props.validators.length === 0) state.value = 'unfocused'

  for (const validator of props.validators) {
    if (validator.func(props.modelValue)) state.value = 'unfocused'
    else {
      state.value = 'invalid'
      validationMessage.value = validator.message
      break
    }
  }
}

watchEffect(() => {
  if (props.urlParameter && route.query?.[props.urlParameter])
    emit('update:modelValue', route.query?.[props.urlParameter])
})

const inputValidationProps = computed(() => {
  if (state.value === 'invalid')
    return {
      'aria-describedby': `${props.label}-error-message`,
      'aria-invalid': true,
      required: true,
      ...props.validators?.reduce(
        (current, prev) => ({ ...current, ...prev }),
        {}
      ),
    }
  else
    return props.validators?.reduce(
      (current, prev) => ({ ...current, ...prev }),
      {}
    )
})
</script>
