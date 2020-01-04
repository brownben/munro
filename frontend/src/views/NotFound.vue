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
    <div class="card mt-5">
      <h1 class="text-main text-3xl font-heading my-2">
        Sorry We Can't Find What You Are Looking For
      </h1>
      <p>Please check the URL and Try Again</p>
      <div>
        <button class="button inline-block" @click="$router.go(-1)">
          Go Back
        </button>
        <router-link to="/" class="button inline-block"
          >Return Home</router-link
        >
      </div>
    </div>
  </div>
</template>
