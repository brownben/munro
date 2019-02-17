<template>
  <div id="app">
    <AppMenu />

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
  created: function () { this.$auth.checkLogin() },
}
</script>

<style lang="stylus">
@import './assets/styles/helpers.styl'

html, body
  box-sizing: border-box
  margin: 0
  padding: 0

h1, h2, h3, h4, h5, h6, label, a, b
  margin: 0
  color: purple-500
  font-weight: 300
  font-family: default-font

b
  font-weight: 400

a
  &:focus
    outline: none

  &::-moz-focus-inner
    border: 0

p, th, td, img
  margin: 0
  color: black
  font-weight: 300
  font-family: default-font

#content
  overflow-x: hidden
  overflow-y: auto
  box-sizing: border-box
  width: 100%
  height: calc(100% - 3.5rem)

  @media (max-width: 700px)
    height: calc(100% - 3rem)

  #router-view
    padding-bottom: 1.5rem

::selection
  background: purple-100

::-moz-selection
  background: purple-100

.fade-enter-active, .fade-leave-active
  transition: 0.3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>

