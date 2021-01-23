<template>
  <div>
    <label
      class="block pb-1 select-none font-heading"
      :class="focus ? 'text-main-600' : 'text-gray-600'"
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
          :class="focus ? 'text-main-500' : 'text-gray-400'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
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
        class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main-400"
        @change="$emit('update:modelValue', $event.target.value)"
        @focus="focus = true"
        @blur="focus = false"
      >
        <option v-if="shift" />

        <option v-for="item in list" :key="item" :value="item">
          {{ item }}
        </option>

        <option v-for="item in list" :key="item.text" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmit, defineProps } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  list: { type: Array, default: () => [] },
  listWithDifferentValue: { type: Array, default: () => [] },
  shift: { type: Boolean, default: true },
})
const emit = defineEmit(['update:modelValue'])

const focus = ref(false)
</script>
