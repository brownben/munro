/*
  messageStore.js

  Manages the messages, contains array of messages and manages clearing/ removing them.
  Each message is given a unique id so it can be easily selected. All messages are dismissed after 15s
*/

export default {
  messages: [],
  id: 0,

  addMessage: function (value) {
    const id = this.id
    this.id += 1

    this.messages.push({
      id: id,
      text: value,
    })

    // Remove message after 15s
    setTimeout((id) => this.removeMessage(id), 15000, id)
  },

  clearMessages: function () {
    // Clear messages in a way whch can be tracked by VueJS object tracker, so view can be refreshed
    this.messages.splice(0, this.messages.length)
  },

  removeMessage: function (id) {
    this.messages.splice(
      this.messages.map((message) => message.id).indexOf(id),
      1
    )
  },
}
