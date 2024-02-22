<script setup lang="ts">
import { IsValidURLParameter, RequiredField } from '~/utils/validation'
import type { League, LeagueGroup } from '~~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: leagues } = await useData<League[]>(`leagues/`)
const { data } = await useData<LeagueGroup>(
  `leagues/${route.params.name}/groups/${route.params.group}`,
)

const form = reactive({
  name: data.value?.name ?? '',
  league: data.value?.league ?? '',
  min: String(data.value?.min ?? 0),
  max: String(data.value?.max ?? 0),
})

const action = async () => {
  try {
    await usePut(
      `leagues/${route.params.name}/groups/${route.params.group}`,
      form,
    )
    await router.push(`/leagues/${form.league}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem updating league group, please try again.'
  }
}

useTitle({
  title: 'Update League Group',
  description: 'Update details for league group',
})
</script>

<template>
  <div v-if="data">
    <Heading title="Update League Group" />

    <Form button="Update" :action="action">
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
  <LazyError v-else />
</template>
