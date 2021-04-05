import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { postData } from '../api/requests'

export interface user {
  idToken?: string
  displayName?: string
}

class AuthState {
  user: user = {}
}

const mutations = <MutationTree<AuthState>>{
  setUser: (state, user: user) => {
    state.user = user
  },

  clearUser: (state) => {
    state.user = {}
  },
}

const actions = <ActionTree<AuthState, string>>{
  login: (context, { username, password }) =>
    postData<user>({
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
    }).then((user?: user) => {
      if (user === undefined) throw new Error()
      context.commit('setUser', user)
      return context.state.user
    }),

  logout: (context) => {
    context.commit('clearUser')
    return Promise.resolve(context.state.user)
  },
}

const getters = <GetterTree<AuthState, string>>{
  userToken: (state) => state.user?.idToken,
  loggedIn: (state) => !!state.user?.idToken,
  userName: (state) => state.user?.displayName,
}

export default {
  state: new AuthState(),
  mutations,
  actions,
  getters,
}
