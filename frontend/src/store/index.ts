import { createStore } from 'vuex'

import messages from './messages'
import auth from './authentication'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    messages,
    auth,
  },
})
