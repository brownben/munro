import { createStore } from 'vuex'
import messages from './messages'

export default createStore({
  modules: {
    messages: messages,
  },
})
