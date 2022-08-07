<script setup lang="ts">
import { IsValidRequiredURL } from '~/utils/validation'

const url = ref('')

useTitle({
  title: 'SITiming Results',
  description: 'View results from SITiming in a better format',
})
</script>

<template>
  <div>
    <Heading
      title="View SiTiming Results"
      tagline="View results from SiTiming in a better format"
    />
    <main>
      <Form
        button="View Results"
        :action="() => $router.push(`/sitiming/${encodeURIComponent(url)}`)"
      >
        <Input
          v-model="url"
          label="URL of Results:"
          type="url"
          class="col-span-2"
          :validator="IsValidRequiredURL"
        />
      </Form>
    </main>
  </div>
</template>
