import { defineStore } from 'pinia'
import { postData } from '../api/requests'

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
      return postData<User>({
        apiLocation:
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ',
        data: {
          email: username,
          password,
          returnSecureToken: true,
        },
        useServerErrorMessage: false,
        customErrorHandler: true,
        noToken: true,
      }).then((user?: User) => {
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
    userToken() {
      return this.user?.idToken
    },
    loggedIn() {
      return !!this.user?.idToken
    },
    userName() {
      return this.user?.displayName
    },
  },
})
