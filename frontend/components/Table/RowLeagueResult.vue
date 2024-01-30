<script setup lang="ts">
import type { PropType } from 'vue'
import type { LeagueResultWithAgeGender as Result } from '~/utils/ageClass'
import type { LeagueEvent } from '~/api-types'

defineProps({
  result: { type: Object as PropType<Result>, required: true },
  events: { type: Array as PropType<LeagueEvent[]>, required: true },
  striped: { type: Boolean, default: false },
})
</script>
<template>
  <TableRowExpanding :striped="striped">
    <template #default>
      <td class="py-3 text-center">
        {{ result.position }}
      </td>
      <td class="py-2">
        <span class="block leading-tight text-gray-900">
          {{ result.name }}
        </span>
        <span class="text-sm leading-tight text-gray-500 md:hidden">
          <template v-if="result.age_class">
            {{ result.age_class }} &nbsp;
          </template>
          {{ result.club }}
        </span>
      </td>
      <td class="hidden text-center md:table-cell">
        {{ result.age_class || ' ' }}
      </td>
      <td class="hidden text-center md:table-cell">
        {{ result.club || ' ' }}
      </td>
      <td class="text-center">{{ result.total_points }}</td>
      <td
        v-for="point in result.points"
        :key="point?.event"
        class="hidden text-center md:table-cell"
        :class="{
          'line-through': !point?.counting,
          'font-normal italic': ['manual', 'max', 'average'].includes(
            point?.type ?? '',
          ),
        }"
      >
        {{ point?.score ?? '' }}
      </td>
    </template>
    <template #expansion>
      <dl class="mr-2 leading-tight">
        <div
          v-for="(point, i) in result.points"
          :key="point?.event"
          class="flex justify-end gap-2"
        >
          <dt class="text-gray-600">
            {{ events[i]?.event_name ?? '' }}
          </dt>
          <dd
            class="w-8"
            :class="{
              'line-through': !point?.counting,
              'font-normal italic': ['manual', 'max', 'average'].includes(
                point?.type ?? '',
              ),
            }"
          >
            {{ point?.score ?? '' }}
          </dd>
        </div>
      </dl>
    </template>
  </TableRowExpanding>
</template>
