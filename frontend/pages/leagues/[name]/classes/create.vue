<script setup lang="ts">
import {
  IsValidURLParameter,
  RequiredField,
  IsValidOptionalURLParameter,
  IsValidAgeClass,
} from '~/utils/validation'
import type { League } from '~~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: leagues } = await useData<League[]>(`leagues/`)

const form = reactive({
  name: '',
  league: queryToString(route.params.name ?? ''),
  course: '',
  age_class: '',
  age_class_type: '',
  club: '',
  club_type: '',
  specify_number_of_counting_events: false,
  number_of_counting_events: 0,
})

const getClubRestriction = () => {
  if (form.club_type == 'specific') return form.club
  else if (form.club_type == 'scottish') return '{scottish_clubs}'
  else return ''
}

const getAgeClassRestriction = () => {
  if (form.age_class_type == '') return ''
  else if (form.age_class_type == 'standard') return form.age_class
  else return `${form.age_class_type}-${form.age_class}`
}

const getNumberOfCountingEvents = () => {
  if (form.specify_number_of_counting_events)
    return form.number_of_counting_events
  else return null
}

const action = async () => {
  try {
    await usePost(`leagues/${form.league}/classes`, {
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
    else throw 'Problem creating league class, please try again.'
  }
}

useTitle({
  title: 'Create League Class',
  description: 'Add a new league class to Munro',
})
</script>

<template>
  <div>
    <Heading title="Create League Class" />

    <Form button="Create" :action="action">
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
        title="Course"
        description="Set the default course to use for results for this class."
      />
      <Input
        v-model.trim="form.course"
        label="Default Course:"
        class="col-span-2"
        :validator="IsValidOptionalURLParameter('a default course')"
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
              'Only include people who are in the age class, or juniors who\'s B class is the specified class',
            value: 'exactWithB',
          },
          {
            title: 'Exact Gender',
            description:
              'Gender must match the age class (Women can\'t run up as men)',
            value: 'exactGender',
          },
          {
            title: 'Seniors',
            description: 'Only include seniors (over 18s)',
            value: 'older18',
          },
        ]"
        class="col-span-2"
      />
      <Input
        v-if="form.age_class_type != ''"
        v-model.trim="form.age_class"
        label="Age Class:"
        class="col-span-2"
        :validator="IsValidAgeClass"
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
</template>
