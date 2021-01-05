import { GetterTree, MutationTree, ActionTree } from 'vuex'

export interface message {
  id: number
  text: string
}

class State {
  messages: message[] = []
  currentMessageId: number = 0
}

const mutations = <MutationTree<State>>{
  addMessage: (state, value: string) => {
    state.currentMessageId += 1

    state.messages.push({
      id: state.currentMessageId,
      text: value,
    })

    return state.currentMessageId
  },

  removeMessage: (state, id: number) => {
    const messageId = state.messages.map((message) => message.id).indexOf(id)
    return state.messages.splice(messageId, 1)
  },

  clearAllMessages: (state) => state.messages.splice(0, state.messages.length),
}

const actions = <ActionTree<State, string>>{
  createMessage: (context, text: string) => {
    const id = context.commit('addMessage', text)
    setTimeout((id: number) => context.commit('removeMessage', id), 15000, id)
  },
}

const getters = <GetterTree<State, any>>{
  allMessages: (state) => state.messages,
}

export default {
  state: new State(),
  mutations,
  actions,
  getters,
}
