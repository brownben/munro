import { defineStore } from 'pinia'
import { sendRequest } from '../api/fetch'

export interface User {
  idToken?: string
  displayName?: string
}

interface State {
  user: User
}

export const useAuthentication = defineStore({
  id: 'authentication',

  state: (): State => ({
    user: {},
  }),

  actions: {
    login({ username, password }: { username: string; password: string }) {
      const apiLocation =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ'
      const data = {
        email: username,
        password,
        returnSecureToken: true,
      }

      return sendRequest<User>(
        apiLocation,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
        {
          apiLocation,
          useServerErrorMessage: false,
          customErrorHandler: true,
        }
      ).then((user?: User) => {
        if (user === undefined) throw new Error()
        this.user = user
        return this.user
      })
    },

    logout() {
      this.user = {}
      return Promise.resolve(this.user)
    },
  },

  getters: {
    userToken(state) {
      return state.user?.idToken
    },
    loggedIn(state) {
      return !!state.user?.idToken
    },
    userName(state) {
      return state.user?.displayName
    },
  },
})
