<!--
  Checkbox Form Input

  Checkbox for forms. When unchecked a grey box but when clicked it becomes a purple tick.
    It spins between states.

  'Emits' a value to form when changed
-->

<template>
  <div class="mt-3 checkbox-input">
    <label class="select-none text-md font-heading text-main">
      {{ label }}
      <input
        :checked="value"
        type="checkbox"
        class="hidden"
        @change="$emit('input', $event.target.checked)"
      />
      <span />
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
label {
  @apply relative m-0;
  top: -1rem;
  margin-bottom: -2rem;
  transition: 0.45s ease-out;
}

.checkbox-input {
  @apply p-0 h-0;
  padding-top: 2px;
}

span {
  @apply relative inline-block;
  margin-left: 10px;
  width: 0.8rem;
  height: 0.8rem;
  border: 2px solid #b80bda7f;
  transition: 0.3s ease-out;
}

[type='checkbox']:checked + span {
  @apply relative inline-block w-2 h-4;
  margin-left: 13px;
  border: 1.5px solid #b80bda;
  border-top: 0;
  border-left: 0;
  transition: 0.3s ease-in-out;
  transform: rotate(405deg);
}
</style>
