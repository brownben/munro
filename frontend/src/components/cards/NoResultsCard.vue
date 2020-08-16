<template>
  <section class="mt-2 text-center card">
    <div class="inline-block w-full my-6">
      <img
        src="/@/assets/images/UndrawLost.svg"
        class="inline-block object-contain w-full mx-auto max-h-64"
        alt="Person Lost looking at Map"
      />
    </div>

    <h1
      class="mt-8 text-3xl font-bold leading-tight text-gray-900 font-heading"
    >
      {{ text }}
    </h1>
    <h2
      v-if="secondaryText"
      class="my-3 text-lg leading-tight text-gray-600 font-heading"
    >
      {{ secondaryText }}
    </h2>
  </section>
</template>
<script>
export default {
  props: {
    text: { type: String, default: "Sorry, I Couldn't Find Any Results" },
    secondaryText: { type: String, default: '' },
  },
}
</script>
<style lang="postcss" scoped>
img {
  max-height: 14rem;
}
</style>
