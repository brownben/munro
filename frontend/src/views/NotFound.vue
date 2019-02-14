<template>
  <div>
    <h1>Sorry We Can't Find What You Are Looking For</h1>
    <p>Please check the URL and Try Again</p>
    <button @click="$router.go(-1)">Go Back</button>
    <button @click="$router.push('/')">Return Home</button>
  </div>
</template>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

#router-view
  margin-left: 5%
  padding-top: 1rem
  width: 90%

div
  margin: 1rem

p
  padding: 0.5rem 0

button
  margin-top: 0.25rem
  margin-right: 1rem
</style>
