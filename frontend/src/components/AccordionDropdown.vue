<!--
  Accordion Dropdown

  Collapsable section to hold content. Originally made for the accordion menu.
  When clicked the content is revealed or hidden. The arrow indicates current status
    and spins between open and closed states
-->

<template>
  <div class="mt-3 mb-6 bg-white rounded-shape-xl my-shadow accordion">
    <div class="accordion-head" @click="accordionOpen = !accordionOpen">
      <h2
        class="inline-block h-12 p-2 px-4 text-2xl select-none font-heading text-main"
      >
        {{ title }}
      </h2>
      <svg
        :class="{ rotate: accordionOpen }"
        class="float-right h-12 p-2 fill-current text-main"
        viewBox="0 0 24 24"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    </div>
    <transition name="shrink">
      <div v-show="accordionOpen" key="1" class="p-3 pt-0 pb-1 accordion-body">
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

<style>
.my-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

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
