<!--
  Messages

  Messages are displayed at the bottom of the screen. On enter and exit they slide and fade in. It monitors the
    message store and displays the messages
-->

<template>
  <transition name="fade">
    <transition-group
      v-show="messages.length > 0"
      id="messages"
      tag="div"
      name="messages"
      mode="out-in"
      class="fixed bottom-0 right-0 mx-4 my-4"
    >
      <p
        v-for="message of messages"
        :key="message.id"
        class="z-40 mt-4 text-lg select-none card card-color font-heading"
        @click="clear(message.id)"
      >
        {{ message.text }}
      </p>
    </transition-group>
  </transition>
</template>

<script>
export default {
  name: 'Messages',

  data: function () {
    return {
      messages: this.$messages.messages,
    }
  },

  methods: {
    clear: function (id) {
      this.$messages.removeMessage(id)
    },
  },
}
</script>
