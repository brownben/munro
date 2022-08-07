<script setup lang="ts">
import { UserGroupIcon, AdjustmentsIcon } from '@heroicons/vue/outline/index.js'
import { Filters } from '~/utils/filter'
import type { Competitor } from '~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()

const { data } = await useData<Competitor[]>(
  `competitor-pools/${route.params.name}/competitors`
)
const competitors = computed(
  () => data.value?.map(competitorWithAgeGender) ?? []
)
const name = queryToString(route.params.name)

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
      :title="name"
      link-text="← League Home"
      :link-location="`/leagues/${route.params.name}`"
    >
      <ImageRow :icon="UserGroupIcon">
        <strong class="font-medium">{{ competitors.length }}</strong>
        Competitors
      </ImageRow>

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
      v-if="loggedIn"
      :links="[
        {
          text: 'Add Competitor',
          location: `/competitors/create?competitor_pool=${name}`,
        },
        {
          text: 'Merge Competitors',
          location: `/competitors/merge?competitor_pool=${name}`,
        },
        {
          text: 'Add Result',
          location: `/results/manual?competitor_pool=${name}`,
        },
      ]"
      dark
    >
      Manage competitors
    </LinksSection>
    <main
      class="mx-auto w-full max-w-screen-lg flex-grow py-8 sm:py-12 lg:px-8"
    >
      <TableCompetitors :competitors="competitors" :filters="filters" />
    </main>
  </div>
</template>
