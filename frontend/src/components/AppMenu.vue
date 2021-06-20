<template>
  <Menu>
    <nav class="bg-white font-heading print:hidden">
      <div class="max-w-screen-xl px-2 mx-auto sm:px-6 lg:px-8">
        <div class="relative z-40 flex items-center justify-between h-16">
          <div
            class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between"
          >
            <div class="flex-shrink-0">
              <router-link
                to="/"
                class="flex flex-row items-center px-1 pb-1 rounded-shape focus-visible:shadow-outline"
                aria-label="Home"
              >
                <MunroLogo class="inline-block w-10 h-8 sm:w-20 md:w-10" />
                <h1
                  class="hidden ml-1 -mb-4 text-3xl leading-7 md:inline-block font-heading text-main-600"
                >
                  <span class="sr-only">M</span>unro
                </h1>
              </router-link>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex">
                <router-link
                  v-for="link of links"
                  :key="link?.location"
                  :to="link?.location"
                  class="px-3 py-2 ml-4 font-medium leading-5 text-gray-500 transition duration-150 ease-in-out rounded-shape hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus-visible:shadow-outline"
                  active-class="text-main-700 bg-main-100"
                >
                  {{ link?.text }}
                </router-link>
                <router-link
                  v-if="auth.loggedIn"
                  to="/logout"
                  class="px-3 py-2 ml-4 font-medium leading-5 text-gray-500 transition duration-150 ease-in-out rounded-shape hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700 focus-visible:shadow-outline"
                >
                  Logout
                </router-link>
              </div>
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <MenuButton
              v-slot="{ open }"
              class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-shape hover:text-main-700 hover:bg-main-100 focus:outline-none focus:bg-main-100 focus:text-main-700"
            >
              <span class="sr-only">Open main menu</span>

              <HamburgerMenuIcon v-if="!open" class="w-6 h-6" />
              <CloseIcon v-else class="w-6 h-6" />
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
            class="absolute left-0 z-30 flex flex-col justify-center w-full pt-16 -mt-16 bg-white shadow outline-none sm:hidden"
          >
            <div class="px-2 pt-2 pb-3 text-left">
              <MenuItem
                v-for="link of links"
                :key="link?.location"
                v-slot="{ active }"
              >
                <router-link
                  :to="link?.location"
                  class="block px-3 py-2 mt-1 text-lg font-medium text-gray-500 transition duration-150 ease-in-out rounded-shape focus:outline-none hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700"
                  :class="active && 'text-main-600 bg-main-100'"
                  active-class="text-main-700 bg-main-100"
                >
                  {{ link?.text }}
                </router-link>
              </MenuItem>
              <MenuItem v-if="auth.loggedIn">
                <router-link
                  to="/logout"
                  class="block px-3 py-2 mt-1 text-lg font-medium text-gray-500 transition duration-150 ease-in-out rounded-shape focus:outline-none hover:bg-main-100 hover:text-main-700 focus:bg-main-100 focus:text-main-700"
                >
                  Logout
                </router-link>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </div>
    </nav>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthentication } from '../store/authentication'

import MunroLogo from './images/MunroLogo.vue'
import HamburgerMenuIcon from './images/HamburgerMenu.vue'
import CloseIcon from './images/Close.vue'

const auth = useAuthentication()

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
