<!--
  Dropdown Form Input

  Dropdown input for forms wrapper for the select element.
  'Emits' a value when changed
-->

<template>
  <div class="relative dropdown-input" :class="{ 'top--4': shift }">
    <label
      class="relative p-1 mx-3 text-sm bg-white select-none font-heading text-main bottom--3"
      >{{ label }}</label
    >
    <div
      class="visible w-full px-4 py-2 border outline-none border-main rounded-shape"
      @click="toggle"
    >
      <p class="h-6 leading-normal truncate">{{ currentValue }}</p>
      <svg
        class="float-right h-8 fill-current text-main mr--3 mt--68/10"
        viewBox="0 0 24 24"
      >
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
    </div>
    <transition name="open">
      <div
        v-show="open"
        class="absolute z-40 w-full mb-2 text-center bg-white border border-t-0 select-none dropdown text-body border-main"
      >
        <p
          v-for="item in list"
          :key="item"
          class="px-3 py-2 leading-normal text-center truncate select-none hover:bg-main-veryLight"
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

<style>
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

.top--4 {
  top: -1rem;
}

.bottom--3 {
  bottom: -0.75rem;
}
</style>
