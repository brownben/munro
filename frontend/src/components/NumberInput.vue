<template>
  <div class="relative appearance-none text-input top--4">
    <label
      class="relative p-1 pb-0 mx-3 text-sm bg-white select-none font-heading text-main bottom--3"
      >{{ label }}</label
    >
    <input
      :value="value"
      :min="min"
      :max="max"
      type="number"
      class="w-full px-4 py-2 border outline-none appearance-none border-main rounded-shape text-body"
      @input="$emit('input', $event.target.value)"
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
}
</script>
<style>
.top--4 {
  top: -1rem;
}

.bottom--3 {
  bottom: -0.75rem;
}
</style>
