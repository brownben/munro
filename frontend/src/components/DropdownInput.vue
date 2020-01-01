<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div class="dropdown-input relative top--4">
    <label
      class="font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"
    >{{ label }}</label>
    <div
      class="visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none"
      @click="toggle"
    >
      <p class="leading-normal h-6 truncate">{{ currentValue }}</p>
      <svg class="h-8 text-main float-right fill-current mr--3 mt--68/10" viewBox="0 0 24 24">
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
    </div>
    <transition name="open">
      <div
        v-show="open"
        class="dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"
      >
        <p
          v-for="item in list"
          :key="item"
          class="select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight"
          @click="changeSelection(item)"
        >
          {{ item }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',

  props: {
    'label': {
      type: String,
      default: '',
    },
    'value': {
      type: String,
      default: '',
    },
    'list': {
      type: Array,
      default: () => [],
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

  methods: {
    changeSelection: function (value) {
      this.open = false
      this.currentValue = value
      this.$emit('input', value)
    },

    toggle: function () {
      this.open = !this.open
      if (this.open) this.$emit('opened')
    },
  },
}
</script>

<style scoped >
.open-enter-active,
.open-leave-active {
  transition: 0.3s transform;
  transform: scaleY(1);
  transform-origin: top;
}
.open-enter,
.open-leave-to {
  transform: scaleY(0);
  transform-origin: top;
}

.mt--34\/10 {
  margin-top: -0.85rem;
}
.mt--68\/10 {
  margin-top: -1.7rem;
}

.mt--5 {
  margin-top: -1.25rem;
}

.mr--3 {
  margin-right: -0.75rem;
}

p {
  transition: 0.3s;
}
</style>
