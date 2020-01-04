<!--
  Login

  The login page to gain access to admin functions
-->

<template>
  <div class="view">
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'noindex' },
      }"
      title="Munro - Login"
      description
    />
    <h1 class="text-main text-2xl font-heading my-2">Admin Login</h1>
    <form @submit.prevent="sendLoginRequest">
      <text-input v-model="username" label="Email Address:" type="email" />
      <text-input v-model="password" label="Password:" type="password" />
      <button class="button-lg">Login</button>
    </form>
    <div class="mt-4 card-color">
      <p>
        <b class="font-heading p-2 text-lg">Looking for Results Upload?</b>
        You don't have to login, just visit the
        <router-link to="/upload" class="link">upload page</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import auth from '@/authentication'
import TextInput from '@/components/TextInput'

export default {
  components: {
    TextInput,
  },

  data() {
    return {
      username: '',
      password: '',
    }
  },

  mounted: function() {
    if (this.$auth.user) {
      this.$messages.addMessage('You Are Already Logged In')
      this.$router.push('/')
    }
    this.blankFields()
    if (this.$route.query.redirect)
      this.$messages.addMessage('Please Login to Access that Page')
  },

  methods: {
    blankFields: function() {
      this.username = ''
      this.password = ''
    },

    validateLogin: function() {
      return this.username !== '' && this.password !== ''
    },

    sendLoginRequest: function() {
      if (this.validateLogin()) {
        return auth
          .login(this.username, this.password)
          .then(response => {
            if (response)
              this.$router.replace(this.$route.query.redirect || '/')
            this.$messages.addMessage('Hello')
            this.blankFields()
          })
          .catch(() =>
            this.$messages.addMessage(
              'Error: Problem Logging In - Please Try Again'
            )
          )
      } else
        this.$messages.addMessage(
          'Problem: Username or Password were left Blank'
        )
    },
  },
}
</script>
