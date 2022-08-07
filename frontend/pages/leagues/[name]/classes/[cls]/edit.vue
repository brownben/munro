<script setup lang="ts">
import {
  IsValidURLParameter,
  RequiredField,
  IsValidOptionalURLParameter,
} from '~/utils/validation'
import { League, LeagueClass } from '~~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: leagues } = await useData<League[]>(`leagues/`)
const { data } = await useData<LeagueClass>(
  `leagues/${route.params.name}/classes/${route.params.cls}`
)

const getClubRestriction = () => {
  if (form.club_type == 'specific') return form.club
  else if (form.club_type == 'scottish') return '{scottish_clubs}'
  else return ''
}
const setClubRestriction = (value: string) => {
  if (value == '{scottish_clubs}') return { club: '', club_type: 'scottish' }
  else if (value) return { club: value, club_type: 'specific' }
  else return { club: '', club_type: '' }
}
const getAgeClassRestriction = () => {
  if (form.age_class_type == '') return ''
  else if (form.age_class_type == 'standard') return form.age_class
  else return `${form.age_class_type}-${form.age_class}`
}
const setAgeClassRestriction = (value: string) => {
  let [age_class_type, age_class] = value.split('-')

  if (age_class_type == '') {
    age_class = ''
  } else if (age_class == undefined) {
    age_class = age_class_type
    age_class_type = 'standard'
  }

  return { age_class, age_class_type }
}
const getNumberOfCountingEvents = () => {
  if (form.specify_number_of_counting_events)
    return form.number_of_counting_events
  else return null
}

const form = reactive({
  name: data.value?.name ?? '',
  league: data.value?.league ?? '',
  course: data.value?.standard_course ?? '',
  ...setAgeClassRestriction(data.value?.age_class_filter ?? ''),
  ...setClubRestriction(data.value?.club_filter ?? ''),
  specify_number_of_counting_events: !!data.value?.number_of_counting_events,
  number_of_counting_events: Number(data.value?.number_of_counting_events),
})

const action = async () => {
  try {
    await usePut(`leagues/${route.params.name}/classes/${route.params.cls}`, {
      name: form.name,
      league: form.league,
      standard_course: form.course || form.name,
      age_class_filter: getAgeClassRestriction(),
      club_filter: getClubRestriction(),
      number_of_counting_events: getNumberOfCountingEvents(),
    })
    await router.replace(`/leagues/${form.league}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem updating league class, please try again.'
  }
}

useTitle({
  title: 'Update League Class',
  description: 'Update details for league class',
})
</script>

<template>
  <div v-if="data">
    <Heading title="Update League Class" />

    <Form button="Update" :action="action">
      <FormHeading
        title="Basic Information"
        description="The identifying data for the class."
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
      <Input
        v-model.trim="form.name"
        label="Name:"
        class="col-span-2"
        :validator="IsValidURLParameter('a name')"
      />
      <Input
        v-model.trim="form.course"
        label="Default Course:"
        class="col-span-2"
        :validator="IsValidOptionalURLParameter('a default course')"
      />

      <InputSwitch
        v-model="form.specify_number_of_counting_events"
        label="Override number of counting events?"
        description="Specify a different number of events to score than the league default?"
        class="col-span-2"
      />
      <InputNumber
        v-if="form.specify_number_of_counting_events"
        v-model="form.number_of_counting_events"
        label="Number of Counting Events:"
        class="col-span-2"
      />

      <FormHeading
        title="Age Class Filtering"
        description="Only include people with a specific age class in the results."
      />
      <InputRadio
        v-model="form.age_class_type"
        label="Age Class Matching:"
        :options="[
          {
            title: 'No Restrictions',
            description: 'Allow any age class',
            value: '',
          },
          {
            title: 'Standard',
            description: 'Standard Orienteering age class eligibility',
            value: 'standard',
          },
          {
            title: 'Exact',
            description: 'Only include people who are in the age class',
            value: 'exact',
          },
          {
            title: 'Exact with B',
            description:
              'Only include people who are in the age class, or juniors who\' B class is the specified class',
            value: 'exactWithB',
          },
          {
            title: 'Over 18',
            description:
              'Only include seniors in senior classes (don\'t let juniors run up)',
            value: 'older18',
          },
          {
            title: 'Junior Strict',
            description: 'Can run up, but must have the same gender',
            value: 'genderUnder',
          },
        ]"
        class="col-span-2"
      />
      <Input
        v-if="form.age_class_type != ''"
        v-model.trim="form.age_class"
        label="Age Class:"
        class="col-span-2"
      />

      <FormHeading
        title="Club Filtering"
        description="Only include people with a specific club in the results."
      />
      <InputRadio
        v-model="form.club_type"
        label="Club Matching:"
        :options="[
          {
            title: 'No Restrictions',
            description: 'Allow any club',
            value: '',
          },
          {
            title: 'Scottish',
            description: 'Only allow Scottish clubs',
            value: 'scottish',
          },
          {
            title: 'Specific Club',
            description: 'Only include people who are in the age class',
            value: 'specific',
          },
        ]"
        class="col-span-2"
      />
      <Input
        v-if="form.club_type == 'specific'"
        v-model.trim="form.club"
        label="Club:"
        class="col-span-2"
      />
    </Form>
  </div>
  <LazyError v-else />
</template>
