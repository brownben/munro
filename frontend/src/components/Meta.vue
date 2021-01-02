<template>
  <div class="hidden" />
</template>
<script>
import headful from 'headful'

const handler = (props) => headful(getPassedProps(props))

export default {
  props: Object.keys(headful.props || {}),
  watch: {
    $props: {
      handler,
      deep: true,
      immediate: true,
    },
  },
}

const getPassedProps = (props) =>
  Object.keys(props).reduce((passedProps, propKey) => {
    if (props[propKey] !== undefined) passedProps[propKey] = props[propKey]
    return passedProps
  }, {})
</script>
