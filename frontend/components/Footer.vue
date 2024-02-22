<script setup lang="ts">
const router = useRouter()
const loggedIn = useLoggedIn()

const logout = () => {
  logoutRequest()
  router.push('/')
}
</script>
<template>
  <footer
    class="font-heading border-t border-gray-100 bg-gray-50 py-6 text-center md:py-8 xl:py-10 print:hidden"
  >
    <div class="mb-6 w-full text-center xl:mb-8">
      <a
        href="https://github.com/brownben/munro"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        class="group focus-visible:ring-0"
      >
        <span class="sr-only">GitHub</span>
        <svg
          class="mx-2 box-content inline-block h-4 rounded-full bg-gray-200 p-2 text-gray-600 ring-main-300 transition duration-300 hover:bg-main-200 hover:text-main-700 group-focus:bg-main-200 group-focus:text-main-700 group-focus-visible:ring"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      </a>
      <a
        href="https://elk.zone/mas.to/@munroleagues"
        target="_blank"
        rel="noopener noreferrer"
        title="Mastodon"
        class="group focus-visible:ring-0"
      >
        <span class="sr-only">Mastodon</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="mx-2 box-content inline-block h-4 rounded-full bg-gray-200 p-2 text-gray-600 ring-main-300 transition duration-300 hover:bg-main-200 hover:text-main-700 group-focus:bg-main-200 group-focus:text-main-700 group-focus-visible:ring"
        >
          <path
            fill="currentColor"
            d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764.442.505.661 1.187.661 2.046v4.203z"
          />
        </svg>
      </a>
    </div>
    <div class="md:mt-1">
      <p class="block text-gray-600">
        Created By
        <a
          href="https://benbrown.dev"
          class="text-base font-extrabold text-gray-700 transition duration-300 hover:text-main-700 focus:text-main-700"
        >
          Ben Brown
        </a>
      </p>

      <router-link
        v-if="!loggedIn"
        :to="`/login?redirect=${$route.fullPath}`"
        class="text-sm text-gray-500 transition duration-300 hover:text-main-600 focus:text-main-700"
      >
        Admin Login
      </router-link>
      <button
        v-else
        class="mr-1 text-sm text-gray-500 transition duration-300 hover:text-main-600 focus:text-main-700"
        @click="logout"
      >
        Logout
      </button>
      <p class="inline-block text-sm text-gray-400" aria-hidden="true">
        &bull;
      </p>
      <a
        href="mailto:munro.leagues@gmail.com"
        class="text-sm text-gray-500 transition duration-300 hover:text-main-600 focus:text-main-700"
      >
        Contact
      </a>
    </div>
  </footer>
</template>
