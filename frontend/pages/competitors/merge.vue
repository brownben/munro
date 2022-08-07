<script setup lang="ts">
import { RequiredField } from '~/utils/validation'
import type { Competitor } from '~/api-types'
import type { Ref } from 'vue'
import { competitorToText } from '~/utils/competitor'

const loggedIn = useLoggedIn()
if (!loggedIn.value) await redirect('/login')

const route = useRoute()
const router = useRouter()

const { data: competitor_pools } = await useData<string[]>(`competitor-pools/`)

const form = reactive({
  competitor_pool: queryToString(route.query.competitor_pool ?? ''),
  competitor_to_merge: queryToString(route.query.competitor_to_merge ?? ''),
  competitor_to_keep: '',
})

const competitors: Ref<Competitor[]> = ref([])
const getCompetitors = async () => {
  competitors.value = (
    await useGet<Competitor[]>(
      `competitor-pools/${form.competitor_pool}/competitors`
    )
  ).sort((a, b) => a.name.localeCompare(b.name))
}

onMounted(() => {
  if (form.competitor_pool) getCompetitors()
})

const action = async () => {
  try {
    await usePost(`competitors/merge`, toRaw(form))
    await router.replace(`/competitors/${form.competitor_to_keep}`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem merging competitors, please try again.'
  }
}

useTitle({
  title: `Merge Competitors`,
  description: `Merge duplicate occurances of a competitor together`,
})
</script>

<template>
  <div>
    <Heading title="Merge Competitors" />

    <Form button="Merge" :action="action">
      <InputDropdown
        v-model="form.competitor_pool"
        :list="competitor_pools?.map((name) => ({ value: name, text: name }))"
        label="Competitor Pool:"
        :validator="RequiredField('a competitor pool', true)"
        class="col-span-2"
        @change="getCompetitors"
      />
      <InputDropdown
        v-model="form.competitor_to_keep"
        :list="
          competitors.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        label="Competitor to Keep:"
        :validator="RequiredField('a competitor to keep', true)"
        include-blank
        class="col-span-2"
      />
      <InputDropdown
        v-model="form.competitor_to_merge"
        :list="
          competitors.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        label="Competitor to Merge:"
        :validator="RequiredField('a competitor to merge', true)"
        include-blank
        class="col-span-2"
      />
    </Form>
  </div>
</template>
