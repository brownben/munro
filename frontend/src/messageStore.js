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

    setTimeout((id) => { this.removeMessage(id) }, 15000, id)
  },

  clearMessages: function () {
    this.messages.splice(0, this.messages.length)
  },

  removeMessage: function (id) {
    this.messages.splice(this.messages.map(message => message.id).indexOf(id), 1)
  },
}
