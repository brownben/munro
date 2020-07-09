<template>
  <div class="relative text-input top--4">
    <label
      class="relative p-1 pb-0 mx-3 text-sm bg-white select-none font-heading text-main bottom--3"
      >{{ label }}</label
    >
    <input
      :value="value"
      :type="type"
      class="w-full px-4 py-2 border outline-none border-main rounded-shape text-body"
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
<style>
.top--4 {
  top: -1rem;
}

.bottom--3 {
  bottom: -0.75rem;
}
</style>
