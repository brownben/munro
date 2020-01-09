<!--
  Messages

  Messages are displayed at the bottom of the screen. On enter and exit they slide and fade in. It monitors the
    message store and displays the messages
-->

<template>
  <transition name="fade">
    <div
      is="transition-group"
      v-show="messages.length > 0"
      id="messages"
      name="list"
      mode="out-in"
      class="fixed bottom-0 right-0"
    >
      <p
        v-for="message of messages"
        :key="message.id"
        class="card-color m-3 font-heading z-40"
        @click="clear(message.id)"
      >
        {{ message.text }}
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Messages',

  data: function() {
    return {
      messages: this.$messages.messages,
    }
  },

  methods: {
    clear: function(id) {
      this.$messages.removeMessage(id)
    },
  },
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-out;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
