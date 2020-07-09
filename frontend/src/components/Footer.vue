<template>
  <footer class="p-2 mt-2 text-lg text-center text-main font-body">
    <p class="inline-block mr-4 md:mr-6">
      Created By
      <a href="https://brownben.github.io" class="font-heading">Ben Brown</a>
    </p>
    <router-link v-if="!auth.user" to="/login" class="inline-block px-2 link"
      >Admin Login</router-link
    >
    <router-link v-else to="/logout" class="inline-block px-2 link"
      >Logout</router-link
    >
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      auth: this.$auth,
    }
  },
}
</script>
