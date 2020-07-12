<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div class="relative">
    <label
      class="block pb-1 select-none font-heading text-main-600"
      :for="label"
    >
      {{ label }}
    </label>

    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="absolute bottom-0 right-0 h-6 mr-2 text-main-500"
      style="margin-bottom: 0.625rem;"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
    <select
      :id="label"
      v-model="currentValue"
      class="w-full px-3 py-2 transition-all duration-300 border-2 border-opacity-0 outline-none appearance-none rounded-shape text-body bg-main-100 border-main focus:border-opacity-100"
      @change="$emit('input', currentValue)"
    >
      <option v-if="shift" />
      <option v-for="item in list" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
    shift: {
      type: Boolean,
      default: true,
    },
  },

  data: function () {
    return {
      open: false,
      currentValue: this.value,
    }
  },

  watch: {
    value: function (value) {
      this.currentValue = value
    },
  },
}
</script>

<style lang="postcss">
option {
  @apply bg-white;
}
</style>
