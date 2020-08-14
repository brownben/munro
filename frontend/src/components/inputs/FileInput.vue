<template>
  <div>
    <label class="block pb-1 text-gray-600 select-none font-heading">{{
      label
    }}</label>
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
        {{ fileName }}
      </span>
      <label
        tabindex="0"
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

<script>
export default {
  name: 'FileInput',

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },

  emits: ['file'],

  data: () => ({
    fileName: 'Select a File',
  }),

  methods: {
    fileChange: function (event) {
      // When the file selected has been changed
      const storage = event.target || event.dataTransfer
      const files = storage.files
      if (!files || !files.length) return false
      this.fileName = files[0].name
      this.readFile(files[0])
    },

    readFile: function (file) {
      // read file using FileReader and save in data
      const reader = new FileReader()
      reader.onload = this.readFileResult
      reader.readAsText(file)
    },

    readFileResult: function (result) {
      this.$emit('file', result.target.result)
    },
  },
}
</script>
