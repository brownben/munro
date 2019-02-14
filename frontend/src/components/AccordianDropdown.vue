<!--
  Accordian Dropdown

  Collapsable section to hold content. Originally made for the filter menu.
  When clicked the content is revealed or hidden. The arrow indicates current status
    and spins between open and closed states
-->

<template>
  <div id="filter">
    <div class="filter-head" @click="filterOpen = !filterOpen">
      <h2>{{ title }}</h2>
      <svg :class="{rotate:filterOpen}" viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        <path fill="none" d="M0 0h24v24H0V0z"></path>
      </svg>
    </div>
    <transition name="shrink">
      <div v-if="filterOpen" key="1" class="filter-body">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    'title': {
      type: String,
      default: 'Title',
    },
  },
  data: () => ({
    filterOpen: false,
  }),
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

#filter
  margin-bottom: 1.5rem

  .filter-head
    box-sizing: border-box
    padding: 0.4rem
    background-color: purple-300

    h2
      display: inline
      color: white

    svg
      float: right
      height: 2rem
      transition: 0.3s
      fill: white

  .filter-body
    display: flex
    flex-flow: row wrap
    justify-content: space-around
    overflow: hidden
    overflow-y: hidden
    box-sizing: border-box
    padding: 0.75rem
    width: 100%
    border: 1px solid purple-300
    transition: transform 0.4s ease-in-out
    transform-origin: top

.rotate
  transform: rotate(180deg)

.shrink-enter, .shrink-leave-to
  transform: scaleY(0)
</style>
