<script setup lang="ts">
import type { LeagueResultsOverview } from '~/api-types'
import type { Filters } from '~/utils/filter'
import { AdjustmentsVerticalIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const { data } = await useData<LeagueResultsOverview>(
  `leagues/${route.params.name}/results/${route.params.class}`,
)
const results = computed(
  () => data.value?.results.map(leagueResultWithAgeGender) ?? [],
)
const otherClasses = computed(
  () =>
    data.value?.classes.filter((course) => course !== data.value?.class_name) ??
    [],
)

const show = ref(false)
const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: queryToString(route.query.male) !== 'false',
  female: queryToString(route.query.female) !== 'false',
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
          <AdjustmentsVerticalIcon
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
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
      <section v-if="show" class="bg-gray-50 print:hidden">
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
      v-if="otherClasses.length > 0"
      :links="
        otherClasses.map((course) => ({
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
