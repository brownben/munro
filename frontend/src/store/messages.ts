import { GetterTree, MutationTree, ActionTree } from 'vuex'

export interface message {
  id: number
  text: string
  visible: boolean
}

class State {
  messages: message[] = []
  currentMessageId: number = 0
}

const mutations = <MutationTree<State>>{
  addMessage: (state, { value, id }: { value: string; id: number }) =>
    state.messages.push({
      id: id,
      text: value,
      visible: true,
    }),

  removeMessage: (state, id: number) =>
    state.messages.map((message) => {
      if (message.id === id) message.visible = false
      return message
    }),

  clearAllMessages: (state) => state.messages.splice(0, state.messages.length),
}

const actions = <ActionTree<State, string>>{
  createMessage: (context, text: string) => {
    const id = context.state.currentMessageId++
    context.commit('addMessage', { value: text, id })
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
