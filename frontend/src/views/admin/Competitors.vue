<template>
  <Layout has-mobile-sub-title>
    <Meta title="Munro - Competitors" description="" :block-robots="true" />
    <template #title>
      <h1 class="text-3xl font-bold leading-tight font-heading">
        <router-link
          :to="'/leagues/' + $route.params.league"
          class="text-xl text-main-700"
        >
          {{ $route.params.league }}
        </router-link>
        <span class="block text-4xl"> Competitors </span>
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
          <Heading
            text="Id"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.id"
            @click="changeSortPreference(SortableProperties.id)"
          />
          <Heading
            text="Name"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.name"
            :left-on-mobile="true"
            @click="changeSortPreference(SortableProperties.name)"
          />
          <Heading
            text="Club"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.club"
            :hide-on-mobile="true"
            @click="changeSortPreference(SortableProperties.club)"
          />
          <Heading
            text="Class"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.ageClass"
            :hide-on-mobile="true"
            @click="changeSortPreference(SortableProperties.ageClass)"
          />
          <Heading
            text="Course"
            ::ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortableProperties.course"
            @click="changeSortPreference(SortableProperties.course)"
          />
        </tr>
      </thead>
      <transition-group name="list">
        <TableRow
          v-for="(competitor, i) of competitors"
          :key="competitor?.id"
          :striped="i % 2 === 0"
          :expanding="false"
          @click="$router.push(`/competitors/${competitor?.id}`)"
        >
          <template v-if="competitor">
            <Cell>
              {{ competitor.id }}
            </Cell>
            <Cell show-secondary-until="sm" class="text-left pl-6">
              {{ competitor.name }}
              <template #secondary>
                <span v-if="competitor.ageClass" class="mr-4">
                  {{ competitor.ageClass }}
                </span>
                <span>{{ competitor.club }}</span>
              </template>
            </Cell>
            <Cell show-after="sm">
              {{ competitor.club }}
            </Cell>
            <Cell show-after="sm">
              {{ competitor.ageClass }}
            </Cell>
            <Cell>
              {{ competitor.course }}
            </Cell>
          </template>
        </TableRow>
      </transition-group>
    </table>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../../components/Layout.vue'
import Cell from '../../components/TableCell.vue'
import Heading from '../../components/TableHeading.vue'
import TableRow from '../../components/TableRow.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import {
  sortCompetitors,
  SortablePropertiesCompetitor as SortableProperties,
} from '../../scripts/sort'

const route = useRoute()

import { getLeagueCompetitors } from '../../api/competitors'

/* Get Data */
const loading = ref(true)
const rawCompetitors = ref<Competitor[]>([])

const getData = async () => {
  const routeParamsLeague = toSingleString(route.params.league)

  if (routeParamsLeague) {
    loading.value = true
    rawCompetitors.value = (await getLeagueCompetitors(routeParamsLeague)) ?? []
    loading.value = false
  }
}

const competitors = computed(() =>
  rawCompetitors.value.sort(sortCompetitors(sortPreferences.value))
)

watch(route, getData, { immediate: true })

/* Sorting */
const sortPreferences = ref<SortPreferencesCompetitor>({
  ascending: false,
  by: SortableProperties.name,
})
const changeSortPreference = (property: SortableProperties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}
</script>
