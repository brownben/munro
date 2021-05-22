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

    <div class="relative">
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <svg
          class="w-5 h-5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <select
        :id="label"
        :value="modelValue"
        class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline"
        :class="{
          'border-red-500 focus:border-red-500 focus:shadow-outline-red':
            state == 'invalid',
          'focus:border-main-400': state !== 'invalid',
        }"
        v-bind="inputValidationProps"
        @change="handleEvent($event)"
        @focus="setFocused()"
        @blur="setBlur()"
      >
        <option v-if="includeBlank" />

        <template v-if="list">
          <option v-for="item in list" :key="item" :value="item">
            {{ item }}
          </option>
        </template>
        <template v-if="listWithDifferentValue">
          <option
            v-for="item in listWithDifferentValue"
            :key="item?.text"
            :value="item?.value"
          >
            {{ item?.text }}
          </option>
        </template>
      </select>
    </div>
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
        {{ validator.message }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmit, defineProps } from 'vue'
import type { PropType } from 'vue'
import type { Validator } from '../scripts/inputValidation'

type State = 'focused' | 'unfocused' | 'invalid'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  list: { type: Array as PropType<string[]>, default: () => [] },
  includeBlank: { type: Boolean, default: true },
  validator: { type: Object as PropType<Validator>, default: null },
  listWithDifferentValue: {
    type: Array as PropType<
      {
        value: string
        text: string
      }[]
    >,
    default: () => [],
  },
})
const emit = defineEmit(['update:modelValue'])
const state = ref<State>('unfocused')

const handleEvent = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)

  if (!props.validator || props.validator.func(value)) state.value = 'focused'
}

const setFocused = () => {
  if (state.value !== 'invalid') state.value = 'focused'
}

const setBlur = () => {
  if (props.validator && !props.validator.func(props.modelValue))
    state.value = 'invalid'
  else state.value = 'unfocused'
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
