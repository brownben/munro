<!--
  Not Found

  Displayed when page is not found by the router, or data is not found from API
-->

<template>
  <div>
    <vue-headful
      title="Munro - Not Found"
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <h1>Sorry We Can't Find What You Are Looking For</h1>
    <p>Please check the URL and Try Again</p>
    <button @click="$router.go(-1)">Go Back</button>
    <router-link to="/" class="button">Return Home</router-link>
  </div>
</template>

<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

p
  padding: 0.5rem 0

button
  margin-top: 0.25rem
  margin-right: 1rem
</style>
