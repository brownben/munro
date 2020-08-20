import { createStore } from 'vuex'

import messages from './messages'
import auth from './authentication'

export default createStore({
  modules: {
    messages,
    auth,
  },
})
