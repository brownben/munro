<script setup lang="ts">
import {
  IsValidURLParameter,
  IsValidURL,
  RequiredField,
} from '~/utils/validation'
import type { Event } from '~~/api-types'

requireLogin()

const route = useRoute()
const router = useRouter()

const { data: form } = await useData<Event>(`events/${route.params.id}`)

const action = async () => {
  try {
    await usePut(`events/${route.params.id}`, form.value ?? {})
    router.back()
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem updating event, please try again.'
  }
}

useTitle({
  title: 'Update Event',
  description: 'Update the details for an event',
})
</script>

<template>
  <div v-if="form">
    <Heading title="Update Event" />

    <Form button="Update" :action="action">
      <FormHeading
        title="Basic Information"
        description="The identifying data for the event. Name, date and league are required fields."
      />
      <Input
        v-model.trim="form.name"
        label="Name:"
        class="col-span-2"
        :validator="IsValidURLParameter('a name')"
      />
      <Input
        v-model.trim="form.date"
        label="Date:"
        class="col-span-2"
        type="date"
        :validator="RequiredField('a date')"
      />
      <Input
        v-model.trim="form.organiser"
        label="Organiser:"
        class="col-span-2"
      />
      <Input
        v-model.trim="form.website"
        label="Website: (URL)"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input v-model.trim="form.part_of" label="Part of:" class="col-span-2" />
      <InputTextarea
        v-model.trim="form.more_information"
        label="More Information:"
        class="col-span-2"
      />

      <FormHeading
        title="Results Links"
        description="Add links to other results display and analysis sites."
      />
      <Input
        v-model="form.results_links['Standard Results']"
        label="Standard HTML Results:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['Routegadget']"
        label="Routegadget:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['Winsplits']"
        label="Winsplits:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['Livelox']"
        label="Livelox:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
      <Input
        v-model="form.results_links['GPS Tracking']"
        label="GPS Tracking:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />

      <FormHeading
        title="Scoring"
        description="Adjust how the event is scored in the league"
      />
      <InputSwitch
        v-model="form.allow_user_submitted_results"
        label="Allow users to submit results?"
        description="Let users add their times to the results"
        class="col-span-2 py-2"
      />
    </Form>
  </div>
  <LazyError v-else />
</template>
