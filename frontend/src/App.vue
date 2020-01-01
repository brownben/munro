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
    <p
      v-if="$route.path.includes('embed')"
      class="font-heading text-center w-full text-main"
    >
      League Results by Munro
    </p>
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

<style>
::selection {
  background: #f3e5f5;
}
::-moz-selection {
  background: #f3e5f5;
}
</style>

