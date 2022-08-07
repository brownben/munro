<script setup lang="ts">
import { RequiredField, IsValidTimeRequired } from '~/utils/validation'
import type { Event } from '~~/api-types'

const route = useRoute()
const router = useRouter()

const { data: events } = await useData<Event[]>('events/results-submission')

const form = reactive({
  event: queryToString(route.query.event ?? ''),
  name: queryToString(route.query.name ?? ''),
  course: queryToString(route.query.course ?? ''),
  time: queryToString(route.query.time ?? ''),
})

const action = async () => {
  try {
    await usePost(`upload/result`, toRaw(form))
    await router.replace(`/events/${form.event}/results`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem adding result, please try again.'
  }
}

useTitle({
  title: 'Submit Result',
  description: 'Manually submit a result for an event',
})
</script>

<template>
  <div>
    <Heading title="Submit Result" />
    <Form button="Submit Result" :action="action">
      <InputDropdown
        v-model="form.event"
        :list="events?.map((event) => ({ value: event.id, text: event.name }))"
        label="Event:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('an event ID')"
      />
      <Input
        v-model="form.name"
        label="Your Name:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('your name')"
      />
      <Input
        v-model="form.course"
        label="Your Course:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('your course')"
      />
      <Input
        v-model="form.time"
        label="Your Time:"
        type="text"
        class="col-span-2"
        :validator="IsValidTimeRequired"
      />
    </Form>
  </div>
</template>
