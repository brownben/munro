<template>
  <div class="flex-grow h-full" :class="gray ? 'bg-gray-50' : 'bg-white'">
    <header v-if="title || $slots.title" class="text-gray-900 bg-white">
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

    <main>
      <div v-if="$slots.white" class="bg-white">
        <div class="max-w-screen-xl pb-8 mx-auto sm:px-6 lg:px-8">
          <div class="px-6 sm:px-0">
            <slot name="white" />
          </div>
        </div>
      </div>
      <div class="w-full">
        <slot name="fullWidth" />
      </div>
      <div
        class="max-w-screen-xl pb-8 mx-auto sm:pb-10 xl:pb-12 lg:px-8 sm:px-6"
        :class="{
          'pt-6 sm:pt-8': $slots.fullWidth,
        }"
      >
        <div class="grid grid-cols-2 gap-6 px-6 sm:px-0 sm:gap-8">
          <slot />
        </div>
      </div>
    </main>
    <AppFooter v-if="footer" />
  </div>
</template>
<script>
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    AppFooter,
  },

  props: {
    title: { type: String, default: '' },
    hasMobileSubTitle: { type: Boolean, default: false },
    gray: { type: Boolean, default: false },
    footer: { type: Boolean, default: false },
  },
}
</script>
