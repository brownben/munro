<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <nav class="bg-white font-heading">
    <div class="max-w-screen-xl px-2 mx-auto sm:px-6 lg:px-8">
      <div class="relative z-40 flex items-center justify-between h-16">
        <div
          class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between"
        >
          <div class="flex-shrink-0">
            <router-link
              to="/"
              class="flex flex-row items-center"
              aria-label="Home"
              @click.native="menuOpen = false"
            >
              <svg
                viewBox="0 0 301 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block w-10 h-8 sm:w-20 md:w-10"
                alt="Munro Logo (Mountains Shaped as M)"
              >
                <path
                  d="M300.058 259.827L260.933 0L89.3914 259.82L300.058 259.827Z"
                  fill="currentColor"
                  class="text-main-600"
                />
                <path
                  d="M0.107626 259.827C-2.37174 256.108 38.7722 1.93888 42.4875 3.80219C46.2027 5.66549 200.744 259.827 200.744 259.827H0.107626Z"
                  fill="currentColor"
                  class="text-main-500"
                />
              </svg>
              <h1
                class="hidden ml-1 -mb-4 text-3xl leading-7 md:inline-block font-heading text-main-500"
              >
                unro
              </h1>
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex">
              <router-link
                v-for="link of links"
                :key="link.location"
                :to="link.location"
                class="px-3 py-2 ml-4 font-medium leading-5 transition duration-150 ease-in-out rounded-shape focus:outline-none"
                :class="
                  $route.path === link.location
                    ? 'text-main-600 bg-main-100'
                    : 'hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600 text-gray-500'
                "
              >
                {{ link.text }}
              </router-link>
              <router-link
                v-if="$auth.user"
                to="/logout"
                class="px-3 py-2 ml-4 font-medium leading-5 text-gray-500 transition duration-150 ease-in-out rounded-shape focus:outline-none hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600"
              >
                Logout
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-shape hover:text-main-600 hover:bg-main-100 focus:outline-none focus:bg-main-100 focus:text-main-600"
            aria-label="Main menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <!-- Icon when menu is closed. -->
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              :class="menuOpen ? 'hidden' : 'block'"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              :class="menuOpen ? 'block' : 'hidden'"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <transition
      enter-active-class="transition duration-100 ease-out origin-top transform"
      enter-from-class="scale-y-90 opacity-75"
      enter-to-class="scale-y-100 opacity-100"
      leave-active-class="transition duration-75 ease-in origin-top transform"
      leave-from-class="scale-y-100 opacity-100"
      leave-to-class="scale-y-90 opacity-75"
    >
      <div
        v-show="menuOpen"
        class="absolute z-30 flex flex-col justify-center w-full pt-16 -mt-16 bg-white shadow sm:hidden"
      >
        <div class="px-2 pt-2 pb-3 text-left">
          <router-link
            v-for="link of links"
            :key="link.location"
            :to="link.location"
            class="block px-3 py-2 mt-1 text-lg font-medium text-gray-500 transition duration-150 ease-in-out rounded-shape focus:outline-none hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600"
            :class="
              $route.path === link.location ? 'text-main-600 bg-main-100' : null
            "
            @click.native="menuOpen = false"
          >
            {{ link.text }}
          </router-link>
          <router-link
            v-if="$auth.user"
            to="/logout"
            class="block px-3 py-2 mt-1 text-lg font-medium text-gray-500 transition duration-150 ease-in-out rounded-shape focus:outline-none hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600"
            @click.native="menuOpen = false"
          >
            Logout
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      auth: this.$auth,
      menuOpen: false,

      links: [
        { text: 'Leagues', location: '/leagues' },
        { text: 'Latest Results', location: '/latest-results' },
        { text: 'Upload Results', location: '/upload' },
      ],
    }
  },
}
</script>
<style lang="postcss" scoped>
.h-full--16 {
  height: calc(100% - 4rem);
}
</style>
