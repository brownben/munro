<script setup lang="ts">
import {
  UserGroupIcon,
  AdjustmentsVerticalIcon,
  TrophyIcon,
} from '@heroicons/vue/24/outline'
import type { Filters } from '~/utils/filter'
import type { Competitor, League } from '~/api-types'

requireLogin()

const route = useRoute()
const pool_name = queryToString(route.params.name)

const { data } = await useData<Competitor[]>(
  `competitor-pools/${pool_name}/competitors`,
)
const { data: leagues } = await useData<League[]>(
  `competitor-pools/${pool_name}/leagues`,
)

const competitors = computed(
  () => data.value?.map(competitorWithAgeGender) ?? [],
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

useTitle({
  title: `${route.params.name} Competitor Pool`,
  description: `List of competitors in the ${route.params.name} competitor pool`,
})
</script>
<template>
  <div>
    <Heading
      title="Competitors"
      :link-text="leagues?.[0]?.name"
      :link-location="`/leagues/${leagues?.[0]?.name}`"
    >
      <ImageRow v-if="leagues && leagues.length > 1" :icon="TrophyIcon">
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
            class="-ml-1 mr-2 h-5 w-5"
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
      <section v-if="show" class="bg-gray-50">
        <div
          class="mx-auto grid max-w-screen-lg grid-cols-2 gap-6 p-8 pt-4 sm:grid-cols-4 sm:pt-0 lg:px-8"
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

    <LinksSection
      :links="[
        {
          text: 'Add Result',
          location: `/results/manual?competitor_pool=${pool_name}`,
        },
        {
          text: 'Add Competitor',
          location: `/competitors/create?competitor_pool=${pool_name}`,
        },
        {
          text: 'Merge Competitors',
          location: `/competitors/merge?competitor_pool=${pool_name}`,
        },
      ]"
      dark
    >
      Manage competitors
    </LinksSection>
    <main
      class="mx-auto w-full max-w-screen-lg flex-grow py-6 md:py-10 lg:px-8"
    >
      <TableCompetitors :competitors="competitors" :filters="filters" />
    </main>
  </div>
</template>
