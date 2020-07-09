<!--
  Not Found

  Displayed when page is not found by the router, or data is not found from API
-->

<template>
  <div class="view">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Not Found"
      description
    />
    <div class="mt-5 card">
      <h1 class="my-2 text-3xl text-main font-heading">
        Sorry We Can't Find What You Are Looking For
      </h1>
      <p>Please check the URL and Try Again</p>
      <div>
        <button class="inline-block button" @click="$router.go(-1)">
          Go Back
        </button>
        <router-link to="/" class="inline-block button"
          >Return Home</router-link
        >
      </div>
    </div>
  </div>
</template>
