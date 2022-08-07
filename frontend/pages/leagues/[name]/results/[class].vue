<script setup lang="ts">
import type { LeagueResultsOverview } from '~/api-types'
import type { Filters } from '~/utils/filter'
import { AdjustmentsIcon } from '@heroicons/vue/outline/index.js'

const route = useRoute()

const { data } = await useData<LeagueResultsOverview>(
  `leagues/${route.params.name}/results/${route.params.class}`
)
const results = computed(
  () => data.value?.results.map(leagueResultWithAgeGender) ?? []
)

const show = ref(false)
const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: true,
  female: true,
})

if (data.value) {
  useTitle({
    title: `${data.value.class_name} Results - ${data.value.league}`,
    description: `League standings for the ${data.value.class_name} class in the ${data.value.league} league`,
  })
}
</script>
<template>
  <div v-if="data" class="flex h-full flex-col">
    <Heading
      :title="data.class_name"
      :link-location="`/leagues/${data.league}`"
      :link-text="data.league"
    >
      <template #rightAction>
        <button
          class="inline-flex select-none items-center rounded-md bg-gradient-to-r from-main-500 to-main-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:from-main-600 hover:to-main-700 focus:outline-none focus:ring-2 focus:ring-main-600 focus:ring-offset-2 print:hidden"
          @click="show = !show"
        >
          <AdjustmentsIcon class="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
          <span>Filter Results</span>
        </button>
      </template>
    </Heading>

    <transition
      enter-from-class="scale-y-95 opacity-0 "
      enter-active-class="duration-300 origin-top motion-safe:transform"
      enter-to-class="scale-y-100 opacity-100"
      leave-from-class="scale-y-100 opacity-100"
      leave-active-class="duration-300 origin-top motion-safe:transform"
      leave-to-class="scale-y-95 opacity-0 "
    >
      <section v-if="show" class="bg-gray-50">
        <div
          class="mx-auto grid max-w-screen-lg grid-cols-2 gap-6 p-8 pt-4 sm:grid-cols-4 sm:pt-0 lg:px-8"
        >
          <Input v-model="filters.name" label="Name:" class="col-span-2" />
          <Input v-model="filters.club" label="Club:" class="col-span-2" />
          <Input v-model="filters.minAge" label="Min. Age:" type="number" />
          <Input v-model="filters.maxAge" label="Max. Age:" type="number" />
          <InputSwitch v-model="filters.male" label="Male:" />
          <InputSwitch v-model="filters.female" label="Female:" />
        </div>
      </section>
    </transition>

    <section
      v-if="results"
      class="mx-auto w-full flex-grow py-8 sm:py-12 lg:px-8 print:sm:py-4"
      :class="{
        'max-w-screen-lg': results[0]?.points.length <= 3,
        'max-w-screen-xl':
          results[0]?.points.length > 3 && results[0]?.points.length <= 10,
      }"
    >
      <TableLeagueResults
        :results="results"
        :filters="filters"
        :events="data.events"
      />
    </section>
    <LinksSection
      :links="
        data.classes
          .filter((course) => course !== data?.class_name)
          .map((course) => ({
            text: course,
            location: `/leagues/${data?.league}/results/${course}`,
          }))
      "
    >
      Other Classes
    </LinksSection>
  </div>
  <LazyError v-else />
</template>
