<template>
  <div>
    <label
      class="block pb-1 select-none font-heading text-main-600"
      :for="label"
      >{{ label }}</label
    >
    <input
      :id="label"
      :value="value"
      :type="type"
      class="w-full px-3 py-2 transition-all duration-300 border-2 border-opacity-0 outline-none rounded-shape text-body bg-main-100 border-main focus:border-opacity-100"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
}
</script>
