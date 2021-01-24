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
import AppMenu from './components/Menu.vue'
import Messages from './components/Messages.vue'
</script>

<style>
@import 'tailwindcss/base';
@import './assets/styles/base.css';
@import './assets/styles/transitions.css';

@import 'tailwindcss/components';
@import './assets/styles/buttons.css';
@import './assets/styles/cards.css';

@import 'tailwindcss/utilities';
@import './assets/styles/utilities.css';
</style>
