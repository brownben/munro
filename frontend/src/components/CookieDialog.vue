<!--
  Cookie Law Notice

  Displayed fixed at the top of the page until it is dismissed. When dismissed it slides up and stores the acceptance in local storage.
  Is only displayed if the acceptance is not in local storage.
-->

<template>
  <transition name="slide">
    <div v-if="show" class="fixed w-full p-3 bottom-0">
      <div class="card-color z-50" @click="allowCookies">
        <p
          class="mr-12"
        >
          This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage.
        </p>
        <svg class="fill-current h-6 absolute right-0 mr-8" viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CookieDialog',

  data: () => ({ show: Boolean }),

  created: function () {
    this.show = (localStorage.getItem('cookies') !== 'accepted')
  },

  methods: {
    allowCookies: function () {
      this.show = false
      localStorage.setItem('cookies', 'accepted')
    },
  },
}
</script>

<style  scoped>
.slide-enter-active,
.slide-leave-active {
  transition: 1s;
}

.slide-enter,
.slide-leave-to {
  right: -100vw;
}
</style>
