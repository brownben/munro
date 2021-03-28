<template>
  <div class="hidden" />
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useHead } from '@vueuse/head'

const props = defineProps({
  title: { type: String, default: 'Munro' },
  description: {
    type: String,
    default:
      'League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options',
  },
  url: {
    type: String,
    default: 'https://munroleagues.com',
  },
  blockRobots: { type: Boolean, default: false },
})

useHead({
  title: computed(() => props.title),
  meta: [
    { name: 'description', content: computed(() => props.description) },
    { property: 'og:title', content: computed(() => props.title) },
    { property: 'og:description', content: computed(() => props.description) },
    { property: 'og:url', content: computed(() => props.url) },
    { name: 'twitter:title', content: computed(() => props.title) },
    { name: 'twitter:description', content: computed(() => props.description) },
    { name: 'twitter:url', content: computed(() => props.url) },
    { itemprop: 'description', content: computed(() => props.description) },
    {
      name: 'robots',
      content: computed(() => (props.blockRobots ? 'noindex' : 'all')),
    },
  ],
})
</script>
