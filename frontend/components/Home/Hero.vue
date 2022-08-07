<template>
  <header>
    <div
      class="mx-auto flex max-w-screen-lg flex-col items-center gap-10 px-8 py-6 sm:flex-row sm:py-10 md:py-14 lg:px-8 lg:py-20"
    >
      <div class="lg:-mt-4">
        <h1
          class="text-center text-4xl font-black tracking-tight text-gray-600 sm:text-left md:text-5xl"
        >
          League Results.
          <span
            class="block text-6xl text-main-600 sm:inline-block sm:text-7xl"
          >
            Sorted.
          </span>
        </h1>
        <NuxtLink
          to="/leagues"
          class="mt-6 hidden text-gray-500 hover:text-main-600 focus:text-main-600 lg:inline-block"
        >
          View All Leagues →
        </NuxtLink>
      </div>
      <HomeHeroImage class="w-full md:w-1/2" />
    </div>
    <HomeLogoCloud />
  </header>
</template>
