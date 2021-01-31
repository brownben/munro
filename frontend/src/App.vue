<template>
  <AppMenu v-if="!$route.path.includes('/embed/')" />

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
import AppMenu from './components/AppMenu.vue'
import Messages from './components/AppMessages.vue'
</script>
