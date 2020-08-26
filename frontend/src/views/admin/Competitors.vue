<!--
  Competitors

  Displays list of competitors
-->

<template>
  <Layout has-mobile-sub-title>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Competitors"
      description
    />

    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        <router-link
          :to="'/leagues/' + $route.params.league"
          class="text-xl text-main-700 md:text-3xl"
        >
          {{ $route.params.league }}
        </router-link>
        <span class="hidden ml-2 mr-3 md:inline-block">-</span>
        <span class="block text-4xl md:text-3xl md:inline-block">
          Competitors
        </span>
      </h1>
    </template>

    <div class="col-span-2 card card-color-dark">
      <h2 class="text-3xl font-bold text-white font-heading">Admin Actions</h2>

      <div class="w-full">
        <router-link to="/competitors/create" class="button button-white">
          Add Competitor
        </router-link>
        <router-link to="/competitors/merge" class="button button-white">
          Merge Competitors
        </router-link>
        <router-link to="/results/transfer" class="button button-white">
          Transfer Result
        </router-link>
        <router-link to="/results/manual" class="button button-white">
          Manual Points
        </router-link>
      </div>
    </div>

    <table
      v-if="competitors.length > 0"
      class="table w-full col-span-2 my-4 border-collapse table-fixed"
    >
      <thead>
        <tr
          class="transition duration-300 bg-white border-b border-collapse border-main-300 hover:bg-main-200"
        >
          <th @click="changeSortPreference(SortablePropeties.id)">
            <p>Id</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.id"
            />
          </th>
          <th
            class="text-left"
            @click="changeSortPreference(SortablePropeties.name)"
          >
            <p>Name</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.name"
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
          <th
            class="ageClass"
            @click="changeSortPreference(SortablePropeties.ageClass)"
          >
            <p>Class</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.ageClass"
            />
          </th>
          <th @click="changeSortPreference(SortablePropeties.course)">
            <p>Course</p>
            <up-down-arrow
              :ascending="sortPreferences.ascending"
              :active="sortPreferences.by === SortablePropeties.course"
            />
          </th>
        </tr>
      </thead>
      <transition-group name="list" tag="tbody">
        <tr
          v-for="competitor of competitors"
          :key="competitor.id"
          class="transition duration-300 bg-white border-collapse hover:bg-main-200"
          :class="{
            'bg-main-50': competitors.indexOf(competitor) % 2 === 0,
          }"
          @click="$router.push(`/competitors/${competitor.id}`)"
        >
          <td class="text-center">
            {{ competitor.id }}
          </td>
          <td>
            <span class="block font-normal text-left md:font-light">
              {{ competitor.name }}
            </span>
            <span class="block text-xs md:hidden">
              <span v-if="competitor.ageClass" class="mr-4">
                {{ competitor.ageClass }}
              </span>
              <span>{{ competitor.club }}</span>
            </span>
          </td>
          <td class="hidden text-center md:table-cell">
            {{ competitor.club }}
          </td>
          <td class="hidden text-center md:table-cell">
            {{ competitor.ageClass }}
          </td>
          <td class="text-center">
            {{ competitor.course }}
          </td>
        </tr>
      </transition-group>
    </table>
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import UpDownArrow from '/@/components/UpDownArrows.vue'

export default {
  components: {
    Layout,
    UpDownArrow,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

import { toSingleString } from '/@/scripts/typeHelpers'
import { sortCompetitors } from '/@/scripts/sort'

import $router from '/@/router/index'
const { currentRoute: $route } = $router

import { Competitor, getLeagueCompetitors } from '/@/api/competitors'

import {
  SortPreferencesCompetitor as SortPreferences,
  SortablePropetiesCompetitor as SortablePropeties,
} from '/@/scripts/FilterSort.d'

/* Get Data */
const loading = ref(true)
const rawCompetitors = ref<Competitor[]>([])

const getData = async () => {
  const routeParamsLeague = toSingleString($route.value.params.league)

  loading.value = true
  rawCompetitors.value = await getLeagueCompetitors(routeParamsLeague)
  loading.value = false
}

const competitors = computed(() =>
  rawCompetitors.value.sort(sortCompetitors(sortPreferences.value))
)

watch($route, getData, { immediate: true })

export { loading, competitors }

/* Sorting */
const sortPreferences = ref<SortPreferences>({
  ascending: false,
  by: SortablePropeties.position,
})
const changeSortPreference = (property: SortablePropeties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}

export { sortPreferences, SortablePropeties, changeSortPreference }
</script>

<style lang="postcss" scoped>
table {
  & td {
    @apply py-2 px-1 font-sans font-light;
  }

  & th {
    white-space: nowrap;
    @apply font-heading select-none font-normal py-2;

    & p {
      @apply inline-block;
    }

    & div {
      @apply inline-block ml-1;
    }
  }
}
</style>
