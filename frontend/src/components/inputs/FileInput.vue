<template>
  <div>
    <label class="block pb-1 select-none font-heading text-main-600">{{
      label
    }}</label>
    <p
      class="w-full pl-3 truncate transition-all duration-300 border-2 border-opacity-0 outline-none rounded-shape text-body bg-main-100 border-main focus:border-opacity-100"
    >
      <span class="inline-block py-2">
        {{ fileName }}
      </span>
      <label
        tabindex="0"
        for="file"
        class="z-10 inline-block float-right h-full px-4 py-2 transition duration-300 border border-opacity-0 appearance-none select-none rounded-shape bg-main-200 text-main-700 hover:text-main-800 hover:bg-main-300 border-main-600 font-heading focus:border-opacity-100 oultine-none"
      >
        Browse for File
      </label>
      <input
        id="file"
        type="file"
        accept=".csv"
        class="hidden"
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
