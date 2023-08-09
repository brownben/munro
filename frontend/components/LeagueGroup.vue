<script setup lang="ts">
import type { PropType } from 'vue'
import type { LeagueGroup } from '~/api-types'

const props = defineProps({
  group: { type: Object as PropType<LeagueGroup>, required: true },
})
const emit = defineEmits(['group-changed'])

const deleteGroup = async () => {
  if (
    confirm(
      `Are you sure you want to delete group "${props.group.name}"? \nThis action cannot be reversed.`,
    )
  ) {
    await useDelete(`leagues/${props.group.league}/groups/${props.group.name}`)
    emit('group-changed')
  }
}
</script>

<template>
  <article class="flex flex-col justify-between gap-4 sm:flex-row">
    <h3 class="text-xl font-bold text-gray-900 md:text-2xl">
      {{ group.name }}
    </h3>

    <div>
      <NuxtLink
        :to="`/leagues/${props.group.league}/groups/${props.group.name}/edit`"
        class="mr-2 rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
      >
        Edit Group
      </NuxtLink>
      <button
        class="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        @click="deleteGroup"
      >
        Delete Group
      </button>
    </div>
  </article>
</template>
