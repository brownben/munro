<script setup lang="ts">
import { RequiredField, IsValidURL } from '~/utils/validation'
import type { Ref } from 'vue'
import type { Event } from '~~/api-types'

const route = useRoute()
const router = useRouter()

const form = reactive({
  event_id: queryToString(route.query.event_id ?? ''),
  upload_key: queryToString(route.query.upload_key ?? ''),
  file: '',
  results_links: {
    'Standard Results': '',
    Routegadget: '',
    Winsplits: '',
    'GPS Tracking': '',
  },
  overwrite: false,
})

const event: Ref<Event | null> = ref(null)
const eventPending = ref(true)
const getEvent = async () => {
  eventPending.value = true

  try {
    event.value = await useGet(`events/${form.event_id}`)
  } catch {
    event.value = null
  }
  eventPending.value = false
}

const action = async () => {
  try {
    await usePost(`upload/file`, toRaw(form))
    await router.replace(`/events/${form.event_id}/results`)
  } catch (error: any) {
    if (error.data && typeof error.data?.detail === 'string')
      throw error.data.detail
    else throw 'Problem sending file to the server, please try again.'
  }
}

onMounted(() => {
  if (form.event_id) getEvent()
})

useTitle({
  title: 'Upload File',
  description: 'Upload a results file to Munro',
})
</script>

<template>
  <div>
    <Heading title="Upload Results File" />

    <Form button="Upload" :action="action">
      <FormHeading
        title="Event Details"
        description="These details are required to identify the event. If you are unsure,
          ask your league administrator for the details."
      />

      <Input
        v-model="form.event_id"
        label="Event ID:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('an event ID')"
        @input="getEvent"
      />

      <p v-if="form.event_id && event" class="col-span-2">
        <b class="text-base font-bold text-gray-700">Event Name:</b>
        {{ event.name }}
      </p>
      <p v-else-if="form.event_id && !eventPending" class="col-span-2">
        <b class="text-base font-bold text-gray-700">
          No event found with the id "{{ form.event_id }}"
        </b>
      </p>

      <Input
        v-model="form.upload_key"
        label="Upload Key:"
        type="text"
        class="col-span-2"
        :validator="RequiredField('an upload key')"
      />

      <InputFile
        label="Results File:"
        class="col-span-2"
        @file="form.file = $event"
      />

      <InputSwitch
        v-if="event?.results_uploaded"
        v-model="form.overwrite"
        label="Overwrite existing results?"
        description="Replace exisiting results with new result in uploaded file"
        class="col-span-2 py-2"
      />

      <FormHeading
        title="Results Links"
        description=" Add links to other results display and analysis sites, these can be
          updated later - just ask your league administrator."
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
        v-model="form.results_links['GPS Tracking']"
        label="GPS Tracking:"
        type="url"
        class="col-span-2"
        :validator="IsValidURL"
      />
    </Form>
  </div>
</template>
