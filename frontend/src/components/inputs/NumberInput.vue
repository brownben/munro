<template>
  <div>
    <label
      class="block pb-1 text-gray-600 select-none font-heading"
      :class="focus ? 'text-main-600' : 'text-gray-600'"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      :value="value"
      :min="min"
      :max="max"
      type="number"
      class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main-400"
      @input="$emit('input', $event.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script>
export default {
  name: 'NumberInput',

  props: {
    value: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },

  data: () => ({
    focus: false,
  }),
}
</script>
