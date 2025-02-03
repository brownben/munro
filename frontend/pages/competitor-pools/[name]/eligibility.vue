<script setup lang="ts">
import {
  UserGroupIcon,
  AdjustmentsVerticalIcon,
  TrophyIcon,
} from '@heroicons/vue/24/outline'
import type { Filters } from '~/utils/filter'
import type { Competitor, CompetitorPool } from '~/api-types'

requireLogin()

const route = useRoute()
const pool_name = queryToString(route.params.name)

const { data, refresh } = await useData<CompetitorPool>(
  `competitor-pools/${pool_name}`,
)

const competitors = computed(
  () => data.value?.competitors.map(competitorWithAgeGender) ?? [],
)
const leagues = computed(() => data.value?.leagues ?? [])

const show = ref(false)
const filters = reactive<Filters>({
  name: queryToString(route.query.name ?? ''),
  club: queryToString(route.query.club ?? ''),
  minAge: queryToString(route.query.minAge ?? '0'),
  maxAge: queryToString(route.query.maxAge ?? '100'),
  male: queryToString(route.query.male) !== 'false',
  female: queryToString(route.query.female) !== 'false',
})

const loadingCompetitors = ref(new Set())
const toggleEligibility = async (competitor: Competitor) => {
  loadingCompetitors.value.add(competitor.id)
  await usePatch(`competitors/${competitor.id}/eligibility`, {
    eligible: !competitor.eligible,
  })
  await refresh()
  loadingCompetitors.value.delete(competitor.id)
}

useTitle({
  title: `${route.params.name} Competitor Pool - Eligibility`,
  description: `Set the eligibility of competitors in the ${route.params.name} competitor pool`,
})
</script>
<template>
  <div>
    <Heading
      title="Competitor Eligibility"
      :link-text="leagues[0]?.name"
      :link-location="`/leagues/${leagues[0]?.name}`"
    >
      <ImageRow v-if="leagues.length > 1" :icon="TrophyIcon">
        <strong class="font-medium">{{ leagues.length }}</strong>
        Leagues
      </ImageRow>
      <ImageRow :icon="UserGroupIcon">
        <strong class="font-medium">{{ competitors.length }}</strong>
        Competitors
      </ImageRow>

      <template #rightAction>
        <Button small @click="show = !show">
          <AdjustmentsVerticalIcon
            class="mr-2 -ml-1 h-5 w-5"
            aria-hidden="true"
          />
          <span>Filter Competitors</span>
        </Button>
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
      <section v-if="show" class="bg-gray-50 dark:bg-gray-800">
        <div
          class="mx-auto grid max-w-(--breakpoint-lg) grid-cols-2 gap-6 p-8 pt-4 sm:grid-cols-4 sm:pt-0 lg:px-8"
        >
          <Input v-model="filters.name" label="Name:" class="col-span-2" />
          <Input v-model="filters.club" label="Club:" class="col-span-2" />
          <Input
            v-model="filters.minAge"
            label="Min. Age:"
            type="number"
            :form-props="{ max: 120, min: 0, step: 1 }"
          />
          <Input
            v-model="filters.maxAge"
            label="Max. Age:"
            type="number"
            :form-props="{ max: 120, min: 0, step: 1 }"
          />
          <InputSwitch v-model="filters.male" label="Male:" />
          <InputSwitch v-model="filters.female" label="Female:" />
        </div>
      </section>
    </transition>

    <main
      class="mx-auto w-full max-w-(--breakpoint-lg) grow py-6 md:py-10 lg:px-8"
    >
      <TableCompetitors
        v-slot="{ competitor }"
        :competitors="competitors"
        :filters="filters"
        :eligibility="true"
      >
        <ButtonSmall
          :loading="loadingCompetitors.has(competitor.id)"
          @click="toggleEligibility(competitor)"
        >
          <template v-if="competitor.eligible"> Mark Ineligible </template>
          <template v-else> Mark Eligible </template>
        </ButtonSmall>
      </TableCompetitors>
    </main>
  </div>
</template>
