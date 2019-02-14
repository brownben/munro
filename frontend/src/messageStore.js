export default {
  messages: [],
  id: 0,

  addMessage: function (value) {
    this.messages.push({
      id: this.id,
      text: value,
    })
    this.id += 1

    setTimeout((id) => { this.removeMessage(id) }, 15000, this.id)
  },

  clearMessages: function () {
    this.messages.splice(0, this.messages.length)
  },

  removeMessage: function (id) {
    this.messages.splice(this.messages.map(message => message.id).indexOf(id), 1)
  },
}
