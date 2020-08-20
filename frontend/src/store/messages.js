export default {
  state: () => ({
    messages: [],
    currentMessageId: 0,
  }),

  mutations: {
    addMessage: (state, value) => {
      state.currentMessageId += 1

      state.messages.push({
        id: state.currentMessageId,
        text: value,
      })

      return state.currentMessageId
    },

    removeMessage: (state, id) => {
      const messageId = state.messages.map((message) => message.id).indexOf(id)
      return state.messages.splice(messageId, 1)
    },

    clearAllMessages: (state) =>
      state.messages.splice(0, state.messages.length),
  },

  actions: {
    createMessage: (context, text) => {
      const id = context.commit('addMessage', text)
      setTimeout((id) => context.commit('removeMessage', id), 15000, id)
    },
  },

  getters: {
    allMessages: (state) => state.messages,
  },
}
