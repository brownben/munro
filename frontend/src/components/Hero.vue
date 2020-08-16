<template>
  <div class="relative z-10 w-full bg-white">
    <section
      class="flex-row-reverse items-center justify-between w-full pt-4 pb-12 mx-auto text-center font-heading md:flex md:w-10/12 md:text-left xl:max-w-screen-xl xl:px-12"
    >
      <div
        class="w-full py-4 mx-auto mb-8 select-none md:m-0 sm:mb-10 sm:w-3/4 md:w-1/2"
      >
        <img
          src="/@/assets/images/RunnerLeagueTable.svg"
          alt="Man Running In Front of Hills, with League Table In Front Of Him"
          class="w-full"
        />
      </div>

      <div>
        <h2
          class="text-4xl leading-tight tracking-tight text-main-800 md:text-5xl xl:text-6xl"
        >
          League Results.
        </h2>
        <h2 class="text-5xl font-bold text-main-500 sm:text-6xl lg:text-7xl">
          Sorted.
        </h2>
        <router-link
          to="/leagues"
          class="mx-0 mt-2 md:mt-4 button no-expansion"
        >
          View All Leagues
        </router-link>
      </div>
    </section>
  </div>
</template>
