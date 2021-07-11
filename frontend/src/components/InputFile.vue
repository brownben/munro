<template>
  <div>
    <label class="block pb-1 text-gray-600 select-none font-heading">
      {{ label }}
    </label>
    <p
      class="flex flex-row justify-between w-full px-3 py-2 font-sans transition duration-300 ease-in-out bg-white border outline-none appearance-none rounded-shape focus:shadow-outline focus:border-main-400"
    >
      <span
        class="inline-block"
        :class="
          fileName === 'Select a File'
            ? 'text-gray-600 select-none'
            : 'text-gray-900'
        "
      >
        {{ fileName || 'Select a File' }}
      </span>
      <label
        :tabindex="0"
        for="file"
        class="z-10 inline-block h-full px-4 py-2 -mt-2 -mb-4 -mr-3 text-gray-500 transition duration-300 border-l outline-none appearance-none select-none rounded-shape hover:text-main-700 hover:bg-main-100 font-heading focus:text-main-700 focus:bg-main-100 focus:shadow-outline hover:shadow-outline"
      >
        Browse for File
      </label>
      <input
        id="file"
        type="file"
        accept=".csv"
        class="hidden outline-none"
        @change="fileChange"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
})
const emit = defineEmits({ file: (_fileContents: string) => true })

const fileName = ref('')

const fileChange = (event: Event) => {
  // When the file selected has been changed
  const target = event.target as HTMLInputElement
  const files = target.files
  const file = files?.item(0)

  if (!file) return
  fileName.value = file.name
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
