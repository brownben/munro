<template>
  <section class="w-full pt-10 pb-8 text-white bg-main-500 md:py-12">
    <div
      class="flex flex-col-reverse items-center justify-around w-11/12 mx-auto md:flex-row md:w-10/12 xl:max-w-screen-xl"
    >
      <div class="w-full mt-12 text-center md:w-1/2 md:text-left md:m-0">
        <h2
          class="text-2xl tracking-tight text-white md:mb-2 lg:text-3xl font-heading"
        >
          Made for Orienteering
        </h2>
        <h2
          class="text-4xl tracking-tight text-white md:leading-tight md:mb-2 md:text-5xl font-heading"
        >
          <strong class="font-bold tracking-normal">Perfect</strong> for All
          Leagues
        </h2>
        <router-link
          to="/about"
          class="inline-block w-auto px-4 py-1 mx-0 mt-1 text-white transition duration-300 ease-in-out outline-none appearance-none select-none md:mt-2 md:text-lg bg-main-600 font-heading rounded-shape hover:bg-main-700"
        >
          Introducing Munro
        </router-link>
      </div>

      <img
        class="h-64 md:h-56 lg:h-64"
        src="/@/assets/images/UnDrawOFlagWhite.svg"
        alt="Orienteering Flag in Front of Trees and Hills"
        loading="lazy"
      />
    </div>
  </section>
</template>
