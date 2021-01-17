<template>
  <Layout v-if="event" has-mobile-sub-title>
    <Meta
      :title="`Munro - ${event?.name || ''} Event Results`"
      :description="`Results from the ${event?.name || ''} event of the ${
        event?.league || ''
      } league on Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options`"
      :url="`https://munro-leagues.herokuapp.com/events/${$route.params.event}`"
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
    />

    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading -mt-2">
        <router-link
          :to="'/leagues/' + event?.league"
          class="text-xl text-main-700"
        >
          {{ event?.league || '' }}
        </router-link>
        <span class="block text-4xl">
          {{ event?.name || '' }}
        </span>
      </h1>
    </template>

    <div v-if="coursesInResults.length > 0" class="block col-span-2 card">
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 leadiing-6 font-heading"
      >
        Courses
      </h2>
      <router-link
        v-for="course in coursesInResults"
        :key="course"
        :class="{ 'bg-main-200 text-main-800': currentCourse === course }"
        class="button"
        :to="`/events/${$route.params.event}/results/${course}`"
      >
        {{ course }}
      </router-link>
    </div>

    <FilterMenu class="col-span-2 my-0" @changed="filterChanged" />

    <table
      v-if="results.length > 0"
      class="w-full col-span-2 mb-2 border-collapse"
    >
      <thead>
        <tr
          class="transition duration-300 bg-white border-b border-collapse border-main-300 hover:bg-main-200"
        >
          <Heading
            text="Pos."
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.position"
            @click="changeSortPreference(SortableProperties.position)"
          />
          <Heading
            text="Name"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.name"
            :left-on-mobile="true"
            @click="changeSortPreference(SortableProperties.name)"
          />
          <Heading
            text="Class"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.age"
            :hide-on-mobile="true"
            @click="changeSortPreference(SortableProperties.age)"
          />
          <Heading
            text="Club"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.club"
            :hide-on-mobile="true"
            @click="changeSortPreference(SortableProperties.club)"
          />
          <Heading
            text="Time"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.time"
            @click="changeSortPreference(SortableProperties.time)"
          />
        </tr>
      </thead>
      <transition-group name="list">
        <TableRow
          v-for="(result, i) in results"
          :key="result.id"
          :striped="i % 2 === 0"
          :expanding="false"
        >
          <Cell>
            <template v-if="['max', 'average', 'manual'].includes(result.type)">
              *
            </template>
            <template v-else-if="result.incomplete">-</template>
            <template v-else>
              {{ result.position || '' }}
            </template>
          </Cell>

          <Cell show-secondary-until="sm" class="text-left pl-6">
            {{ result.name }}
            <template #secondary>
              <span v-if="result.ageClass" class="mr-4">
                {{ result.ageClass }}
              </span>
              <span>{{ result.club }}</span>
            </template>
          </Cell>

          <Cell show-after="sm">
            {{ result.ageClass }}
          </Cell>
          <Cell show-after="sm">
            {{ result.club }}
          </Cell>
          <Cell>
            {{ elapsedTime(result.time) }}
          </Cell>
        </TableRow>
      </transition-group>
    </table>
    <Transition name="fade">
      <NoResultsCard
        v-if="!loading && results.length === 0"
        class="col-span-2"
      />
    </Transition>
  </Layout>
</template>
<script lang="ts" setup>
import { ref, watch, computed, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../components/Layout.vue'
import FilterMenu from '../components/FilterMenu.vue'
import Cell from '../components/TableCell.vue'
import Heading from '../components/TableHeading.vue'
import TableRow from '../components/ExpandingTableRow.vue'
const NoResultsCard = defineAsyncComponent(
  () => import('../components/cards/NoResultsCard.vue')
)

import { toSingleString } from '../scripts/typeHelpers'
import { elapsedTime } from '../scripts/time'
import { eventResultWithAgeGender as resultWithAgeGender } from '../scripts/ageClassSplit'
import { filterResults } from '../scripts/filter'
import {
  sortEventResults as sortResults,
  SortablePropertiesEvent as SortableProperties,
} from '../scripts/sort'

import { getEvent } from '../api/events'
import { getEventResults } from '../api/results'

const router = useRouter()
const route = useRoute()

/* Get Data */
const loading = ref(true)
const event = ref<Event | null>(null)
const rawResults = ref<EventResult[]>([])
const getData = async () => {
  const routeParamsEvent: string = toSingleString(route.params.event) ?? ''
  loading.value = true

  await Promise.all([
    getEvent(routeParamsEvent).then((eventDetails) => {
      event.value = eventDetails
    }),
    getEventResults(routeParamsEvent).then((resultDetails) => {
      rawResults.value = resultDetails ?? []
    }),
  ])

  loading.value = false
}
watch(route, getData, { immediate: true })

/* Results */
const results = computed(() =>
  rawResults.value
    .filter((result) => result.course === currentCourse.value)
    .map(resultWithAgeGender)
    .filter((result) => filterResults(result, filterPreferences.value))
    .sort(sortResults(sortPreferences.value))
)
const coursesInResults = computed(() => [
  ...new Set(rawResults.value?.map((result) => result.course)),
])
const currentCourse = computed(
  () => toSingleString(route.params.course) || coursesInResults.value?.[0] || ''
)

/* Sort + Filter Preferences */
const filterPreferences = ref<FilterPreferences>({
  name: '',
  club: '',
  minAge: 0,
  maxAge: 100,
  male: true,
  female: true,
})
const sortPreferences = ref<SortPreferencesEvent>({
  ascending: false,
  by: SortableProperties.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (property: SortableProperties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}
</script>
