<!--
  App.vue

  The main app file containing the base structure of the app, and base styling
-->
<template>
  <div id="app" class="flex flex-col w-full min-h-full">
    <AppMenu v-show="!$route.path.includes('embed')" />

    <div id="content" class="flex flex-col flex-grow">
      <Messages />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/components/Menu.vue'
import Messages from '@/components/Messages.vue'

export default {
  components: {
    AppMenu,
    Messages,
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
