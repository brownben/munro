<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Filters } from '~/utils/filter'
import type { CompetitorWithAgeGender } from '~~/utils/ageClass'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  competitors: {
    type: Array as PropType<CompetitorWithAgeGender[]>,
    required: true,
  },
  filters: { type: Object as PropType<Filters>, required: true },
  eligibility: {
    type: Boolean,
    required: false,
    default: false,
  },
})

type Column = keyof CompetitorWithAgeGender
const ascending = ref(route.query.ascending === 'true')
const activeColumn = ref<Column>(
  (queryToString(route.query.sort_by) as Column) || 'id',
)

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

watch([activeColumn, ascending], () => {
  router.replace({
    query: {
      ...route.query,
      sort_by: activeColumn.value,
      ascending: ascending.value ? 'true' : 'false',
    },
  })
})
</script>
<template>
  <table v-if="sortedResults.length > 0" class="w-full">
    <thead>
      <tr
        class="h-14 border-b-2 border-gray-200 text-left text-gray-600 md:h-12 dark:border-gray-400 dark:text-gray-300"
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
            class="rounded px-2 font-medium ring-main-200 focus:outline-none focus-visible:ring"
            @click="changeSortPreference('name')"
          >
            <span class="sm:hidden">Athlete</span>
            <span class="hidden sm:inline-block">Name</span>
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
        <th
          v-if="eligibility"
          class="hidden px-1 text-center font-medium sm:table-cell"
          :aria-sort="ariaSorted?.club"
        >
          Eligible?
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="competitor of sortedResults"
        :key="competitor.id"
        class="border-t border-gray-200 text-gray-800 transition hover:bg-main-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <td class="py-3 text-center">
          {{ competitor.id }}
        </td>
        <td class="px-2 py-2">
          <NuxtLink
            :to="`/competitors/${competitor.id}`"
            class="inline-block ring-main-200 hover:text-main-800 focus-visible:ring"
          >
            <span
              class="block font-medium leading-tight text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-2 dark:text-gray-100 dark:decoration-gray-500"
            >
              {{ competitor.name }}
            </span>
            <span
              class="text-sm leading-tight text-gray-500 sm:hidden dark:text-gray-400"
            >
              <template v-if="competitor.age_class">
                {{ competitor.age_class }} &nbsp;
              </template>
              {{ competitor.club }}
            </span>
          </NuxtLink>
        </td>
        <td class="hidden text-center sm:table-cell">
          {{ competitor.age_class || ' ' }}
        </td>
        <td class="hidden text-center md:table-cell">
          {{ competitor.club || ' ' }}
        </td>
        <td v-if="eligibility" class="hidden text-center sm:table-cell">
          {{ competitor.eligible }}
        </td>
        <td>
          <div class="flex flex-wrap justify-around gap-2">
            <slot :competitor="competitor"></slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="px-6 lg:px-0">
    <p class="text-xl font-extrabold text-gray-600 dark:text-gray-300">
      No competitors found
    </p>
    <p class="text-gray-500 dark:text-gray-400">
      Try changing the filters selected.
    </p>
  </div>
</template>
