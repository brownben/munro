<template>
  <section class="w-full py-10 bg-white border-t md:py-12 border-main-100">
    <div
      class="flex flex-col items-center justify-between w-10/12 mx-auto md:flex-row-reverse lg:w-3/4 xl:w-2/3"
    >
      <div class="w-full mb-12 text-center md:w-1/2 md:text-left md:mb-0">
        <h2
          class="mb-2 text-4xl tracking-tight text-gray-900 xl:text-5xl font-heading leading-12 xl:leading-14"
        >
          Upload Results in
          <strong class="tracking-normal text-main-600">Seconds</strong>
        </h2>
        <h3 class="mb-2 text-2xl leading-8 text-gray-500 md:mb-3 font-heading">
          No Fuss. No Hassle. Results Created with Ease
        </h3>
        <router-link
          to="/upload/instructions"
          class="mx-0 mt-2 button no-expansion"
          >View Instructions</router-link
        >
      </div>

      <img
        class="w-2/3 md:w-5/12 xl:w-1/3"
        src="@/assets/images/UnDrawUpload.svg"
        alt="Person Bringing Files for Upload"
        loading="lazy"
      />
    </div>
  </section>
</template>
