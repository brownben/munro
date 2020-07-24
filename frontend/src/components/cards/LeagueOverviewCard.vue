<template>
  <section
    class="flex flex-col items-center justify-around col-span-2 px-4 py-4 text-center bg-white shadow-md md:col-span-1 md:px-3 xl:px-4 rounded-shape-xl"
  >
    <slot />
    <h2 class="my-2 text-2xl font-bold xl:text-25xl font-heading text-main-900">
      {{ title }}
    </h2>
    <p>
      {{ description }}
    </p>
    <p v-if="website">
      More information can be found on their
      <a
        :href="website"
        target="_blank"
        rel="noopener noreferrer"
        class="link text-main-700"
      >
        website
      </a>
    </p>
    <router-link
      class="mt-4 button"
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
  },
}
</script>
