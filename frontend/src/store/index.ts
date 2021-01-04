import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import messages from './messages'
import auth from './authentication'

export interface State {
  messages: {
    id: number
    text: string
  }[]
  currentMessageId: number
  user: {
    idToken?: string
    displayName?: string
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    messages,
    auth,
  },
})

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key)
}
