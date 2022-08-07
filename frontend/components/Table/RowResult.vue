<script setup lang="ts">
import type { PropType } from 'vue'
import type { EventResultWithAgeGender as EventResult } from '~/utils/ageClass'
import { elapsedTime } from '~/utils/time'

defineProps({
  result: { type: Object as PropType<EventResult>, required: true },
})
</script>
<template>
  <tr class="text-gray-800 odd:bg-main-100 hover:bg-main-200">
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
      <span class="block leading-tight text-gray-900">
        {{ result.name }}
      </span>
      <span class="text-sm leading-tight text-gray-600 sm:hidden">
        {{ result.age_class }} &nbsp; {{ result.club }}
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
