<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <div id="menu" :class="{ dark: $route.path === '/'}">
    <h1>
      <router-link to="/">Munro</router-link>
    </h1>
    <svg
      v-if="smallWindow"
      :class="{active: showMenu}"
      viewBox="0 0 24 24"
      @click="showMenu = !showMenu"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
    <transition name="shrink">
      <nav v-show="showMenu || !smallWindow">
        <router-link to="/leagues">Leagues</router-link>
        <router-link to="/upload">Upload Results</router-link>
        <router-link v-if="!auth.user" to="/login">Admin Login</router-link>
        <router-link v-else to="/logout">Log Out</router-link>
      </nav>
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
    '$route': function () { this.showMenu = false },
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
      this.showMenu = false
      this.smallWindow = window.innerWidth <= 700
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'

#menu
  box-sizing: border-box
  padding: 0 5%
  width: 100%
  no-user-select()

  h1
    display: inline-block
    margin: 0
    padding: 0.65rem 0
    height: 2.2rem
    color: main-color
    font-weight: 400
    font-size: 2.2rem
    font-family: heading-font

    a
      color: main-color
      text-decoration: none

  svg
    display: none

  nav
    position: absolute
    top: 1rem
    right: 5%
    z-index: 10
    display: inline-block
    box-sizing: border-box
    font-weight: 300
    font-size: 1.2rem
    font-family: main-color

    a
      position: relative
      box-sizing: border-box
      margin: 0 0.25rem
      padding: 0.4rem 0.5rem
      color: hsl(290, 90%, 45%)
      text-decoration: none
      font-weight: 300
      font-family: heading-font

      &:focus
        outline: none

      &:before
        position: absolute
        bottom: 0
        left: 0
        visibility: hidden
        width: 100%
        height: 1px
        background-color: hsl(290, 90%, 45%)
        content: ''
        transition: all 0.3s ease-in-out 0s
        transform: scaleX(0)
        -webkit-transform: scaleX(0)
        -webkit-transition: all 0.3s ease-in-out 0s

      &:hover:before, &.active:before
        visibility: visible
        transform: scaleX(1)
        -webkit-transform: scaleX(1)

  @media (max-width: 700px)
    text-align: center

    h1
      position: relative
      z-index: 2

    svg
      position: absolute
      top: 0.5rem
      right: 0.5rem
      z-index: 2
      display: inline-block
      height: 2.5rem
      transition: 0.3s
      fill: main-color

      &:hover, .active
        fill: alpha(main-color, 0.8)

    nav
      top: 0
      left: 0
      z-index: 1
      display: flex
      flex-direction: column
      justify-content: center
      box-sizing: border-box
      margin: 0
      padding-top: 3.5rem
      width: 100vw
      height: 100vh
      background-color: white
      transition: 0.5s
      transform: 0.5s
      transform-origin: top

      a
        display: block
        margin: 0
        padding: 0.7rem 0
        height: auto
        background-color: white
        line-height: normal
        transition: 0.3s

        &:first-child
          margin-top: -7rem

        &:before
          display: none

        &:hover
          background-color: main-color
          color: white

#menu.dark
  h1, p, a
    color: white !important

  a:before
    background-color: white !important

  svg
    fill: white !important

    &:hover
      fill: alpha(white, 0.8) !important

  nav
    @media (max-width: 700px)
      background-color: main-color !important

      a
        background-color: main-color !important

        &:hover
          background-color: alpha(white, 0.25) !important

.fade-enter-active, .fade-leave-active
  transition: 0.3s
  transform-origin: top

.fade-enter, .fade-leave-to
  opacity: 0

.shrink-enter, .shrink-leave-to
  transform: scaleY(0)
</style>
