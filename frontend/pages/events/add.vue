<script setup lang="ts">
import { RequiredField } from '~/utils/validation'
import type { League, Event } from '~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: leagues } = useData<League[]>(`leagues/`)
const { data: events } = useData<Event[]>(`events/`)

const form = reactive({
  league: queryToString(route.query.league ?? ''),
  event: queryToString(route.query.event ?? ''),
})

const matchingEvents = computed(() => {
  const league = leagues.value?.find((league) => league.name === form.league)

  return (
    events.value?.filter((event) => {
      const samePool = event.competitor_pool === league?.competitor_pool
      const notSameLeague = event.competitor_pool !== form.league

      return samePool && notSameLeague
    }) ?? []
  )
})

const action = async () => {
  try {
    await usePost(`events/league_event`, toRaw(form))
    await router.push(`/leagues/${form.league}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem adding event, please try again.'
  }
}

useTitle({
  title: 'Add Event from Another League',
  description: 'Add event which already exists in another league.',
})
</script>

<template>
  <div>
    <Heading title="Add Event" tagline="Add event from another league." />

    <Form button="Add" :action="action" :disabled="matchingEvents.length == 0">
      <FormHeading
        title="League Details"
        description="The league to add the event to."
      />
      <InputDropdown
        v-model="form.league"
        :list="
          leagues?.map((league) => ({ value: league.name, text: league.name }))
        "
        label="League:"
        include-blank
        class="col-span-2"
        :validator="RequiredField('a league', true)"
      />

      <template v-if="matchingEvents.length > 0">
        <FormHeading
          title="Event Details"
          description="The event to add to the league. This event must already exist in another league which shares a competitor pool with the selected league."
        />
        <InputDropdown
          v-model="form.event"
          :list="
            matchingEvents.map((event) => ({
              value: event.id,
              text: `${event.name} (${event.date})`,
            }))
          "
          label="Event:"
          :validator="RequiredField('an event', true)"
          class="col-span-2"
        />
      </template>
      <div v-else class="col-span-2 px-6 py-6 lg:px-0">
        <p class="text-xl font-extrabold text-gray-800 dark:text-gray-200">
          No suitable events found.
        </p>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          This event must already exist in another league which shares a
          competitor pool with the selected league.
        </p>
      </div>
    </Form>
  </div>
</template>
