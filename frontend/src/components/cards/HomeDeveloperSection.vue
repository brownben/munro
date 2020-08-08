<template>
  <section class="w-full py-10 border-t bg-gray-50 md:py-12 border-main-100">
    <div
      class="flex flex-col-reverse items-center justify-between w-10/12 mx-auto md:flex-row lg:w-3/4 xl:w-2/3"
    >
      <div class="w-full text-center md:mb-12 md:w-1/2 md:text-left md:m-0">
        <h2
          class="mb-2 text-4xl tracking-tight xl:text-5xl text-main-800 font-heading leading-12 xl:leading-14"
        >
          Just How
          <strong class="tracking-normal text-main-700">You</strong> Want It
        </h2>
        <h3 class="mt-3 text-2xl leading-8 text-gray-500 font-heading">
          Sort and Filter the Results
        </h3>
        <h3 class="mb-2 text-2xl leading-8 text-gray-500 md:mb-3 font-heading">
          or Build Your Own Way to View Results
        </h3>
        <router-link to="/developers" class="mx-0 mt-2 button no-expansion"
          >View API Docs</router-link
        >
      </div>
      <div class="mb-12 md:mb-0">
        <img
          class="w-2/3 mx-auto xl:w-7/12"
          src="@/assets/images/Crane.svg"
          alt="Crane Building Website"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
