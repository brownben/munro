<script setup lang="ts">
import type { PropType } from 'vue'
import type { EventResultWithAgeGender as EventResult } from '~/utils/ageClass'
import { elapsedTime } from '~/utils/time'

defineProps({
  result: { type: Object as PropType<EventResult>, required: true },
})
</script>
<template>
  <tr
    class="odd:bg-main-50 hover:bg-main-100 dark:hover:bg-main-900 text-gray-800 transition-colors dark:text-gray-100 dark:odd:bg-gray-800"
  >
    <td class="py-3 text-center">
      <template v-if="['max', 'average', 'manual'].includes(result.type)">
        *
      </template>
      <template v-else-if="result.incomplete">-</template>
      <template v-else>
        {{ result.position || '' }}
      </template>
    </td>
    <td class="py-2">
      <span class="block leading-tight text-gray-900 dark:text-gray-100">
        {{ result.name }}
      </span>
      <span
        class="text-sm leading-tight text-gray-600 sm:hidden dark:text-gray-400"
      >
        <template v-if="result.age_class">
          {{ result.age_class }} &nbsp;
        </template>
        {{ result.club }}
      </span>
    </td>
    <td class="hidden text-center sm:table-cell">
      {{ result.age_class || ' ' }}
    </td>
    <td class="hidden text-center md:table-cell">
      {{ result.club || ' ' }}
    </td>
    <td class="text-center">{{ elapsedTime(result.time) }}</td>
  </tr>
</template>
