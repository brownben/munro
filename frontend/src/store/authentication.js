import axios from 'axios'

export default {
  state: () => ({
    user: {},
  }),

  mutations: {
    setUser: (state, user) => {
      state.user = user
    },

    clearUser: (state) => {
      state.user = {}
    },
  },

  actions: {
    login: (context, { username, password }) =>
      axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ',
          {
            email: username,
            password,
            returnSecureToken: true,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
        .then((user) => {
          context.commit('setUser', user)
          document.cookie = `token=${user.idToken};secure;samesite=strict;path=/`
          return context.state.user
        }),
    logout: (context) => {
      context.commit('clearUser')
      document.cookie = 'token=;secure;samesite=strict;path=/'
      return Promise.resolve(context.state.user)
    },
  },

  getters: {
    loggedIn: (state) => !!state.user.idToken,
    userName: (state) => state.user?.displayName,
  },
}
