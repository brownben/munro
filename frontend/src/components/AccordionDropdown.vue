<!--
  Accordion Dropdown

  Collapsable section to hold content. Originally made for the accordion menu.
  When clicked the content is revealed or hidden. The arrow indicates current status
    and spins between open and closed states
-->

<template>
  <div
    class="rounded-tl-lg rounded-br-lg shadow-md mt-3 mb-6 accordion bg-white"
  >
    <div class="accordion-head" @click="accordionOpen = !accordionOpen">
      <h2
        class="font-heading text-main text-2xl p-2 px-3 inline-block select-none"
      >
        {{ title }}
      </h2>
      <svg
        :class="{ rotate: accordionOpen }"
        class="fill-current text-main h-12 float-right p-2"
        viewBox="0 0 24 24"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    </div>
    <transition name="shrink">
      <div v-show="accordionOpen" key="1" class="accordion-body p-3 pt-0 pb-1">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  data: () => ({
    accordionOpen: false,
  }),
}
</script>

<style scoped>
svg {
  transition: 0.4s;
}
.accordion-body,
.accordion {
  transform-origin: top;
  transition: 0.4s;
  transform: 0.4s;
}
.rotate {
  transform: rotate(180deg);
}
.shrink-enter,
.shrink-leave-to {
  transform: scaleY(0);
}
</style>
