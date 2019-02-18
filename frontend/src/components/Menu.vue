<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <div id="menu">
    <svg
      v-if="smallWindow"
      :class="{active: showMenu}"
      viewBox="0 0 24 24"
      @click="showMenu = !showMenu"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
    <h1>
      <router-link to="/">Munro</router-link>
    </h1>
    <transition name="fade">
      <div v-show="showMenu" class="actions">
        <router-link to="/">Leagues</router-link>
        <router-link to="/upload">Upload Results</router-link>
        <router-link v-if="!auth.isLoggedIn" to="/login">Admin Login</router-link>
        <router-link v-else to="/logout">Log Out</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showMenu: false,
      smallWindow: false,
      auth: this.$auth,
    }
  },

  watch: {
    '$route': function () { if (this.smallWindow) this.showMenu = false },
  },

  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize () {
      if (window.innerWidth > 700) {
        this.showMenu = true
        this.smallWindow = false
      }
      else {
        this.showMenu = false
        this.smallWindow = true
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'

#menu
  position: relative
  z-index: 5
  box-sizing: border-box
  width: 100%
  background-color: purple-500
  color: white
  box-shadow(1.5)
  no-user-select()

  svg
    display: none

  h1
    display: inline-block
    padding: 0.25rem
    padding-left: 1.5rem
    height: 3rem
    color: white
    vertical-align: middle
    font-size: 2.2rem
    line-height: 3rem

    a
      color: white
      text-decoration: none

  .actions
    position: absolute
    right: 0
    display: inline-block
    margin-right: 1.5rem
    height: 100%

    a
      display: inline-block
      padding: 0 0.65rem
      height: 3.5rem
      color: white
      vertical-align: middle
      text-align: center
      text-decoration: none
      font-size: 1.15rem
      line-height: 3.5rem
      transition: 0.3s

      &:hover
        background-color: purple-400

  @media (max-width: 700px)
    h1
      padding: 0
      width: 100%
      text-align: center

    svg
      position: absolute
      top: 0.25rem
      left: 0.5rem
      display: inline-block
      height: 2.5rem
      transition: 0.3s
      fill: white

      &:hover, .active
        fill: purple-100

    .actions
      display: block
      margin: 0
      width: 100%
      height: auto
      background-color: purple-500

      a
        display: block
        padding: 0.5rem 0
        height: auto
        background-color: purple-500
        line-height: normal

.fade-enter-active, .fade-leave-active
  transition: 0.3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
