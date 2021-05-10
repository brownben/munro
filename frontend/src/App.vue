<template>
  <a
    href="#content"
    class="
      z-50
      bg-white
      sr-only
      focus:absolute
      focus:px-3
      focus:py-2
      focus:m-4
      text-main-800
      rounded-shape
      focus:not-sr-only
      focus:block
      focus:shadow-outline
    "
  >
    Skip to main content
  </a>
  <AppMenu v-if="!$route.path.includes('/embed/')" />

  <div class="flex flex-col flex-grow">
    <Messages />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { toSingleString } from './scripts/typeHelpers'

import AppMenu from './components/AppMenu.vue'
import Messages from './components/AppMessages.vue'

const route = useRoute()

watchEffect(async () => {
  if (route.query.theme) {
    const setTheme = (await import('./setThemes')).default
    setTheme(toSingleString(route.query.theme))
  }
})
</script>
