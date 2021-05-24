<template>
  <div class="col-span-2">
    <h3 class="text-gray-900 font-heading">
      {{ label }}
    </h3>
    <p class="mb-4 text-sm text-gray-600">{{ description }}</p>
    <div class="grid items-center sm:grid-cols-2 gap-y-2 gap-x-6">
      <div v-for="key of keys" class="flex items-center">
        <label
          class="inline-block w-12 pr-3 select-none font-heading"
          :class="{
            'text-main-600': focused === key,
            'text-gray-600': focused !== key,
          }"
          :for="key"
        >
          {{ key }}
        </label>
        <input
          :id="key"
          :value="value?.[key] ?? ''"
          type="text"
          class="flex-grow inline-block px-2 py-1 text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none py-1font-sans rounded-shape focus:shadow-outline"
          @input="handleEvent(key, $event)"
          @focus="setFocused(key)"
          @blur="setBlur()"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmit, watchEffect } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  label: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  keys: { type: Array as PropType<string[]>, default: () => [] },
  value: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
})
const emit = defineEmit(['changed'])
const focused = ref('')

const handleEvent = (key: string, event: Event) => {
  emit('changed', {
    ...props.value,
    [key]: (event.target as HTMLInputElement).value,
  })
}

const setFocused = (input: string) => {
  focused.value = input
}
const setBlur = () => {
  focused.value = ''
}
</script>
