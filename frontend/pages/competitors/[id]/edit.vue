<script setup lang="ts">
import { RequiredField } from '~/utils/validation'
import { Competitor } from '~~/api-types'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } = await useData<string[]>(`competitor-pools/`)
const { data: form } = await useData<Competitor>(
  `competitors/${route.params.id}`
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
      />
      <Input v-model.trim="form.club" label="Club:" class="col-span-2" />

      <InputDropdown
        v-model="form.competitor_pool"
        :list="competitor_pools?.map((name) => ({ value: name, text: name }))"
        label="Competitor Pool:"
        :validator="RequiredField('a competitor pool', true)"
        class="col-span-2"
      />
    </Form>
  </div>
  <LazyError v-else />
</template>
