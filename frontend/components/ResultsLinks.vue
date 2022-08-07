<script setup lang="ts">
import type { PropType } from 'vue'

import {
  ClipboardListIcon,
  MapIcon,
  ChartBarIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/vue/outline/index.js'

const props = defineProps({
  links: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
    required: true,
  },
})

const filteredLinks = computed(() =>
  Object.keys(props.links).filter((link) => props.links[link])
)

const getIcon = (type: string) => {
  if (type === 'Standard Results') return ClipboardListIcon
  else if (type === 'Routegadget') return MapIcon
  else if (type === 'Winsplits') return ChartBarIcon
  else if (type === 'GPS Tracking') return LocationMarkerIcon
  else return LinkIcon
}
</script>

<template>
  <ImageRow
    v-for="link of filteredLinks"
    :key="link"
    :icon="getIcon(link)"
    hover
  >
    <a :href="links[link]">{{ link }}</a>
  </ImageRow>
</template>
