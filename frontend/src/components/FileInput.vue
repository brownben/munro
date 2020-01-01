<template>
  <div class="file-input relative top--4">
    <label
      class="font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"
    >{{ label }}</label>
    <p
      class="w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none truncate"
    >
      {{ fileName }}
      <label
        for="file"
        class="absolute right-0 px-4 border-l border-r border-main rounded-tl-lg rounded-br-lg text-white bg-main hover:text-main hover:bg-white py-2 mt--2 font-heading inline-block"
      >Browse for File</label>
      <input id="file" type="file" accept=".csv" class="hidden" @change="fileChange" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'FileInput',

  props: {
    'value': {
      type: String,
      default: '',
    },
    'label': {
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
<style scoped>
label {
  transition: 0.3s;
}
</style>
