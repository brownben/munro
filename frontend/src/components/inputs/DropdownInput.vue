<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div>
    <label
      class="block pb-1 text-gray-600 select-none font-heading"
      :for="label"
    >
      {{ label }}
    </label>

    <div class="relative">
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M19 9l-7 7-7-7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <select
        :id="label"
        v-model="currentValue"
        class="w-full px-3 py-2 font-sans text-gray-900 transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main"
        @change="$emit('input', currentValue)"
      >
        <option v-if="shift" />
        <template v-if="!optionTextDifferentToValue">
          <option v-for="item in list" :key="item" :value="item">
            {{ item }}
          </option>
        </template>
        <template v-else>
          <option v-for="item in list" :key="item.text" :value="item.value">
            {{ item.text }}
          </option>
        </template>
      </select>
    </div>
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
    optionTextDifferentToValue: {
      type: Boolean,
      default: false,
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
