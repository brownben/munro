<script setup lang="ts">
import type { PropType } from 'vue'

interface Link {
  text: string
  location: string
}

defineProps({
  links: { type: Array as PropType<Link[]>, required: true },
  dark: { type: Boolean, default: false },
  light: { type: Boolean, default: false },
})
</script>

<template>
  <section
    class="w-full print:hidden"
    :class="{
      'from-main-500 to-main-700 dark:from-main-700 dark:to-main-900 bg-linear-to-r':
        !dark && !light,
      'bg-main-800': dark,
      'bg-main-50 dark:bg-main-900 border-main-100 border-y dark:border-0':
        light,
    }"
  >
    <div
      class="mx-auto flex max-w-(--breakpoint-lg) flex-col justify-between gap-8 px-6 py-8 lg:px-8"
      :class="{ 'md:flex-row md:py-12': links.length <= 4 }"
    >
      <h2
        class="text-2xl font-bold"
        :class="light ? 'text-main-600 dark:text-white' : 'text-white'"
      >
        <slot />
      </h2>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="link in links"
          :key="link.location"
          :to="link.location"
          class="ring-opacity-40 flex items-center justify-center rounded-md px-7 py-2 font-medium transition select-none focus:outline-hidden focus-visible:ring-3"
          :class="
            light
              ? 'text-main-600 ring-main-300 bg-main-100 hover:bg-main-200 dark:bg-white/10 dark:text-white dark:ring-white dark:hover:bg-white/25'
              : 'bg-white/10 text-white ring-white hover:bg-white/25'
          "
        >
          {{ link.text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
