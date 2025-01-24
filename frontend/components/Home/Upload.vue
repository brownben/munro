<template>
  <aside class="bg-main-800 text-main-600 dark:bg-main-900 relative">
    <svg aria-hidden="true" class="absolute inset-0 z-0 h-full w-full">
      <defs>
        <pattern
          id=":Rb6:"
          width="90"
          height="30"
          patternUnits="userSpaceOnUse"
          x="50%"
          patternTransform="translate(0 80)"
        >
          <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#:Rb6:)"></rect>
    </svg>
    <div
      class="relative z-10 mx-auto max-w-(--breakpoint-lg) gap-8 px-6 py-10 sm:py-14 lg:px-8"
    >
      <h2
        class="text-4xl leading-none font-black tracking-tight text-white sm:text-5xl"
      >
        Stop fighting spreadsheets
      </h2>
      <p class="text-main-50 mt-4 text-lg leading-snug">
        Upload results in seconds. No fuss, no hassle, just works.
      </p>
      <NuxtLink
        to="/upload/instructions"
        class="mt-8 inline-block font-medium text-white"
        no-prefetch
      >
        See how simple it is →
      </NuxtLink>
    </div>
  </aside>
</template>
