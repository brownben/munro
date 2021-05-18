<template>
  <div class="hidden" />
</template>
<script setup lang="ts">
import { ref, computed, watchEffect, defineProps } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

import { toSingleString } from '../scripts/typeHelpers'

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

const route = useRoute()

const theme = ref('#b80bda')
const title = computed(() => props.title)
const description = computed(() => props.description)
const url = computed(() => props.url)
const image = computed(() => {
  if (theme.value !== '#b80bda') return props.image
  else if (props.image.includes('?'))
    return `${props.image}&theme=${theme.value}`
  else return `${props.image}?theme=${theme.value}`
})
const imageAlt = computed(() => props.imageAlt)

useHead({
  title: title,
  meta: [
    { name: 'description', content: description },
    {
      name: 'keywords',
      content:
        'leagues, results, orienteering,  sporting results, sports, scotland,  munro, munro leagues, munro league results, munro orienteering',
    },
    { name: 'theme-color', content: theme },

    { property: 'og:sitename', content: 'Munro' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:type', content: 'website' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'munroleagues' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:url', content: url },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: imageAlt },

    { itemprop: 'name', content: 'Munro' },
    { itemprop: 'description', content: description },
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

watchEffect(async () => {
  if (route.query.theme) {
    const setTheme = (await import('../setThemes')).default
    theme.value = setTheme(toSingleString(route.query.theme))
  }
})
</script>
