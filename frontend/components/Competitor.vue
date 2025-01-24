<script setup lang="ts">
import type { PropType } from 'vue'
import {
  UserGroupIcon,
  CakeIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/outline'
import type { Competitor } from '~/api-types'

defineProps({
  competitor: { type: Object as PropType<Competitor>, required: true },
})
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2
      class="text-3xl font-black text-gray-900 sm:text-4xl dark:text-gray-100"
    >
      {{ competitor.name }}
    </h2>

    <div class="flex flex-col gap-x-7 gap-y-2 sm:flex-row sm:flex-wrap">
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
      class="text-main-700 hover:text-main-600 dark:text-main-600 dark:hover:text-main-500 mt-3 inline-block"
    >
      View Results →
    </NuxtLink>
  </article>
</template>
