import { defineStore } from 'pinia'

export interface Message {
  id: number
  text: string
  visible: boolean
}

interface State {
  messages: Message[]
  currentMessageId: number
}

export const useMessages = defineStore({
  id: 'messages',

  state: (): State => ({
    messages: [],
    currentMessageId: 0,
  }),

  actions: {
    create(text: string) {
      const id = this.currentMessageId++
      this.messages.push({
        id,
        text,
        visible: true,
      })
      setTimeout((id: number) => this.remove(id), 15000, id)
    },

    remove(id: number) {
      this.messages.map((message) => {
        if (message.id === id) message.visible = false
        return message
      })
    },
  },

  getters: {
    all(state) {
      return state.messages
    },
  },
})
