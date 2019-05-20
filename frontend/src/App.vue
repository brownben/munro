<!--
  App.vue

  The main app file containing the base structure of the app, and base styling
-->
<template>
  <div id="app">
    <app-menu v-show="!$route.path.includes('embed')" />

    <div id="content">
      <messages />
      <transition name="fade" mode="out-in">
        <router-view id="router-view" :class="{embed: $route.path.includes('embed')}" />
      </transition>
    </div>
    <cookie-dialog v-show="!$route.path.includes('embed')" />
    <p v-if="$route.path.includes('embed')" class="credits">League Results by Munro</p>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Messages from '@/components/Messages'
import CookieDialog from '@/components/CookieDialog'

export default {
  name: 'App',

  components: {
    'AppMenu': Menu,
    'Messages': Messages,
    'CookieDialog': CookieDialog,
  },

  data: function () {
    return {
      auth: this.$auth,
    }
  },
}
</script>

<style lang="stylus">
@import './assets/styles/helpers.styl'

html, body
  box-sizing: border-box
  margin: 0
  padding: 0
  font-weight: 300
  font-family: default-font

#router-view
  padding: 1rem 15%

  &.embed
    padding: 1rem !important

  @media (max-width: 1000px)
    padding: 1rem 10%

  @media (max-width: 700px)
    padding: 1rem 5%

h1, h2, h3, h4, h5, h6
  margin: 0
  color: main-color
  font-weight: 400
  font-family: heading-font

p, img
  margin: 0
  font-weight: 300
  font-family: default-font

b
  margin: 0
  color: main-color
  font-weight: 400
  font-family: default-font

::selection
  background: purple-100

::-moz-selection
  background: purple-100

.fade-enter-active, .fade-leave-active
  transition: 0.3s

.fade-enter, .fade-leave-to
  opacity: 0

.credits
  padding: 0.5rem 0
  color: main-color
  text-align: center

  a
    padding: 0 0.4rem
    color: main-color

    &:after
      color: main-color
</style>

