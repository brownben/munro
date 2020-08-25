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
      <h1 class="text-3xl font-bold leading-tight font-heading">
        <router-link
          :to="'/leagues/' + event?.league"
          class="text-xl md:text-3xl text-main-700"
        >
          {{ event?.league || '' }}
        </router-link>
        <span class="hidden ml-2 mr-3 md:inline-block">-</span>
        <span class="block text-4xl md:text-3xl md:inline-block">
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
          <th @click="changeSortPreference(SortablePropeties.position)">
            <p>Pos.</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.position"
            />
          </th>
          <th
            class="name"
            @click="changeSortPreference(SortablePropeties.name)"
          >
            <p>Name</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.name"
            />
          </th>
          <th
            class="ageClass"
            @click="changeSortPreference(SortablePropeties.age)"
          >
            <p>Class</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.age"
            />
          </th>
          <th
            class="club"
            @click="changeSortPreference(SortablePropeties.club)"
          >
            <p>Club</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.club"
            />
          </th>
          <th @click="changeSortPreference(SortablePropeties.time)">
            <p>Time</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.time"
            />
          </th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="fade">
        <tr
          v-for="result in results"
          :key="result.id"
          class="transition duration-300 bg-white border-collapse hover:bg-main-200"
          :class="{ 'bg-main-50': results.indexOf(result) % 2 === 0 }"
        >
          <td
            v-if="['max', 'average', 'manual'].includes(result.type)"
            class="position"
          >
            *
          </td>
          <td v-else-if="result.incomplete" class="position">
            -
          </td>
          <td v-else class="position">
            {{ result.position || '' }}
          </td>
          <td class="name">
            <span class="block font-normal sm:font-light">
              {{ result.name }}
            </span>
            <span class="block text-xs sm:hidden">
              <span v-if="result.ageClass" class="mr-4">{{
                result.ageClass
              }}</span>
              <span>{{ result.club }}</span>
            </span>
          </td>
          <td class="ageClass">
            {{ result.ageClass }}
          </td>
          <td class="club">
            {{ result.club }}
          </td>
          <td class="time">
            {{ elapsedTime(result.time) }}
          </td>
        </tr>
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
<script lang="ts">
import { defineAsyncComponent } from 'vue'

import Layout from '/@/components/Layout.vue'
import FilterMenu from '/@/components/FilterMenu.vue'
import UpDownArrow from '/@/components/UpDownArrows.vue'
const NoResultsCard = defineAsyncComponent(() =>
  import('/@/components/cards/NoResultsCard.vue')
)

export default {
  components: {
    Layout,
    FilterMenu,
    UpDownArrow,
    NoResultsCard,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

import { toSingleString } from '/@/scripts/typeHelpers'
import {
  eventResultWithAgeGender as resultWithAgeGender,
  filterResults,
  sortEventResults as sortResults,
  elapsedTime,
} from '/@/scripts/processResults'

import $router from '/@/router/index'
const { currentRoute: $route } = $router

import { Event, getEvent } from '/@/api/events'
import { EventResult, getEventResults } from '/@/api/results'
import {
  FilterPreferences,
  SortPreferencesEvent as SortPreferences,
  SortablePropetiesEvent as SortablePropeties,
} from '/@/scripts/FilterSort.d'

/* Get Data */
const loading = ref(true)
const event = ref<Event | null>(null)
const rawResults = ref<EventResult[]>([])
const getData = async () => {
  const routeParamsEvent = toSingleString($route.value.params.event)
  loading.value = true

  await Promise.all([
    getEvent(routeParamsEvent).then((eventDetails) => {
      event.value = eventDetails
    }),
    getEventResults(routeParamsEvent).then((resultDetails) => {
      rawResults.value = resultDetails
    }),
  ])

  loading.value = false
}
watch($route, getData, { immediate: true })

export { loading, event, elapsedTime }

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
  () =>
    toSingleString($route.value.params.course) ??
    coursesInResults.value?.[0] ??
    ''
)

export { results, currentCourse, coursesInResults }

/* Sort + Filter Preferences */
const filterPreferences = ref<FilterPreferences>({
  name: '',
  club: '',
  minAge: 0,
  maxAge: 100,
  male: true,
  female: true,
})
const sortPreferences = ref<SortPreferences>({
  ascending: false,
  by: SortablePropeties.position,
})
const filterChanged = (preferences: FilterPreferences) => {
  filterPreferences.value = preferences
}
const changeSortPreference = (property: SortablePropeties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}
export {
  sortPreferences,
  SortablePropeties,
  filterChanged,
  changeSortPreference,
}
</script>

<style lang="postcss" scoped>
table {
  & td {
    @apply py-2 text-center px-1 font-sans font-light;

    &.name {
      @apply py-1;
    }
  }

  & th {
    white-space: nowrap;
    @apply font-heading select-none text-center font-normal py-2;

    & p {
      @apply inline-block;
    }

    & div {
      @apply inline-block ml-1;
    }
  }
}

table td {
  &.time,
  &.position {
    @apply font-normal;

    @screen sm {
      @apply font-light;
    }
  }
}

table td,
table th {
  &.name {
    @apply text-left pl-6;

    @screen lg {
      @apply pl-10;
    }
  }

  &.club,
  &.ageClass {
    @apply hidden;
  }

  @screen sm {
    &.club,
    &.ageClass {
      @apply table-cell;
    }
  }
}
</style>
