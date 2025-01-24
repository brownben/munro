<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  button: { type: String, default: '' },
  action: { type: Function, default: () => null },
  disabled: { type: Boolean, default: false },
})
const message = ref('')
const loading = ref(false)
const submit = async () => {
  message.value = ''
  loading.value = true

  try {
    await props.action()
  } catch (error) {
    if (typeof error === 'string') message.value = error
    else throw error
  }
  loading.value = false
}
</script>

<template>
  <form
    class="mx-auto grid max-w-(--breakpoint-lg) grid-cols-1 gap-6 px-6 py-8 sm:py-10 md:grid-cols-3 lg:px-8"
    :disabled="disabled"
    @submit.prevent="submit"
  >
    <slot />
    <div
      v-if="message"
      class="border-main-100 bg-main-50 text-main-800 col-span-2 flex flex-row items-center gap-4 rounded-sm border p-4 leading-tight select-auto"
      role="alert"
    >
      <ExclamationCircleIcon aria-hidden="true" class="h-6 w-6 shrink-0" />
      {{ message }}
    </div>
    <div v-if="!disabled" class="col-span-2 flex justify-end">
      <Button :loading="loading">{{ button }}</Button>
    </div>
  </form>
</template>
