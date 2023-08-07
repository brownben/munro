<script setup lang="ts">
import { RequiredField } from '~/utils/validation'
import { competitorToText } from '~/utils/competitor'
import type { Competitor } from '~/api-types'

const props = defineProps({
  result: { type: Number, required: true },
  competitorPool: { type: String, required: true },
})
const emit = defineEmits(['result-changed'])

const { data: competitors } = await useData<Competitor[]>(
  `competitor-pools/${props.competitorPool}/competitors`,
)

const competitor = ref('')

const action = async () => {
  try {
    await usePost(`results/transfer`, {
      competitor: competitor.value,
      result: props.result,
    })
    emit('result-changed')
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem transfering result, please try again.'
  }
}
</script>
<template>
  <div class="-mx-6">
    <Form button="Transfer" :action="action">
      <InputDropdown
        v-model="competitor"
        :list="
          competitors?.map((competitor) => ({
            value: competitor.id.toString(),
            text: competitorToText(competitor),
          }))
        "
        label="Tranfer To:"
        class="col-span-2"
        :validator="
          RequiredField('a competitor to transfer the result to', true)
        "
      />
    </Form>
  </div>
</template>
