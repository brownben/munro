<template>
  <div class="text-input top--4 relative appearance-none">
    <label
      class="font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"
      >{{ label }}</label
    >
    <input
      :value="value"
      :min="min"
      :max="max"
      type="number"
      class="w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none appearance-none"
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
