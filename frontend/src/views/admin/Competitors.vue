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
          <Heading
            text="Id"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortablePropeties.id"
            @click="changeSortPreference(SortablePropeties.id)"
          />
          <Heading
            text="Name"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortablePropeties.name"
            :left-on-mobile="true"
            @click="changeSortPreference(SortablePropeties.name)"
          />
          <Heading
            text="Club"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortablePropeties.club"
            hide-on-mobile="true"
            @click="changeSortPreference(SortablePropeties.club)"
          />
          <Heading
            text="Class"
            :ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortablePropeties.ageClass"
            hide-on-mobile="true"
            @click="changeSortPreference(SortablePropeties.ageClass)"
          />
          <Heading
            text="Course"
            ::ascending="sortPreferences.ascending"
            :active="sortPreferences.by === SortablePropeties.course"
            @click="changeSortPreference(SortablePropeties.course)"
          />
        </tr>
      </thead>
      <transition-group name="list">
        <TableRow
          v-for="(competitor, i) of competitors"
          :key="competitor.id"
          :striped="i % 2 === 0"
          :expanding="false"
          @click="$router.push(`/competitors/${competitor.id}`)"
        >
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
        </TableRow>
      </transition-group>
    </table>
  </Layout>
</template>
<script lang="ts">
import Layout from '/@/components/Layout.vue'
import Cell from '/@/components/TableCell.vue'
import Heading from '/@/components/TableHeading.vue'
import TableRow from '/@/components/ExpandingTableRow.vue'

export default {
  components: {
    Layout,
    Cell,
    Heading,
    TableRow,
  },
}
</script>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

import { toSingleString } from '../../scripts/typeHelpers'
import { sortCompetitors } from '../../scripts/sort'

import $router from '../../router/index'
const { currentRoute: $route } = $router

import { getLeagueCompetitors } from '../../api/competitors'

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
  by: SortablePropeties.name,
})
const changeSortPreference = (property: SortablePropeties) => {
  if (property !== sortPreferences.value.by)
    sortPreferences.value.ascending = false
  else sortPreferences.value.ascending = !sortPreferences.value.ascending
  sortPreferences.value.by = property
}

export { sortPreferences, SortablePropeties, changeSortPreference }
</script>
