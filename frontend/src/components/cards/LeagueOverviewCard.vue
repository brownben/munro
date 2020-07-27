<template>
  <section
    class="flex flex-col items-center justify-around col-span-2 px-4 pt-6 pb-4 text-center bg-white shadow-md md:col-span-1 md:px-3 xl:px-4 rounded-shape-xl"
    :class="{ 'px-6': larger }"
  >
    <slot />
    <h2
      class="mt-2 mb-4 text-2xl font-bold leading-6 xl:text-25xl font-heading text-main-900"
      :class="{ 'text-3xl md:text-35xl leading-8 mb-3': larger }"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mb-2 leading-5 text-opacity-75 text-main-900 font-heading"
      :class="{ 'text-lg leading-6': larger }"
    >
      {{ description }}
    </p>

    <router-link
      class="mt-3 button"
      :class="{ 'mt-2': larger }"
      :to="alternativeLink || `/leagues/${title}`"
      >{{ buttonText }}</router-link
    >
  </section>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
    alternativeLink: { type: String, default: '' },
    buttonText: { type: String, default: 'View League' },
    larger: { type: Boolean, default: true },
  },
}
</script>
