<template>
  <Layout title="Admin Login">
    <Meta title="Munro - Login" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="sendLoginRequest">
      <InputText
        v-model="username"
        label="Email Address:"
        type="email"
        :validators="[IsValidEmail()]"
      />
      <InputText
        v-model="password"
        label="Password:"
        type="password"
        class="mt-4"
        :validators="[RequiredField('a password')]"
      />
      <button class="mt-6 button-lg">Login</button>
    </form>

    <div class="col-span-2 p-4 card card-color">
      <p>
        <b
          class="block mb-2 text-xl font-heading md:m-0 md:text-lg md:inline-block md:mr-4"
        >
          Looking for Results Upload?
        </b>
        You don't have to login, just visit the
        <router-link to="/upload" class="link"> upload page </router-link>
      </p>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Layout from '../../components/Layout.vue'
import InputText from '../../components/InputText.vue'

import { useMessages } from '../../store/messages'
import { useAuthentication } from '../../store/authentication'

import { toSingleString } from '../../scripts/typeHelpers'
import { RequiredField, IsValidEmail } from '../../scripts/inputValidation'

const router = useRouter()
const route = useRoute()
const messages = useMessages()
const auth = useAuthentication()

const username = ref('')
const password = ref('')

const blankFields = () => {
  username.value = ''
  password.value = ''
}

const sendLoginRequest = () => {
  return auth
    .login({
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      if (response) router.replace(toSingleString(route.query.redirect || '/'))
      messages.create(`Hello ${auth.userName || 'Admin'}`)
      blankFields()
    })
    .catch(() =>
      messages.create('Error: Problem Logging In - Please Try Again')
    )
}

onMounted(() => {
  if (auth.loggedIn) {
    messages.create('You Are Already Logged In')
    router.push('/')
  }
  blankFields()
  if (route.query.redirect) messages.create('Please Login to Access that Page')
})
</script>
