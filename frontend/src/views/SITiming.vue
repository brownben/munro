<template>
  <Layout title="View SI Timing Results" thin>
    <Meta
      title="Munro - View SITiming Results"
      description="View results exported from SITiming in a better format. League Results. Sorted. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      :block-robots="false"
    />
    <form
      class="col-span-2"
      @submit.prevent="$router.push(`/sitiming/${encodeURIComponent(url)}`)"
    >
      <InputText
        v-model="url"
        label="URL of HTML Results:"
        type="url"
        :validators="[RequiredField('a URL.')]"
      />

      <button class="mt-6 button-lg">View Results</button>
    </form>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Layout from '../components/Layout.vue'
import InputText from '../components/InputText.vue'

import { RequiredField } from '../scripts/inputValidation'

const url = ref('')
</script>
