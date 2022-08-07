import type { Ref } from 'vue'

interface User {
  idToken: string
  displayName?: string
}

const useUserState = () => useState<User | null>('user')

export const useUserCookie = () =>
  useCookie<User | null>('user', { maxAge: 3600, sameSite: true })

export const loginRequest = async (
  email: Ref<string>,
  password: Ref<string>
) => {
  const { idToken, displayName } = await $fetch<User>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ',
    {
      body: {
        email: email.value,
        password: password.value,
        returnSecureToken: true,
      },
      method: 'POST',
    }
  )
  useUserCookie().value = { idToken, displayName }
  useUserState().value = { idToken, displayName }
}

export const logoutRequest = () => {
  useUserCookie().value = null
  useUserState().value = null
}

export const useUser = () => {
  const cookie = useUserCookie()
  const user = useUserState()

  if (cookie.value && !user.value) user.value = cookie.value

  return user
}

export const useLoggedIn = () => {
  const user = useUser()

  return computed(() => !!user.value?.idToken)
}

export const redirect = async (path: string) => {
  const app = useNuxtApp()
  if (app.ssrContext) {
    app.ssrContext.res.writeHead(302, { Location: path })

    return app.ssrContext.res.end()
  }

  return await useRouter().push(path)
}

export const useRequireAuthentication = async () => {
  const user = useLoggedIn()

  if (!user.value) return redirect('/login')
}
