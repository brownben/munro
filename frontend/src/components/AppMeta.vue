<template>
  <div class="hidden" />
</template>
<script setup lang="ts">
import { defineProps, watch } from 'vue'
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
    default: 'https://munro-leagues.herokuapp.com',
  },
  blockRobots: { type: Boolean, default: false },
})

watch(
  props,
  () =>
    useHead({
      title: props.title,
      meta: [
        { name: 'description', content: props.description },
        { property: 'og:title', content: props.title },
        { property: 'og:description', content: props.description },
        { property: 'og:url', content: props.url },
        { name: 'twitter:title', content: props.title },
        { name: 'twitter:description', content: props.description },
        { name: 'twitter:url', content: props.url },
        { itemprop: 'description', content: props.description },
        { name: 'robots', content: props.blockRobots ? 'noindex' : 'all' },
      ],
    }),
  { immediate: true }
)
</script>
