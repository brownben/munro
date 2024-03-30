<script setup lang="ts">
import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import type { PropType } from 'vue'
import type { LeagueClass } from '~/api-types'

const props = defineProps({
  cls: { type: Object as PropType<LeagueClass>, required: true },
})
const emit = defineEmits(['class-changed'])

const deleteClass = async () => {
  if (
    confirm(
      `Are you sure you want to delete class "${props.cls.name}"? \nThis action cannot be reversed.`,
    )
  ) {
    await useDelete(`leagues/${props.cls.league}/classes/${props.cls.name}`)
    emit('class-changed')
  }
}
</script>

<template>
  <article class="flex flex-col justify-between gap-4 sm:flex-row">
    <h3 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
      {{ cls.name }}
    </h3>

    <div class="flex flex-wrap items-center gap-2">
      <ButtonSmall :link="`/leagues/${cls.league}/results/${cls.name}`">
        <DocumentTextIcon class="size-4" aria-hidden="true" />
        Results
      </ButtonSmall>
      <ButtonSmall :link="`/leagues/${cls.league}/classes/${cls.name}/edit`">
        <PencilSquareIcon class="size-4" aria-hidden="true" />
        Edit
      </ButtonSmall>
      <ButtonSmall @click="deleteClass">
        <TrashIcon class="size-4" aria-hidden="true" />
        Delete
      </ButtonSmall>
    </div>
  </article>
</template>
