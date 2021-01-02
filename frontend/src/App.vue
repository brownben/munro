<!--
  App.vue

  The main app file containing the base structure of the app, and base styling
-->
<template>
  <AppMenu v-show="!$route.path.includes('/embed/')" />

  <div id="content" class="flex flex-col flex-grow">
    <Messages />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import AppMenu from '/@/components/Menu.vue'
import Messages from '/@/components/Messages.vue'
</script>
