<template>
  <div class="hidden" />
</template>
<script>
import { defineComponent } from 'vue'
import headful from 'headful'

const handler = (props) => headful(getPassedProps(props))

const getPassedProps = (props) =>
  Object.keys(props).reduce((passedProps, propKey) => {
    if (props[propKey] !== undefined) passedProps[propKey] = props[propKey]
    return passedProps
  }, {})

export default defineComponent({
  props: Object.keys(headful.props || {}),
  watch: {
    $props: {
      handler,
      deep: true,
      immediate: true,
    },
  },
})
</script>
