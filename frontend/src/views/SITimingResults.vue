<template>
  <Layout has-mobile-sub-title :show-expansion="filterOpen">
    <Meta
      :title="`Munro - ${data?.eventName || ''} Event Results`"
      :description="`Results from the ${
        data?.eventName || ''
      } event on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munroleagues.com/sitiming/${routeParamsURL}`"
      :image="`https://images.munroleagues.com/${data?.eventName}`"
      :imageAlt="`Munro Leagues - ${data?.eventName}`"
      :block-robots="false"
    />
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="-mt-2 text-3xl font-bold leading-tight font-heading">
          <span class="block text-4xl">
            {{ data?.eventName || '' }}
          </span>
        </h1>

        <button
          title="Toggle Filter Menu"
          class="p-2 text-gray-500 transition rounded-shape hover:bg-main-100 hover:text-main-600 focus:bg-main-100 focus:text-main-600 print:hidden"
          :class="{ 'text-main-600 bg-main-50': filterOpen }"
          @click="filterOpen = !filterOpen"
        >
          <span class="sr-only">Toggle Filter Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>
      </div>
    </template>

    <template #white>
      <div v-if="coursesInResults.length > 0" class="flex col-span-2 -mt-2">
        <div class="items-center hidden w-full sm:flex">
          <p class="mr-2 text-lg tracking-tight text-gray-600 font-heading">
            Courses:
          </p>
          <router-link
            v-for="course in coursesInResults"
            :key="course"
            :class="
              currentCourse === course
                ? 'text-main-700 bg-main-100'
                : 'hover:bg-main-100  focus:bg-main-100  text-gray-500 '
            "
            class="px-3 py-2 ml-2 text-lg leading-5 transition duration-150 ease-in-out font-heading rounded-shape focus-visible:shadow-outline hover:text-main-600 focus:text-main-600"
            :to="`/sitiming/${encodeURIComponent(routeParamsURL)}/${course}`"
          >
            {{ course }}
          </router-link>
        </div>
        <InputDropdown
          v-model="currentCourse"
          label="Course:"
          class="block w-full sm:hidden"
          :list="coursesInResults"
          :include-blank="false"
          @update:modelValue="
            $router.push(
              `/sitiming/${encodeURIComponent(routeParamsURL)}/${currentCourse}`
            )
          "
        />
      </div>
    </template>

    <template #expansion>
      <FilterMenu :preferences="filterPreferences" @changed="filterChanged" />
    </template>

    <div class="col-span-2">
      <table
        v-if="results.length > 0"
        class="w-full col-span-2 mb-2 border-collapse tabular-nums"
      >
        <thead>
          <tr
            class="transition duration-300 bg-white border-b border-collapse border-main-200 hover:bg-main-200"
          >
            <Heading
              text="Pos."
              screenreader-text="Position"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.position"
              @toggle="changeSortPreference(SortableProperties.position)"
            />
            <Heading
              text="Name"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.name"
              :left-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.name)"
            />
            <Heading
              text="Class"
              screenreader-text="Age Class"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.age"
              :hide-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.age)"
            />
            <Heading
              text="Club"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.club"
              :hide-on-mobile="true"
              @toggle="changeSortPreference(SortableProperties.club)"
            />
            <Heading
              text="Time"
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortableProperties.time"
              @toggle="changeSortPreference(SortableProperties.time)"
            />
          </tr>
        </thead>
        <transition-group name="list">
          <TableRow
            v-for="(result, i) in results"
            :key="`${result?.course}-${result?.id}`"
            :striped="i % 2 === 0"
            :expanding="false"
          >
            <template v-if="result">
              <Cell>
                <template
                  v-if="
                    ['max', 'average', 'manual'].includes(result.type ?? '')
                  "
                >
                  *
                </template>
                <template v-else-if="result.incomplete">-</template>
                <template v-else>
                  {{ result.position || '' }}
                </template>
              </Cell>

              <Cell show-secondary-until="sm" class="pl-6 text-left">
                {{ result.name }}
                <template #secondary>
                  <span v-if="result.ageClass" class="mr-4">
                    {{ result.ageClass }}
                  </span>
                  <span>{{ result.club }}</span>
                </template>
              </Cell>

              <Cell show-after="sm">
                {{ result.ageClass || ' ' }}
              </Cell>
              <Cell show-after="sm">
                {{ result.club || ' ' }}
              </Cell>
              <Cell>
                <time
                  v-if="result.time"
                  :datetime="timeToHTMLElapsed(result.time)"
                >
                  {{ elapsedTime(result.time) }}
                </time>
                <span v-else>{{ ' ' }}</span>
              </Cell>
            </template>
          </TableRow>
        </transition-group>
      </table>
    </div>
    <CardNoResults
      v-if="results && results.length === 0"
      class="col-span-2 -mt-6"
    />
  </Layout>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import FilterMenu from '../components/FilterMenu.vue'
import Cell from '../components/TableCell.vue'
import Heading from '../components/TableHeading.vue'
import TableRow from '../components/TableRow.vue'
const InputDropdown = defineAsyncComponent(
  () => import('../components/InputDropdown.vue')
)
const CardNoResults = defineAsyncComponent(
  () => import('../components/CardNoResults.vue')
)

import { toSingleString, asyncComputed } from '../scripts/typeHelpers'
import { elapsedTime, timeToHTMLElapsed } from '../scripts/time'
import { eventResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import {
  sortEventResults as sortResults,
  SortablePropertiesEvent as SortableProperties,
} from '../scripts/sort'

import { useSITimingResults } from '../api/results'

const route = useRoute()

/* Get Data */
const routeParamsURL = computed(() => toSingleString(route.params.url) ?? '')
const [data] = await useSITimingResults(
  computed(() => encodeURIComponent(routeParamsURL.value))
)

/* Sort + Filter Preferences */
const filterOpen = ref<boolean>(false)
const filterPreferences = ref<FilterPreferences>({
  name: toSingleString(route.query?.name),
  club: toSingleString(route.query?.club),
  minAge: Number(toSingleString(route.query?.minAge)) || 0,
  maxAge: Number(toSingleString(route.query?.maxAge)) || 100,
  male: toSingleString(route.query?.male) !== 'false',
  female: toSingleString(route.query?.female) !== 'false',
})
const sortPreferences = ref<SortPreferencesEvent>({
  ascending: false,
  by: SortableProperties.position,
})
const filterChanged = (preferences: Partial<FilterPreferences>) => {
  filterPreferences.value = { ...filterPreferences.value, ...preferences }
}
const changeSortPreference = (property: SortableProperties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}

/* Results */
const coursesInResults = await asyncComputed(() => [
  ...new Set(data.value?.results?.map((result) => result.course)),
])

const currentCourse = ref('')
watchEffect(() => {
  if (route.params.course)
    currentCourse.value = toSingleString(route.params.course)
  else if (coursesInResults.value?.[0] && !currentCourse.value)
    currentCourse.value = coursesInResults.value?.[0]
})

const results = await asyncComputed(() =>
  (data.value?.results ?? [])
    .filter((result) => result.course === currentCourse.value)
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(sortPreferences.value))
)
</script>
