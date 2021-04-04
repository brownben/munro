<template>
  <Layout title="Admin Login">
    <Meta title="Munro - Login" description="" :block-robots="true" />
    <form class="col-span-2" @submit.prevent="sendLoginRequest">
      <InputText
        v-model="username"
        label="Email Address:"
        type="email"
        :validator="IsValidEmail()"
      />
      <InputText
        v-model="password"
        label="Password:"
        type="password"
        class="mt-4"
        :validator="RequiredField('a password')"
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
import { useStore } from 'vuex'

import Layout from '../../components/Layout.vue'
import InputText from '../../components/InputText.vue'

import { toSingleString } from '../../scripts/typeHelpers'
import { RequiredField, IsValidEmail } from '../../scripts/inputValidation'

const store = useStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const blankFields = () => {
  username.value = ''
  password.value = ''
}

const sendLoginRequest = () => {
  return store
    .dispatch('login', {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      if (response) router.replace(toSingleString(route.query.redirect || '/'))
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
