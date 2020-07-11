<!--
  Checkbox Form Input

  Checkbox for forms. When unchecked a grey box but when clicked it becomes a purple tick.
    It spins between states.

  'Emits' a value to form when changed
-->

<template>
  <div>
    <label
      class="m-0 mt-1 text-lg transition ease-out delay-500 select-none text-md font-heading text-main"
    >
      <span class="mr-3 align-top">{{ label }}</span>
      <input
        :checked="value"
        type="checkbox"
        class="sr-only"
        @change="$emit('input', $event.target.checked)"
      />
      <span
        class="inline-block w-4 h-4 mt-1 transition-all duration-300 ease-in-out border-2 border-main-300"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="postcss">
[type='checkbox']:checked + span {
  @apply inline-block w-2 h-4 m-0;
  border: 1.5px solid theme('colors.main.500');
  border-top: 0;
  margin-left: 5px;
  border-left: 0;
  transition: 0.3s ease-in-out;
  transform: rotate(405deg);
}

[type='checkbox']:focus + span {
  @apply border-main-700;
}
</style>
