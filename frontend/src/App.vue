<!--
  App.vue

  The main app file containing the base structure of the app, and base styling
-->
<template>
  <div id="app">
    <app-menu />

    <div id="content">
      <messages />
      <transition name="fade" mode="out-in">
        <router-view id="router-view" />
      </transition>
    </div>
    <cookie-dialog />
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
}
</script>

<style lang="stylus">
@import './assets/styles/helpers.styl'

html, body
  box-sizing: border-box
  margin: 0
  padding: 0

#router-view
  padding: 1rem 15%

  @media (max-width: 1000px)
    padding: 1rem 10%

  @media (max-width: 700px)
    padding: 1rem 5%

h1, h2, h3, h4, h5, h6
  margin: 0
  color: main-color
  font-weight: 400
  font-family: heading-font

p
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
</style>

