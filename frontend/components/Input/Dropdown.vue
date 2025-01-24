<script setup lang="ts">
import type { PropType } from 'vue'
import type { Validator } from '~/utils/validation'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  validator: {
    type: Object as PropType<Validator>,
    default: () => ({
      checker: () => true,
      message: '',
      fieldProperties: {},
    }),
  },

  includeBlank: { type: Boolean, default: false },
  list: {
    type: Array as PropType<
      {
        value: string
        text: string
      }[]
    >,
    default: () => [],
  },
})
type State = 'focused' | 'unfocused' | 'invalid'
const state = ref<State>('unfocused')
const validationMessage = ref<string>('')

const onInput = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value)

const setFocused = () => {
  if (state.value !== 'invalid') state.value = 'focused'
}

const setBlur = () => {
  state.value = 'unfocused'

  if (props.validator?.checker(props.modelValue)) state.value = 'unfocused'
  else {
    state.value = 'invalid'
    validationMessage.value = props.validator?.message
  }
}

const inputValidationProps = computed(() => {
  if (state.value === 'invalid')
    return {
      'aria-describedby': `${props.label}-error-message`,
      'aria-invalid': true,
      required: true,
      ...props.validator?.fieldProperties,
    }
  else return props.validator?.fieldProperties
})
</script>
<template>
  <div>
    <label
      class="block pb-1 text-sm font-medium select-none"
      :class="{
        'text-main-600 dark:text-main-600': state === 'focused',
        'text-gray-500 dark:text-gray-300': state === 'unfocused',
        'text-red-600': state === 'invalid',
      }"
      :for="label"
    >
      {{ label }}
    </label>
    <div class="relative">
      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <svg
          class="h-5 w-5"
          :class="{
            'text-gray-400': state === 'unfocused',
            'text-main-600': state === 'focused',
            'text-red-600': state === 'invalid',
          }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M19 9l-7 7-7-7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <select
        :id="label"
        :value="modelValue"
        class="w-full appearance-none rounded-sm border bg-white p-2 text-sm ring-offset-2 transition focus:outline-hidden focus-visible:ring-2 dark:bg-gray-900 dark:text-gray-100 dark:ring-offset-gray-800"
        :class="{
          'ring-main-600 focus:border-main-600 border-gray-400':
            state != 'invalid',
          'border-red-500 ring-red-500 focus:border-red-600':
            state == 'invalid',
        }"
        v-bind="inputValidationProps"
        @input="onInput($event)"
        @focus="setFocused()"
        @blur="setBlur()"
      >
        <option v-if="includeBlank" value=""></option>
        <option v-for="item in list" :key="item.text" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>

    <p
      v-if="state === 'invalid'"
      :id="`${label}-error-message`"
      class="font-heading flex items-center text-sm text-red-600 select-none"
      aria-live="assertive"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-block h-4 w-4 text-red-600"
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
