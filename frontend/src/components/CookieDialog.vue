<!--
  Cookie Law Notice

  Displayed fixed at the top of the page until it is dismissed. When dismissed it slides up and stores the acceptance in local storage.
  Is only displayed if the acceptance is not in local storage.
-->

<template>
  <transition name="slide">
    <div v-if="show" @click="allowCookies()">
      <p>This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage.</p>
      <svg viewBox="0 0 24 24">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
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

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'

div
  position: fixed
  top: 0
  left: 0
  z-index: 10
  width: 100%
  background-color: purple-400
  color: white
  no-user-select()

  p
    padding: 0.5rem
    width: calc(100% - 2.75rem)
    color: white
    text-align: center

  svg
    position: absolute
    top: 0
    right: 0
    padding: 0 0.5rem
    width: 1.25rem
    height: 100%
    fill: white

.slide-enter-active, .slide-leave-active
  transition: 1s

.slide-enter, .slide-leave-to
  top: -10rem
</style>
