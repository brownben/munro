<script setup lang="ts">
import { RequiredField, IsValidAgeClass } from '~/utils/validation'
import type { Competitor, CompetitorPool } from '~~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } =
  await useData<CompetitorPool[]>(`competitor-pools/`)
const { data: form } = await useDataReactive<Competitor>(
  `competitors/${route.params.id}`,
)

const action = async () => {
  try {
    await usePut(`competitors/${form.value?.id}`, form.value ?? {})
    router.back()
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem updating competitor, please try again.'
  }
}

useTitle({
  title: `Update Competitor`,
  description: `Update the details for a competitor`,
})
</script>

<template>
  <div v-if="form">
    <Heading title="Edit Competitor" />

    <Form button="Update" :action="action">
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
  <LazyError v-else />
</template>
