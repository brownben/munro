import { createStore } from 'vuex'

import messages from './messages'
import auth from './authentication'

export interface State {
  user: {
    idToken?: string
    displayName?: string
  }
  messages: {
    id: number
    text: string
  }[]
  currentMessageId: number
}

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    messages,
    auth,
  },
})
