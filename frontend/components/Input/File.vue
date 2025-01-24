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
      class="block pb-2 text-sm font-medium text-gray-600 select-none dark:text-gray-300"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      type="file"
      class="-ml-2 p-2 text-base font-medium text-gray-600 outline-hidden dark:text-gray-300"
      accept=".csv,.xml,.html"
      required
      @change="fileChange"
    />
  </div>
</template>
<style>
@reference "../../assets/main.css";

input[type='file']::file-selector-button {
  @apply from-main-500 to-main-600 mr-4 rounded border-0 bg-linear-to-r px-5 py-2 text-sm font-medium text-white outline-hidden transition duration-200 select-none dark:ring-offset-gray-800;
}

input[type='file']::file-selector-button:focus {
  @apply ring-main-600 ring ring-offset-2;
}

input[type='file']:focus {
  @apply outline-hidden;
}

input[type='file']::file-selector-button:hover {
  @apply from-main-600 to-main-700 shadow;
}
</style>
