<script lang="ts" setup>
import type { PropType } from 'vue'
import type { LeagueEvent } from '~/api-types'
import type { Filters } from '~/utils/filter'
import type { LeagueResultWithAgeGender as LeagueResult } from '~/utils/ageClass'

const props = defineProps({
  results: { type: Array as PropType<LeagueResult[]>, required: true },
  filters: { type: Object as PropType<Filters>, required: true },
  events: { type: Array as PropType<LeagueEvent[]>, required: true },
})

type Column =
  | 'position'
  | 'total_points'
  | 'club'
  | 'age_class'
  | 'name'
  | number
const ascending = ref(false)
const activeColumn = ref<Column>('position')

const sortedResults = computed(() => {
  const comparator =
    typeof activeColumn.value == 'number'
      ? byPoints(ascending.value, activeColumn.value)
      : byProperty(ascending.value, activeColumn.value)

  return props.results.filter(matchingResults(props.filters)).sort(comparator)
})

const changeSortPreference = (property: Column) => {
  if (property !== activeColumn.value) ascending.value = false
  else ascending.value = !ascending.value
  activeColumn.value = property
}

const ariaSorted = computed(() => {
  return {
    [activeColumn.value]: ascending.value ? 'descending' : 'ascending',
  } as Partial<Record<Column, 'ascending' | 'descending'>>
})
</script>
<template>
  <table v-if="sortedResults.length > 0" class="w-full">
    <thead>
      <tr
        class="h-14 border-b border-main-200 text-left font-medium text-gray-600 md:h-12 dark:border-gray-400 dark:text-gray-300"
      >
        <th class="text-center" :aria-sort="ariaSorted?.position">
          <button
            type="button"
            class="rounded px-1 font-medium ring-main-200 focus:outline-none focus-visible:ring"
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
            class="rounded ring-main-200 focus:outline-none focus-visible:ring"
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
          class="hidden text-center md:table-cell"
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
        <th class="text-center" :aria-sort="ariaSorted?.total_points">
          <button
            type="button"
            class="rounded px-1 font-medium ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('total_points')"
          >
            Points
            <TableArrows
              :active="activeColumn == 'total_points'"
              :ascending="ascending"
            />
          </button>
        </th>
        <th
          v-for="(event, index) of events"
          :key="event.id"
          class="hidden text-center md:table-cell"
          :aria-sort="ariaSorted?.[index]"
        >
          <button
            type="button"
            class="group relative rounded font-medium ring-main-200 focus:outline-none focus-visible:ring xl:px-1"
            @click="changeSortPreference(index)"
          >
            {{ index + 1 }}
            <TableArrows
              :active="activeColumn == index"
              :ascending="ascending"
              class="hidden"
              :class="{
                '2xl:inline-block': events.length >= 12,
                'xl:inline-block': events.length < 12,
              }"
            />

            <p
              v-if="event.event_name"
              class="absolute -left-7 z-40 block w-[calc(100%+3.5rem)] whitespace-normal break-words rounded bg-white p-1 text-center text-sm leading-tight opacity-0 shadow transition duration-300 group-hover:opacity-100 group-focus:opacity-100"
            >
              {{ event.event_name }}
            </p>
          </button>
        </th>
      </tr>
    </thead>

    <TableRowLeagueResult
      v-for="(result, index) of sortedResults"
      :key="result.id"
      :result="result"
      :events="events"
      :striped="index % 2 == 0"
    />
  </table>
  <div v-else class="mx-auto max-w-screen-lg px-6 lg:px-8">
    <p class="text-2xl font-extrabold text-gray-600">No results found</p>
    <p class="text-lg text-gray-500">Try changing the filters selected.</p>
  </div>
</template>
