<script setup lang="ts">
import type { PropType } from 'vue'

interface Link {
  text: string
  location: string
}

defineProps({
  links: { type: Array as PropType<Link[]>, required: true },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <section
    class="w-full print:hidden"
    :class="{
      'from-main-500 to-main-700 dark:from-main-700 dark:to-main-900 bg-linear-to-r':
        !dark,
      'bg-main-800': dark,
    }"
  >
    <div
      class="mx-auto flex max-w-(--breakpoint-lg) flex-col justify-between gap-8 px-6 py-8 lg:px-8"
      :class="{ 'md:flex-row md:py-12': links.length <= 4 }"
    >
      <h2 class="text-2xl font-bold text-white"><slot /></h2>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="link in links"
          :key="link.location"
          :to="link.location"
          class="ring-opacity-40 flex items-center justify-center rounded-md bg-white/10 px-7 py-2 font-medium text-white ring-white transition select-none hover:bg-white/25 focus:outline-hidden focus-visible:ring-3"
        >
          {{ link.text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
