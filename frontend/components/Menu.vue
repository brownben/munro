<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverOverlay,
} from '@headlessui/vue'
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline'

interface Link {
  text: string
  location: string
}
const links: Link[] = [
  { text: 'Leagues', location: '/leagues' },
  { text: 'Latest Results', location: '/latest-results' },
  { text: 'Upload Results', location: '/upload' },
]
</script>

<template>
  <Popover as="nav" class="select-none bg-white dark:bg-gray-900 print:hidden">
    <top-bar
      class="relative z-50 mx-auto flex max-w-screen-lg flex-1 items-center justify-center px-2 py-3 sm:items-stretch sm:justify-between sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="ring-primary flex flex-shrink-0 flex-row items-end rounded outline-none ring-offset-2 focus-visible:ring"
        aria-label="Home"
      >
        <Logo class="inline-block h-8 w-10" />
        <p
          class="mb-[-0.55rem] ml-1 hidden text-[1.65rem] font-semibold text-main-600 md:block dark:text-main-600"
        >
          <span class="sr-only">M</span>unro
        </p>
      </NuxtLink>

      <desktop-links class="hidden gap-4 sm:ml-6 sm:flex sm:gap-2 md:gap-4">
        <NuxtLink
          v-for="link of links"
          :key="link?.location"
          :to="link?.location"
          class="leading-12 outline-primary items-center justify-center rounded px-3 py-1 leading-6 text-gray-500 transition hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:bg-gray-700 dark:focus:text-gray-100"
          active-class="bg-main-100 text-main-700 dark:bg-gray-700 dark:text-gray-100"
        >
          {{ link?.text }}
        </NuxtLink>
      </desktop-links>

      <div class="absolute inset-y-0 right-0 flex items-center px-2 sm:hidden">
        <PopoverButton
          v-slot="{ open }"
          class="ring-primary-light items-center justify-center rounded p-2 text-gray-500 outline-none ring-main-500 transition hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:ring-2 dark:text-gray-200 dark:ring-offset-gray-800 dark:hover:bg-gray-700 dark:hover:text-main-600 dark:focus:bg-gray-700 dark:focus:text-main-600"
        >
          <span class="sr-only">Open main menu</span>

          <Bars3Icon v-if="!open" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </PopoverButton>
      </div>
    </top-bar>
    <PopoverOverlay class="fixed inset-0 top-20 z-40" />
    <transition
      enter-active-class="duration-200 transform ease-in-out origin-top motion-safe:transition origin-top"
      enter-from-class="scale-y-75 opacity-0"
      enter-to-class="scale-y-100 opacity-100"
      leave-active-class="duration-200 transform ease-in-out origin-top motion-safe:transition origin-top"
      leave-from-class="scale-y-100 opacity-100"
      leave-to-class="scale-y-75 opacity-0"
    >
      <PopoverPanel
        v-slot="{ close }"
        class="absolute z-50 flex w-full flex-col gap-1 rounded-b-md bg-white p-2 pt-0 shadow-md dark:bg-gray-900 dark:shadow-gray-800"
      >
        <NuxtLink
          v-for="link of links"
          :key="link?.location"
          :to="link?.location"
          class="outline-primary block w-full items-center justify-center rounded-md p-2 text-left text-gray-500 transition hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:bg-gray-700 dark:focus:text-gray-100"
          active-class="bg-main-100 text-main-700 dark:bg-gray-700 dark:text-gray-100"
          @click="close"
        >
          {{ link?.text }}
        </NuxtLink>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
