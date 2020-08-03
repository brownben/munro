<template>
  <section class="col-span-2 card">
    <h2 class="mb-2 text-2xl text-center font-heading">
      <p
        class="block w-8 h-8 mx-auto mb-1 text-lg font-bold leading-8 text-center align-middle border-2 rounded-full md:inline-block md:mr-3 border-main text-main font-heading"
      >
        {{ number }}
      </p>
      <slot name="title">
        {{ title }}
      </slot>
    </h2>

    <div
      class="w-full mx-auto text-lg leading-8 text-opacity-75 text-main-900 body"
    >
      <slot name="default" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    number: { type: Number, default: 1 },
    title: { type: String, default: '' },
  },
}
</script>

<style lang="postcss" scoped>
.body p {
  @apply mb-1 leading-6;

  &:last-of-type {
    @apply mb-2;
  }
}

.body img {
  @apply w-10/12 m-auto mt-6;

  @screen lg {
    @apply w-2/3;
  }
}

.body code {
  @apply my-4 font-mono bg-main-100 text-main-900 text-opacity-100 px-3 py-2 w-full block rounded-shape font-normal;
}
</style>
