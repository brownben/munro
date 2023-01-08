<script setup lang="ts">
import type { PropType } from 'vue'
import {
  UserGroupIcon,
  CakeIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/outline/index.js'
import type { Competitor } from '~/api-types'

defineProps({
  competitor: { type: Object as PropType<Competitor>, required: true },
})
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2 class="text-3xl font-black text-gray-900 sm:text-4xl">
      {{ competitor.name }}
    </h2>

    <div class="flex flex-col gap-y-2 gap-x-7 sm:flex-row sm:flex-wrap">
      <ImageRow v-if="competitor.club" :icon="UserGroupIcon" darker>
        {{ competitor.club }}
      </ImageRow>
      <ImageRow v-if="competitor.age_class" :icon="CakeIcon" darker>
        {{ competitor.age_class }}
      </ImageRow>
      <ImageRow
        v-if="competitor.competitor_pool"
        :icon="RectangleStackIcon"
        darker
      >
        {{ competitor.competitor_pool }}
      </ImageRow>
    </div>

    <NuxtLink
      :to="`/competitors/${competitor.id}`"
      class="mt-3 inline-block text-main-700 hover:text-main-800"
    >
      View Results →
    </NuxtLink>
  </article>
</template>
