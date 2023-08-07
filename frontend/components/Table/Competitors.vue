<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Filters } from '~/utils/filter'
import { CompetitorWithAgeGender } from '~~/utils/ageClass'

const props = defineProps({
  competitors: {
    type: Array as PropType<CompetitorWithAgeGender[]>,
    required: true,
  },
  filters: { type: Object as PropType<Filters>, required: true },
})

type Column = keyof CompetitorWithAgeGender
const ascending = ref(false)
const activeColumn = ref<Column>('id')

const sortedResults = computed(() =>
  props.competitors
    .filter(matchingResults(props.filters))
    .sort(byProperty(ascending.value, activeColumn.value)),
)

const changeSortPreference = (property: Column) => {
  if (property !== activeColumn.value) ascending.value = false
  else ascending.value = !ascending.value
  activeColumn.value = property
}

const ariaSorted = computed(
  (): Partial<Record<Column, 'ascending' | 'descending'>> => ({
    [activeColumn.value]: ascending.value ? 'descending' : 'ascending',
  }),
)
</script>
<template>
  <table v-if="sortedResults.length > 0" class="w-full">
    <thead>
      <tr
        class="h-14 border-b border-main-200 text-left font-medium text-gray-900 md:h-12"
      >
        <th class="text-center" :aria-sort="ariaSorted?.id">
          <button
            type="button"
            class="rounded px-1 font-medium ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('id')"
          >
            Id
            <TableArrows
              :active="activeColumn == 'id'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th :aria-sort="ariaSorted?.name">
          <button
            type="button"
            class="rounded px-1 ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('name')"
          >
            <span class="font-medium sm:hidden">Athlete</span>
            <span class="hidden font-medium sm:inline-block">Name</span>
            <TableArrows
              :active="activeColumn == 'name'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th
          class="hidden text-center sm:table-cell"
          :aria-sort="ariaSorted?.age_class"
        >
          <button
            type="button"
            class="rounded px-1 font-medium ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('age_class')"
          >
            Class
            <TableArrows
              :active="activeColumn == 'age_class'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th
          class="hidden text-center md:table-cell"
          :aria-sort="ariaSorted?.club"
        >
          <button
            type="button"
            class="rounded px-1 font-medium ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('club')"
          >
            Club
            <TableArrows
              :active="activeColumn == 'club'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th></th>
      </tr>
    </thead>
    <transition-group
      tag="tbody"
      move-class="duration-400 motion-safe:transition-transform"
      enter-from-class="opacity-50"
      enter-active-class="duration-300 motion-safe:transform"
      enter-to-class="opacity-100"
    >
      <tr
        v-for="competitor of sortedResults"
        :key="competitor.id"
        class="text-gray-800 odd:bg-main-100 hover:bg-main-200"
      >
        <td class="py-3 text-center">
          {{ competitor.id }}
        </td>
        <td class="px-2 py-2">
          <span class="block leading-tight text-gray-900">
            {{ competitor.name }}
          </span>
          <span class="text-sm leading-tight text-gray-600 sm:hidden">
            {{ competitor.age_class }} &nbsp; {{ competitor.club }}
          </span>
        </td>
        <td class="hidden text-center sm:table-cell">
          {{ competitor.age_class || ' ' }}
        </td>
        <td class="hidden text-center md:table-cell">
          {{ competitor.club || ' ' }}
        </td>
        <td>
          <div
            class="flex flex-wrap gap-1 py-1 text-sm leading-tight sm:justify-around"
          >
            <NuxtLink
              :to="`/competitors/${competitor.id}`"
              class="rounded border border-main-300 px-2 py-1 font-medium text-main-700 transition hover:bg-main-300 hover:text-main-900"
            >
              View Results
            </NuxtLink>
            <NuxtLink
              :to="`/competitors/${competitor.id}/edit`"
              class="rounded border border-main-300 px-2 py-1 font-medium text-main-700 transition hover:bg-main-300 hover:text-main-900"
            >
              Edit
            </NuxtLink>
          </div>
        </td>
      </tr>
    </transition-group>
  </table>
  <div v-else class="px-6 lg:px-0">
    <p class="text-xl font-extrabold text-gray-600">No competitors found</p>
    <p class="text-gray-500">Try changing the filters selected.</p>
  </div>
</template>
