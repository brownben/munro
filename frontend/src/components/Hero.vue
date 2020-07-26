<template>
  <div class="relative z-0 w-full pt-16 -mt-16">
    <section
      class="flex-row-reverse items-center justify-between w-full pt-4 pb-12 mx-auto text-center md:flex md:w-10/12 md:text-left xl:w-3/4 2xl:w-2/3"
    >
      <div
        class="w-full py-4 mx-auto mb-8 select-none md:m-0 sm:mb-10 sm:w-3/4 md:w-1/2"
      >
        <img
          src="@/assets/images/RunnerLeagueTable.svg"
          alt="Man Running In Front of Hills, with League Table In Front Of Him"
          class="w-full"
        />
      </div>

      <div>
        <h2
          class="leading-10 tracking-tight md:leading-12 text-45xl sm:text-55xl md:text-5xl lg:text-55xl xl:text-6xl text-main-800 font-heading"
        >
          League Results.
        </h2>
        <h2
          class="text-5xl font-bold sm:text-6xl md:text-55xl lg:text-6xl xl:text-7xl text-main-500 font-heading"
        >
          Sorted.
        </h2>
        <router-link
          to="/leagues"
          class="mx-0 mt-2 md:mt-3 xl:mt-4 button no-expansion"
        >
          View All Leagues
        </router-link>
      </div>
    </section>
  </div>
</template>
