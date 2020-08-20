<!--
  Login

  The login page to gain access to admin functions
-->

<template>
  <Layout title="Admin Login">
    <Meta
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Login"
      description
    />
    <form class="col-span-2" @submit.prevent="sendLoginRequest">
      <TextInput v-model="username" label="Email Address:" type="email" />
      <TextInput
        v-model="password"
        label="Password:"
        type="password"
        class="mt-4"
      />

      <button class="mt-6 button-lg">
        Login
      </button>
    </form>

    <div class="col-span-2 p-4 card card-color">
      <p>
        <b
          class="block mb-2 text-xl font-heading md:m-0 md:text-lg md:inline-block md:mr-4"
        >
          Looking for Results Upload?
        </b>
        You don't have to login, just visit the
        <router-link to="/upload" class="link">
          upload page
        </router-link>
      </p>
    </div>
  </Layout>
</template>

<script>
import auth from '/@/authentication'

import Layout from '/@/components/Layout.vue'
import TextInput from '/@/components/inputs/TextInput.vue'

export default {
  components: {
    Layout,
    TextInput,
  },

  data() {
    return {
      username: '',
      password: '',
    }
  },

  mounted: function () {
    if (this.$auth.user) {
      this.$store.dispatch('createMessage', 'You Are Already Logged In')
      this.$router.push('/')
    }
    this.blankFields()
    if (this.$route.query.redirect)
      this.$store.dispatch('createMessage', 'Please Login to Access that Page')
  },

  methods: {
    blankFields: function () {
      this.username = ''
      this.password = ''
    },

    validateLogin: function () {
      return this.username !== '' && this.password !== ''
    },

    sendLoginRequest: function () {
      if (this.validateLogin()) {
        return auth
          .login(this.username, this.password)
          .then((response) => {
            if (response)
              this.$router.replace(this.$route.query.redirect || '/')
            this.$store.dispatch(
              'createMessage',
              `Hello ${this.$auth.user.displayName || 'Admin'}`
            )
            this.blankFields()
          })
          .catch(() =>
            this.$store.dispatch(
              'createMessage',
              'Error: Problem Logging In - Please Try Again'
            )
          )
      } else
        this.$store.dispatch(
          'createMessage',
          'Problem: Username or Password were left Blank'
        )
    },
  },
}
</script>
