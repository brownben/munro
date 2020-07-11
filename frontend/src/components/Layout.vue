<template>
  <div class="w-10/12 mx-auto md:w-3/4 xl:w-2/3 md:mt-2">
    <h1
      v-if="title"
      class="my-2 text-3xl font-bold md:text-35xl font-heading text-main-700"
    >
      {{ title }}
    </h1>
    <div
      class="grid grid-cols-2 gap-8 mb-4 md:gap-6 lg:gap-8"
      :class="{ gapSmall: gapSmall }"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    gapSmall: { type: Boolean, default: false },
  },
}
</script>
<style lang="postcss" scoped>
.gapSmall {
  grid-gap: 1.25rem !important;
}
</style>
