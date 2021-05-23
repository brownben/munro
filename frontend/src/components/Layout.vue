<template>
  <div id="content" class="flex flex-col flex-grow h-full">
    <header
      v-if="(title || $slots.title) && !notFound"
      class="text-gray-900 bg-white"
    >
      <div
        class="max-w-screen-xl px-6 pb-6 mx-auto lg:px-8"
        :class="{
          'pt-3 md:pt-6': hasMobileSubTitle,
          'pt-6': !hasMobileSubTitle,
          'max-w-screen-sm mx-auto': thin,
        }"
      >
        <slot name="title">
          <h1 class="text-3xl font-bold leading-tight font-heading">
            {{ title }}
          </h1>
        </slot>
      </div>
    </header>

    <main class="flex flex-col flex-grow">
      <div v-if="$slots.white && !notFound" class="bg-white">
        <div
          class="max-w-screen-xl pb-8 mx-auto sm:px-6 lg:px-8"
          :class="{ 'max-w-screen-sm mx-auto': thin && !notFound }"
        >
          <div class="px-6 sm:px-0">
            <slot name="white" />
          </div>
        </div>
      </div>

      <transition
        enter-active-class="duration-150 ease-out origin-top motion-safe:transition"
        enter-from-class="scale-y-95 opacity-0 motion-safe:transform"
        enter-to-class="scale-y-100 opacity-100 motion-safe:transform"
        leave-active-class="duration-100 ease-in origin-top motion-safe:transition"
        leave-from-class="scale-y-100 opacity-100 motion-safe:transform"
        leave-to-class="scale-y-95 opacity-0 motion-safe:transform"
      >
        <div
          v-if="$slots.expansion"
          v-show="showExpansion"
          class="py-6 mb-8 -mt-2 origin-top border-t border-b border-main-100 bg-gray-50"
        >
          <div class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
            <div class="px-6 sm:px-0">
              <slot name="expansion" />
            </div>
          </div>
        </div>
      </transition>

      <div v-if="$slots.fullWidth && !notFound" class="w-full">
        <slot name="fullWidth" />
      </div>
      <div
        class="flex-grow"
        :class="{
          'bg-gray-50 border-t border-main-100 pt-8': gray && !notFound,
          'bg-white': !gray || notFound,
        }"
      >
        <div
          class="max-w-screen-xl pb-8 mx-auto sm:pb-10 xl:pb-12 lg:px-8 sm:px-6"
          :class="{
            'sm:pt-8': $slots.fullWidth && !gray,
            'mx-auto max-w-screen-sm': thin,
          }"
        >
          <div class="grid grid-cols-2 gap-6 px-6 sm:px-0 sm:gap-8">
            <NotFound v-if="notFound" />
            <slot v-else />
          </div>
        </div>
      </div>

      <div v-if="$slots.fullWidthEnd && !notFound" class="w-full sm:-mt-8">
        <slot name="fullWidthEnd" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, defineProps } from 'vue'

import AppFooter from './AppFooter.vue'
const NotFound = defineAsyncComponent(() => import('../views/NotFound.vue'))

const props = defineProps({
  title: { type: String, default: '' },
  hasMobileSubTitle: { type: Boolean, default: false },
  gray: { type: Boolean, default: false },
  notFound: { type: Boolean, default: false },
  showExpansion: { type: Boolean, default: false },
  thin: { type: Boolean, default: false },
})
</script>
