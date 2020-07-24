<template>
  <section class="col-span-2 card">
    <p class="text-lg font-heading">
      <span
        class="inline-flex items-center justify-center w-8 h-8 mr-2 font-bold text-center align-middle border-2 rounded-full border-main text-main font-heading font-lg"
      >
        {{ number }}
      </span>
      <span class="align-middle">
        <slot name="instruction" />
      </span>
    </p>

    <div class="text-opacity-75 text-main-900">
      <slot name="body" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    number: { type: Number, default: 1 },
  },
}
</script>

<style lang="postcss" scoped>
img {
  @apply mt-2;
}

p {
  @apply my-2;
}

img {
  @apply w-10/12 m-auto mt-6;
}

code {
  @apply mt-4 font-mono bg-main-100 text-main-900 text-opacity-100 p-3 w-full block;
}
</style>
