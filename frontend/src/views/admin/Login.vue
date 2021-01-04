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
import { useStore } from '../../store'

import Layout from '/@/components/Layout.vue'
import TextInput from '/@/components/inputs/TextInput.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const blankFields = () => {
  username.value = ''
  password.value = ''
}

const validateLogin = () => username.value !== '' && password.value !== ''

const sendLoginRequest = () => {
  if (validateLogin())
    return store
      .dispatch('login', {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        if (response) router.replace(route.query.redirect || '/')
        store.dispatch(
          'createMessage',
          `Hello ${store.getters.userName || 'Admin'}`
        )
        blankFields()
      })
      .catch(() =>
        store.dispatch(
          'createMessage',
          'Error: Problem Logging In - Please Try Again'
        )
      )
  else
    store.dispatch(
      'createMessage',
      'Problem: Username or Password were left Blank'
    )
}

onMounted(() => {
  if (store.getters.loggedIn) {
    store.dispatch('createMessage', 'You Are Already Logged In')
    router.push('/')
  }
  blankFields()
  if (route.query.redirect)
    store.dispatch('createMessage', 'Please Login to Access that Page')
})
</script>
