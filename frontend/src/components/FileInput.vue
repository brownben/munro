<template>
  <div class="relative file-input top--4">
    <label
      class="relative p-1 pb-0 mx-3 text-sm bg-white select-none font-heading text-main bottom--3"
      >{{ label }}</label
    >
    <p
      class="w-full px-4 py-2 truncate border outline-none border-main rounded-shape text-body"
    >
      {{ fileName }}
      <label
        for="file"
        class="absolute right-0 inline-block px-4 py-2 text-white border-l border-r border-main rounded-shape bg-main hover:text-main hover:bg-white mt--2 font-heading"
        >Browse for File</label
      >
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
<style>
label {
  transition: 0.3s;
}

.mt--2 {
  margin-top: -0.5rem;
}

.top--4 {
  top: -1rem;
}

.bottom--3 {
  bottom: -0.75rem;
}
</style>
