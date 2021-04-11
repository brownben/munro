<template>
  <Layout title="Upload Results File">
    <Meta
      title="Munro - Upload Results File"
      description="Upload Results Files to Munro - League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munroleagues.com/upload/file"
      :block-robots="false"
    />
    <div class="col-span-2 card card-color">
      <p>
        For instructions on how to upload results please visit
        <router-link
          to="/upload/instructions"
          class="inline ml-1 text-white link"
        >
          /upload/instructions
        </router-link>
      </p>
    </div>

    <div class="col-span-2">
      <InputText
        v-model.lazy="uploadConfig.eventId"
        label="Event ID:"
        url-parameter="eventId"
        :validators="[RequiredField('an event id')]"
      />

      <p v-if="uploadConfig.eventId" class="my-4">
        <b class="mr-2 text-main-800">Event Name:</b>
        {{ event?.name }}
      </p>

      <InputText
        v-model.trim="uploadConfig.uploadKey"
        label="Upload Key:"
        class="mt-4"
        url-parameter="uploadKey"
        :validators="[RequiredField('an upload key')]"
      />

      <!-- If Event already have results, confirm they want to overwrite -->
      <InputCheckbox
        v-if="event?.resultUploaded"
        v-model="uploadConfig.overwrite"
        label="Overwrite Existing Results"
        class="my-6 text-left"
      />

      <InputFile label="Results File:" class="mt-4" @file="fileRead" />

      <InputText
        v-model.trim="uploadConfig.results"
        label="Results (URL):"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="uploadConfig.routegadget"
        label="Routegadget (URL):"
        type="url"
        class="mt-4"
      />
      <InputText
        v-model.trim="uploadConfig.winsplits"
        label="Winsplits: (URL):"
        type="url"
        class="mt-4"
      />

      <!-- Only show upload once all fields have been filled -->
      <button
        v-if="
          uploadConfig.eventId && uploadConfig.uploadKey && uploadConfig.file
        "
        class="mt-6 button-lg"
        @click="uploadFile"
      >
        Upload File
      </button>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'
import InputFile from '../components/InputFile.vue'
import InputCheckbox from '../components/InputCheckbox.vue'

import { useEvent } from '../api/events'
import { uploadFile as apiUploadFile } from '../api/upload'

import { useMessages } from '../store/messages'

import { RequiredField } from '../scripts/inputValidation'

const router = useRouter()
const messages = useMessages()

const uploadConfig = ref<UploadFile>({
  eventId: '',
  uploadKey: '',
  file: '',
  overwrite: false,
  results: '',
  routegadget: '',
  winsplits: '',
})
const eventId = computed(() => uploadConfig.value.eventId)
const [event] = useEvent(eventId)

watchEffect(() => {
  if (event.value) {
    uploadConfig.value.results = event.value.results
    uploadConfig.value.winsplits = event.value.winsplits
    uploadConfig.value.routegadget = event.value.routegadget
  }
})

const fileRead = (file: string) => {
  uploadConfig.value.file = file
}
const uploadFile = () => {
  messages.create('Upload Data Sent')
  return apiUploadFile(uploadConfig.value)
    .then(() => router.push(`/events/${eventId.value}/results`))
    .catch(() => false)
}
</script>
