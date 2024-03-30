<script setup lang="ts">
import { RequiredField, IsValidEmail } from '~/utils/validation'

if (useLoggedIn().value) await redirect('/')

const email = ref('')
const password = ref('')

const route = useRoute()
const router = useRouter()

const action = async () => {
  try {
    await loginRequest(email, password)

    router.replace(String(route.query.redirect) || '/')
  } catch {
    throw 'Incorrect email or password, please try again.'
  }
}

useTitle({ title: 'Login', description: 'Admin login page' })
</script>

<template>
  <div>
    <Heading title="Login">
      <template #description>
        <strong class="block pb-2 font-medium sm:inline">
          Looking for Results Upload?
        </strong>
        You don't have to login, just visit the
        <NuxtLink
          to="/upload"
          class="text-main-700 underline dark:text-main-600"
        >
          upload page
        </NuxtLink>
      </template>
    </Heading>
    <main>
      <Form button="Login" :action="action">
        <Input
          v-model="email"
          label="Email:"
          type="email"
          class="col-span-2"
          :validator="IsValidEmail"
        />
        <Input
          v-model="password"
          label="Password:"
          type="password"
          class="col-span-2"
          autocomplete="current-password"
          :validator="RequiredField('a password')"
        />
      </Form>
    </main>
  </div>
</template>
