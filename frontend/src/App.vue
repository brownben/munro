<!--
  App.vue

  The main app file containing the base structure of the app, and base styling
-->
<template>
  <div id="app" class="flex flex-col w-full h-full">
    <AppMenu v-show="!$route.path.includes('embed')" />

    <div id="content" class="flex-grow">
      <Messages />
      <transition name="fade" mode="out-in">
        <router-view
          id="router-view"
          :class="{ embed: $route.path.includes('embed') }"
        />
      </transition>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppMenu from '@/components/Menu'
import Messages from '@/components/Messages'
import AppFooter from '@/components/Footer'

export default {
  components: {
    AppMenu,
    Messages,
    AppFooter,
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
