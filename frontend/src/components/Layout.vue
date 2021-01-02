<template>
  <div class="flex flex-col flex-grow h-full">
    <header
      v-if="(title || $slots.title) && !notFound"
      class="text-gray-900 bg-white"
    >
      <div
        class="max-w-screen-xl px-6 pb-6 mx-auto lg:px-8"
        :class="hasMobileSubTitle ? 'pt-3 md:pt-6' : 'pt-6'"
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
        <div class="max-w-screen-xl pb-8 mx-auto sm:px-6 lg:px-8">
          <div class="px-6 sm:px-0">
            <slot name="white" />
          </div>
        </div>
      </div>
      <div v-if="$slots.fullWidth && !notFound" class="w-full">
        <slot name="fullWidth" />
      </div>
      <div
        class="flex-grow"
        :class="
          gray && !notFound
            ? 'bg-gray-50 border-t border-main-100 pt-8'
            : 'bg-white'
        "
      >
        <div
          class="max-w-screen-xl pb-8 mx-auto sm:pb-10 xl:pb-12 lg:px-8 sm:px-6"
          :class="{
            'sm:pt-8': $slots.fullWidth && !gray,
          }"
        >
          <div class="grid grid-cols-2 gap-6 px-6 sm:px-0 sm:gap-8">
            <NotFound v-if="notFound" />
            <slot v-else />
          </div>
        </div>
      </div>
    </main>
    <AppFooter v-if="footer && !notFound" />
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, defineProps } from 'vue'

import AppFooter from '/@/components/Footer.vue'
const NotFound = defineAsyncComponent(() => import('/@/views/NotFound.vue'))

const props = defineProps({
  title: { type: String, default: '' },
  hasMobileSubTitle: { type: Boolean, default: false },
  gray: { type: Boolean, default: false },
  notFound: { type: Boolean, default: false },
  footer: { type: Boolean, default: false },
})
</script>
