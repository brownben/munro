<template>
  <footer
    v-if="!$route.path.includes('/embed/')"
    class="py-6 font-sans text-center bg-white border-t md:py-8 xl:py-10 border-main-100"
  >
    <div class="w-full mb-6 text-center">
      <a
        href="https://twitter.com/MunroLeagues"
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
      >
        <svg
          class="box-content inline-block h-6 p-1 mx-2 transition duration-300 rounded-full bg-main-100 text-main-700 hover:bg-main-200 hover:text-main-800 focus:bg-main-200 focus:text-main-800"
          viewBox="0 0 400 400"
          aria-label="Twitter"
        >
          <path
            fill="currentColor"
            d="M153.6,301.6c94.3,0,145.9-78.2,145.9-145.9c0-2.2,0-4.4-0.1-6.6c10-7.2,18.7-16.3,25.6-26.6
			c-9.2,4.1-19.1,6.8-29.5,8.1c10.6-6.3,18.7-16.4,22.6-28.4c-9.9,5.9-20.9,10.1-32.6,12.4c-9.4-10-22.7-16.2-37.4-16.2
			c-28.3,0-51.3,23-51.3,51.3c0,4,0.5,7.9,1.3,11.7c-42.6-2.1-80.4-22.6-105.7-53.6c-4.4,7.6-6.9,16.4-6.9,25.8
			c0,17.8,9.1,33.5,22.8,42.7c-8.4-0.3-16.3-2.6-23.2-6.4c0,0.2,0,0.4,0,0.7c0,24.8,17.7,45.6,41.1,50.3c-4.3,1.2-8.8,1.8-13.5,1.8
			c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.4,25.5,35.2,47.9,35.6c-17.6,13.8-39.7,22-63.7,22c-4.1,0-8.2-0.2-12.2-0.7
			C97.7,293.1,124.7,301.6,153.6,301.6"
          />
        </svg>
      </a>
      <a
        href="https://github.com/brownben/munro"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
      >
        <svg
          class="box-content inline-block h-4 p-2 mx-2 transition duration-300 rounded-full bg-main-100 text-main-700 hover:bg-main-200 hover:text-main-800 focus:bg-main-200 focus:text-main-800"
          aria-label="Github"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      </a>
    </div>
    <div class="md:mt-1">
      <p class="block text-base text-gray-600 font-heading">
        Created By
        <a
          href="https://benbrown.dev"
          class="font-bold transition duration-300 text-main-700 hover:text-main-800 focus:text-main-800"
        >
          Ben Brown
        </a>
      </p>

      <router-link
        v-if="!$store.getters.loggedIn"
        to="/login"
        class="text-sm text-gray-500 transition duration-300 hover:text-main-700 focus:text-main-700 font-heading"
      >
        Admin Login
      </router-link>
      <router-link
        v-else
        to="/logout"
        class="text-sm text-gray-500 transition duration-300 hover:text-main-700 focus:text-main-700 font-heading"
      >
        Logout
      </router-link>
      <p class="inline-block text-sm text-gray-400 font-heading">&bull;</p>
      <a
        href="mailto:munro.leagues@gmail.com"
        class="text-sm text-gray-500 transition duration-300 hover:text-main-700 focus:text-main-700 font-heading"
      >
        Contact
      </a>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>
