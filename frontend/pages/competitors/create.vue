<script setup lang="ts">
import { RequiredField, IsValidAgeClass } from '~/utils/validation'
import type { CompetitorPool } from '~~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } =
  await useData<CompetitorPool[]>(`competitor-pools/`)

const form = reactive({
  name: '',
  age_class: '',
  club: '',
  competitor_pool: queryToString(route.query.competitor_pool ?? ''),
})

const action = async () => {
  try {
    await usePost(`competitors/`, toRaw(form))
    await router.push(`/competitor-pools/${form.competitor_pool}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem adding competitor, please try again.'
  }
}

useTitle({
  title: `Add Competitor`,
  description: `Create a new competitor`,
})
</script>

<template>
  <div>
    <Heading title="Add Competitor" />

    <Form button="Create" :action="action">
      <Input
        v-model.trim="form.name"
        label="Name:"
        class="col-span-2"
        :validator="RequiredField('a name', true)"
      />
      <Input
        v-model.trim="form.age_class"
        label="Age Class:"
        class="col-span-2"
        :validator="IsValidAgeClass"
      />
      <Input v-model.trim="form.club" label="Club:" class="col-span-2" />

      <InputDropdown
        v-model="form.competitor_pool"
        :list="
          competitor_pools?.map((pool) => ({
            value: pool.name,
            text: pool.name,
          }))
        "
        label="Competitor Pool:"
        :validator="RequiredField('a competitor pool', true)"
        class="col-span-2"
      />
    </Form>
  </div>
</template>
