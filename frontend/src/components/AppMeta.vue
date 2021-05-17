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
  image: {
    type: String,
    default: 'https://munroleagues.com/MunroLogo-Social.png',
  },
  imageAlt: {
    type: String,
    default: 'Munro Leagues Logo - Hills Shaped as an "M"',
  },
  blockRobots: { type: Boolean, default: false },
})

useHead({
  title: computed(() => props.title),
  meta: [
    { name: 'description', content: computed(() => props.description) },
    {
      name: 'keywords',
      content:
        'leagues, results, orienteering,  sporting results, sports, scotland,  munro, munro leagues, munro league results, munro orienteering',
    },
    { name: 'theme-color', content: '#b80bda' },

    { property: 'og:sitename', content: 'Munro' },
    { property: 'og:title', content: computed(() => props.title) },
    { property: 'og:description', content: computed(() => props.description) },
    { property: 'og:url', content: computed(() => props.url) },
    { property: 'og:image', content: computed(() => props.image) },
    { property: 'og:type', content: 'website' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'munroleagues' },
    { name: 'twitter:title', content: computed(() => props.title) },
    { name: 'twitter:description', content: computed(() => props.description) },
    { name: 'twitter:url', content: computed(() => props.url) },
    { name: 'twitter:image', content: computed(() => props.image) },
    { name: 'twitter:image:alt', content: computed(() => props.imageAlt) },

    { itemprop: 'name', content: 'Munro' },
    { itemprop: 'description', content: computed(() => props.description) },
    { itemprop: 'image', content: 'https://munroleagues.com/MunroLogo.png' },

    {
      name: 'robots',
      content: computed(() => (props.blockRobots ? 'noindex' : 'all')),
    },
  ],

  link: [
    { rel: 'shortcut icon', href: '/MunroLogoNoBG-512.png', type: 'image/png' },
    { rel: 'icon', href: '/MunroLogoNoBG-512.png' },
    { rel: 'apple-touch-icon', href: '/MunroLogo-512.png' },
    { rel: 'manifest', href: '/manifest.json' },
  ],
})
</script>
