<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
})

const emit = defineEmits({
  file: (fileContents: string) => fileContents || true,
})

const fileChange = (event: Event) => {
  // When the file selected has been changed
  const target = event.target as HTMLInputElement
  const files = target.files
  const file = files?.item(0)

  if (!file) return
  readFile(file)
}

const readFile = (file: Blob) => {
  // read file using FileReader and save in data
  const reader = new FileReader()
  reader.onload = readFileResult
  reader.readAsText(file)
}

const readFileResult = (result: ProgressEvent<FileReader>) =>
  emit('file', result.target?.result?.toString() ?? '')
</script>

<template>
  <div>
    <label
      class="block select-none pb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      type="file"
      class="-ml-2 p-2 text-base font-medium text-gray-600 outline-none dark:text-gray-300"
      accept=".csv,.xml,.html"
      required
      @change="fileChange"
    />
  </div>
</template>
<style>
input[type='file']::file-selector-button {
  @apply mr-4 select-none rounded border-0 bg-gradient-to-r from-main-500 to-main-600 px-5 py-2 text-sm font-medium  text-white outline-none transition duration-200 dark:ring-offset-gray-800;
}

input[type='file']::file-selector-button:focus {
  @apply ring ring-main-600 ring-offset-2;
}

input[type='file']:focus {
  @apply outline-none;
}

input[type='file']::file-selector-button:hover {
  @apply from-main-600 to-main-700 shadow;
}
</style>
