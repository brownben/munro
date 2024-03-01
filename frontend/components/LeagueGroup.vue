<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
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

    <div class="flex flex-wrap items-center gap-2">
      <ButtonSmall :link="`/leagues/${group.league}/groups/${group.name}/edit`">
        <PencilSquareIcon class="size-4" aria-hidden="true" />
        Edit
      </ButtonSmall>
      <ButtonSmall @click="deleteGroup">
        <TrashIcon class="size-4" aria-hidden="true" />
        Delete
      </ButtonSmall>
    </div>
  </article>
</template>
