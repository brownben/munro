<template>
  <header>
    <div
      class="mx-auto flex max-w-(--breakpoint-lg) flex-col items-center gap-10 px-8 py-6 sm:flex-row sm:py-10 md:py-14 lg:px-8 lg:py-20"
    >
      <div class="lg:-mt-4">
        <h1
          class="text-center text-4xl font-black tracking-tight text-gray-600 sm:text-left md:text-5xl dark:text-gray-200"
        >
          League Results.
          <span
            class="text-main-600 block text-6xl sm:inline-block sm:text-7xl"
          >
            Sorted.
          </span>
        </h1>
        <NuxtLink
          to="/leagues"
          class="hover:text-main-600 focus:text-main-600 dark:hover:text-main-500 dark:focus:text-main-400 mt-6 hidden text-gray-500 lg:inline-block dark:text-gray-300"
        >
          View All Leagues →
        </NuxtLink>
      </div>
      <HomeHeroImage class="w-full md:w-1/2" />
    </div>
    <HomeLogoCloud />
  </header>
</template>
