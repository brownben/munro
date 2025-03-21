<script lang="ts" setup>
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
import type { PropType } from 'vue'
import type { LeagueEvent } from '~/api-types'
import type { Filters } from '~/utils/filter'
import type { LeagueResultWithAgeGender as LeagueResult } from '~/utils/ageClass'

const props = defineProps({
  results: { type: Array as PropType<LeagueResult[]>, required: true },
  filters: { type: Object as PropType<Filters>, required: true },
  events: { type: Array as PropType<LeagueEvent[]>, required: true },
  eligibility: { type: Boolean, default: false },
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
          class="hidden text-center md:table-cell"
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
        <th class="text-center" :aria-sort="ariaSorted?.total_points">
          <button
            type="button"
            class="ring-main-200 rounded-sm px-1 font-medium focus:outline-hidden focus-visible:ring-3"
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
          <TooltipProvider
            :disabled="!event.event_name"
            :delay-duration="200"
            :disable-closing-trigger="true"
          >
            <TooltipRoot>
              <TooltipTrigger as-child>
                <button
                  type="button"
                  class="group ring-main-200 relative rounded-sm font-medium focus:outline-hidden focus-visible:ring-3 xl:px-1"
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
                </button>
              </TooltipTrigger>

              <TooltipContent
                as="p"
                side="bottom"
                class="data-[state=delayed-open]:animate-fadeIn rounded-sm bg-white px-3 py-1 font-medium shadow-lg transition select-none dark:bg-gray-900 dark:shadow-gray-800"
              >
                {{ event.event_name }}
              </TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
        </th>
      </tr>
    </thead>

    <TableRowLeagueResult
      v-for="(result, index) of sortedResults"
      :key="result.id"
      :result="result"
      :events="events"
      :striped="index % 2 == 0"
      :eligibility="eligibility"
    />
  </table>
  <div v-else class="mx-auto max-w-(--breakpoint-lg) px-6">
    <p class="text-2xl font-extrabold text-gray-600 dark:text-gray-300">
      No results found
    </p>
    <p class="text-lg text-gray-500 dark:text-gray-400">
      Try changing the filters selected.
    </p>
  </div>
</template>
