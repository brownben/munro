<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Filters } from '~/utils/filter'
import type { EventResultWithAgeGender as EventResult } from '~/utils/ageClass'

const props = defineProps({
  results: { type: Array as PropType<EventResult[]>, required: true },
  filters: { type: Object as PropType<Filters>, required: true },
})

type Column = 'position' | 'time' | 'club' | 'age_class' | 'name'
const ascending = ref(false)
const activeColumn = ref<Column>('position')

const sortedResults = computed(() =>
  props.results
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
        class="border-main-200 h-14 border-b text-left font-medium text-gray-600 md:h-12 dark:border-gray-400 dark:text-gray-300"
      >
        <th class="text-center" :aria-sort="ariaSorted?.position">
          <button
            type="button"
            class="ring-main-200 rounded-sm px-1 font-medium focus:outline-hidden focus-visible:ring-3"
            @click="changeSortPreference('position')"
          >
            Pos.
            <TableArrows
              :active="activeColumn == 'position'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th :aria-sort="ariaSorted?.name">
          <button
            type="button"
            class="ring-main-200 rounded-sm focus:outline-hidden focus-visible:ring-3"
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
            class="ring-main-200 rounded-sm px-1 font-medium focus:outline-hidden focus-visible:ring-3"
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
            class="ring-main-200 rounded-sm px-1 font-medium focus:outline-hidden focus-visible:ring-3"
            @click="changeSortPreference('club')"
          >
            Club
            <TableArrows
              :active="activeColumn == 'club'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th class="text-center" :aria-sort="ariaSorted?.time">
          <button
            type="button"
            class="ring-main-200 rounded-sm px-1 font-medium focus:outline-hidden focus-visible:ring-3"
            @click="changeSortPreference('time')"
          >
            Time
            <TableArrows
              :active="activeColumn == 'time'"
              :ascending="ascending"
            />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRowResult
        v-for="result of sortedResults"
        :key="result.id"
        :result="result"
      />
    </tbody>
  </table>
  <div v-else class="px-6 lg:px-0">
    <p class="text-xl font-extrabold text-gray-600 dark:text-gray-300">
      No results found
    </p>
    <p class="text-gray-500 dark:text-gray-400">
      Try changing the filters selected.
    </p>
  </div>
</template>
