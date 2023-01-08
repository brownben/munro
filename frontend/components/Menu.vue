<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  XMarkIcon as CloseIcon,
  Bars3Icon as HamburgerMenuIcon,
} from '@heroicons/vue/24/outline/index.js'

import MunroLogo from './MunroLogo.vue'

const router = useRouter()
const loggedIn = useLoggedIn()

const logout = () => {
  logoutRequest()
  router.push('/')
}

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
  <Menu>
    <nav class="bg-white print:hidden">
      <div class="mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
        <div class="relative z-40 flex h-16 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between"
          >
            <div class="flex-shrink-0">
              <NuxtLink
                to="/"
                class="flex flex-row items-center rounded-md px-1 pb-1 ring-main-200 focus:outline-none focus-visible:ring"
                aria-label="Home"
              >
                <MunroLogo class="inline-block h-8 w-10 sm:w-20 md:w-10" />
                <p
                  class="ml-1 mb-[-0.65rem] hidden text-[1.65rem] font-semibold text-main-600 md:inline-block"
                >
                  <span class="sr-only">M</span>unro
                </p>
              </NuxtLink>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex gap-4 sm:gap-2 md:gap-4">
                <NuxtLink
                  v-for="link of links"
                  :key="link?.location"
                  :to="link?.location"
                  class="leading-12 items-center justify-center rounded px-3 py-1 leading-6 text-gray-500 ring-main-200 transition hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:outline-none focus-visible:ring"
                  active-class="text-main-700 bg-main-100"
                >
                  {{ link?.text }}
                </NuxtLink>
                <button
                  v-if="loggedIn"
                  class="leading-12 items-center justify-center rounded px-3 py-1 leading-6 text-gray-500 ring-main-200 transition hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:outline-none focus-visible:ring"
                  @click="logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <MenuButton
              v-slot="{ open }"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 ring-main-200 transition duration-150 ease-in-out hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:outline-none focus-visible:ring"
            >
              <span class="sr-only">Open main menu</span>

              <HamburgerMenuIcon v-if="!open" class="h-6 w-6" />
              <CloseIcon v-else class="h-6 w-6" />
            </MenuButton>
          </div>
        </div>
        <transition
          enter-active-class="duration-75 ease-out origin-top motion-safe:transition motion-reduce:transform-none"
          enter-from-class="scale-y-90 opacity-75"
          enter-to-class="scale-y-100 opacity-100"
          leave-active-class="duration-75 ease-in origin-top motion-safe:transition motion-reduce:transform-none"
          leave-from-class="scale-y-100 opacity-100"
          leave-to-class="scale-y-90 opacity-75"
        >
          <MenuItems
            class="absolute left-0 z-30 -mt-16 flex w-full flex-col justify-center bg-white pt-16 shadow outline-none sm:hidden"
          >
            <div class="px-2 pt-2 pb-3 text-left">
              <MenuItem
                v-for="link of links"
                :key="link.location"
                v-slot="{ active, close }"
              >
                <NuxtLink
                  :to="link.location"
                  class="mt-1 block rounded-md px-3 py-2 font-normal text-gray-500 ring-main-200 transition duration-150 ease-in-out hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:outline-none focus-visible:ring"
                  :class="active && 'bg-main-100 text-main-700'"
                  active-class="text-main-700 bg-main-100"
                  @click="close"
                >
                  {{ link.text }}
                </NuxtLink>
              </MenuItem>
              <MenuItem v-if="loggedIn" v-slot="{ active }">
                <button
                  class="mt-1 block w-full rounded-md px-3 py-2 text-left text-gray-500 ring-main-200 transition duration-150 ease-in-out hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus:outline-none focus-visible:ring"
                  :class="active && 'bg-main-100 text-main-700'"
                  @click="logout"
                >
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </div>
    </nav>
  </Menu>
</template>
