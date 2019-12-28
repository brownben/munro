<!--
  Login

  The login page to gain access to admin functions
-->

<template>
  <div>
    <vue-headful
      title="Munro - Login"
      description
      :head="{
        'meta': {name: 'robots', content:'noindex'},
      }"
    />
    <h1>Admin Login</h1>
    <form @submit.prevent="sendLoginRequest">
      <label>Email Address:</label>
      <input v-model="username" type="email">
      <label>Password:</label>
      <input v-model="password" type="password">
      <button>Login</button>
    </form>
    <div id="link-to-upload">
      <b>Looking for Results Upload?</b>
      <p>
        Results are uploaded
        <router-link to="/upload">here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import auth from '@/authentication'

export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },

  mounted: function () {
    if (this.$auth.user) {
      this.$messages.addMessage('You Are Already Logged In')
      this.$router.push('/')
    }
    this.blankFields()
    if (this.$route.query.redirect) this.$messages.addMessage('Please Login to Access that Page')
  },

  methods: {
    blankFields: function () {
      this.username = ''
      this.password = ''
    },

    validateLogin: function () {
      return (this.username !== '' && this.password !== '')
    },

    sendLoginRequest: function () {
      if (this.validateLogin()) {
        return auth.login(this.username, this.password)
          .then(response => {
            if (response) this.$router.replace(this.$route.query.redirect || '/')
            this.$messages.addMessage('Hello')
            this.blankFields()
          })
          .catch(() => this.$messages.addMessage('Error: Problem Logging In - Please Try Again'))
      }
      else this.$messages.addMessage('Problem: Username or Password were left Blank')
    },
  },
}

</script>
<style lang="stylus" scoped>
@import '../assets/styles/helpers.styl'
@import '../assets/styles/inputs.styl'

h1
  margin-bottom: 0.5rem

#link-to-upload
  margin: 0
  padding: 1rem 0
  width: 100%

  p, b
    display: inline-block
    padding: 0.25rem

a
  color: main-color

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
