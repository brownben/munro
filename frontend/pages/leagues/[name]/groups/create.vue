<script setup lang="ts">
import { IsValidURLParameter, RequiredField } from '~/utils/validation'
import { League } from '~~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: leagues } = await useData<League[]>(`leagues/`)

const form = reactive({
  name: '',
  league: queryToString(route.params.name ?? ''),
  min: '0',
  max: '0',
})

const action = async () => {
  try {
    await usePost(`leagues/${form.league}/groups`, form)
    await router.replace(`/leagues/${form.league}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem creating league group, please try again.'
  }
}

useTitle({
  title: 'Create League Group',
  description: 'Add a new league group to Munro',
})
</script>

<template>
  <div>
    <Heading title="Create League Group" />

    <Form button="Create" :action="action">
      <FormHeading
        title="Basic Information"
        description="The identifying data for the group."
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

      <FormHeading
        title="Number of Counting Events"
        description="Control the number of counting events in the group. Leave as zero for no limits."
      />
      <Input
        v-model="form.min"
        label="Minimum Events Counting in Group:"
        type="number"
        class="col-span-2"
        :form-props="{ min: 0, step: 1 }"
      />
      <Input
        v-model="form.max"
        label="Maximum Events Counting in Group:"
        type="number"
        class="col-span-2"
        :form-props="{ min: 0, step: 1 }"
      />
    </Form>
  </div>
</template>
