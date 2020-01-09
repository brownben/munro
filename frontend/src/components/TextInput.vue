<template>
  <div class="text-input top--4 relative">
    <label
      class="font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"
      >{{ label }}</label
    >
    <input
      :value="value"
      :type="type"
      class="w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none"
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
