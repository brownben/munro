<script setup lang="ts">
import type { PropType } from 'vue'
import type { LeagueClass } from '~/api-types'

const props = defineProps({
  cls: { type: Object as PropType<LeagueClass>, required: true },
})
const emit = defineEmits(['class-changed'])

const deleteClass = async () => {
  if (
    confirm(
      `Are you sure you want to delete class "${props.cls.name}"? \nThis action cannot be reversed.`
    )
  ) {
    await useDelete(`leagues/${props.cls.league}/classes/${props.cls.name}`)
    emit('class-changed')
  }
}
</script>

<template>
  <article class="flex justify-between gap-4">
    <h3 class="text-2xl font-black text-gray-900">
      {{ cls.name }}
    </h3>

    <div>
      <NuxtLink
        :to="`/leagues/${props.cls.league}/classes/${props.cls.name}/edit`"
        class="mr-2 rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
      >
        Edit Class
      </NuxtLink>
      <button
        class="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        @click="deleteClass"
      >
        Delete Class
      </button>
    </div>
  </article>
</template>
