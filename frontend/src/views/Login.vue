<!--
  Login

  The login page to gain access to admin functions
-->

<template>
  <div>
    <h1>Admin Login</h1>
    <form @submit.prevent="sendLoginRequest()">
      <label>Email Address:</label>
      <input v-model="username" type="text">
      <label>Password:</label>
      <input v-model="password" type="password">
      <button>Login</button>
    </form>
    <div id="link-to-upload">
      <h3>Looking for Results Upload?</h3>
      <p>
        Results are uploaded
        <router-link to="/upload">Here</router-link>
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
    if (this.$auth.user) this.$router.push('/')
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

#router-view
  margin-left: 5%
  padding-top: 1rem
  width: 90%

#container
  margin-left: 5%
  width: 90%

h1
  margin-bottom: 0.5rem

button
  margin-top: 0.5rem

input
  width: 100% !important

#link-to-upload
  margin: 0
  padding: 1rem 0
  width: 100%

  p, h3
    display: inline-block

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
