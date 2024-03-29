<template>
  <footer
    class="text-text w-full border-t border-gray-100 bg-gray-50 py-8 text-center"
  >
    <social-links class="mb-6 flex justify-center gap-4 text-gray-600">
      <a
        href="https://github.com/brownben/munro"
        class="rounded-full bg-gray-200 p-2 outline-none ring-main-300 transition hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-700 focus:ring-2"
      >
        <IconGitHub class="h-4 w-4" />
        <span class="sr-only">GitHub</span>
      </a>
      <a
        href="https://www.threads.net/@munroleagues"
        class="rounded-full bg-gray-200 p-2 outline-none ring-main-300 transition hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-700 focus:ring-2"
      >
        <IconThreads class="h-4" />
        <span class="sr-only">Threads</span>
      </a>
    </social-links>

    <p class="text-gray-600">
      Created by
      <a
        href="https://benbrown.dev"
        class="font-bold text-gray-700 outline-main-600 hover:text-main-700 focus:text-main-700"
      >
        Ben Brown
      </a>
    </p>
    <p class="text-sm text-gray-500">
      <NuxtLink
        :to="`/login?redirect=${$route.fullPath}`"
        class="outline-main-600 hover:text-main-600 focus:text-main-600"
      >
        Admin Login
      </NuxtLink>
      <span aria-hidden="true" class="select-none opacity-30"> &bull; </span>
      <a
        href="mailto:munro.leagues@gmail.com"
        class="outline-main-600 hover:text-main-600 focus:text-main-600"
      >
        Contact
      </a>
    </p>
  </footer>
</template>
