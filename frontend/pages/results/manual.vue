<script setup lang="ts">
import { competitorToText } from '~/utils/competitor'
import { RequiredField, IsValidTime } from '~/utils/validation'
import type { Competitor, Event } from '~/api-types'
import type { Ref } from 'vue'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } = await useData<string[]>(`competitor-pools/`)

const form = reactive({
  competitor_pool: queryToString(route.query.competitor_pool ?? ''),
  competitor: queryToString(route.query.competitor ?? ''),
  event: queryToString(route.query.event ?? ''),
  course: queryToString(route.query.course ?? ''),
  type: '',
  time: '',
  points: 0,
})

const competitors: Ref<Competitor[]> = ref([])
const events: Ref<Event[]> = ref([])
const getData = async () => {
  competitors.value = (
    await useGet<Competitor[]>(
      `competitor-pools/${form.competitor_pool}/competitors`
    )
  ).sort((a, b) => a.name.localeCompare(b.name))

  events.value = await useGet<Event[]>(
    `competitor-pools/${form.competitor_pool}/events`
  )
}
onMounted(() => {
  if (form.competitor_pool) getData()
})

const action = async () => {
  try {
    await usePost(`results/`, toRaw(form))
    await router.replace(`/competitors/${form.competitor}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem adding result, please try again.'
  }
}

useTitle({
  title: 'Add Result',
  description:
    'Manually add a result to an event. Useful for assigning points to organisers.',
})
</script>

<template>
  <div>
    <Heading title="Manual Result" />

    <Form button="Add Result" :action="action">
      <InputDropdown
        v-model="form.competitor_pool"
        :list="competitor_pools?.map((name) => ({ value: name, text: name }))"
        label="Competitor Pool:"
        :validator="RequiredField('a competitor pool', true)"
        class="col-span-2"
        @change="getData"
      />
      <InputDropdown
        v-model="form.competitor"
        :list="
          competitors.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        label="Competitor:"
        :validator="RequiredField('a competitor', true)"
        include-blank
        class="col-span-2"
      />
      <InputDropdown
        v-model="form.event"
        :list="
          events.map((event) => ({
            value: event.id,
            text: event.name ?? '',
          }))
        "
        label="Event:"
        :validator="RequiredField('an event', true)"
        class="col-span-2"
      />
      <Input
        v-model="form.course"
        label="Course:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('a course')"
      />
      <InputDropdown
        v-model="form.type"
        :list="[
          { value: '', text: 'Normal' },
          { value: 'manual', text: 'Fixed Points' },
          { value: 'average', text: 'Average Points' },
          { value: 'max', text: 'Maximum Points' },
        ]"
        label="Type:"
        class="col-span-2"
      />
      <Input
        v-if="form.type == ''"
        v-model="form.time"
        label="Time:"
        type="text"
        class="col-span-2"
        :validator="IsValidTime"
      />
      <InputNumber
        v-if="form.type == 'manual'"
        v-model="form.points"
        label="Points:"
        type="text"
        class="col-span-2"
      />
    </Form>
  </div>
</template>
