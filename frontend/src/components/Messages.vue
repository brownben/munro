<!--
  Messages

  Messages are displayed at the bottom of the screen. On enter and exit they slide and fade in. It monitors the
    message store and displays the messages
-->

<template>
  <transition name="fade">
    <transition-group
      v-show="$store.getters.allMessages.length > 0"
      id="messages"
      tag="div"
      name="messages"
      mode="out-in"
      class="fixed bottom-0 right-0 z-50 mx-4 my-4"
    >
      <p
        v-for="message of $store.getters.allMessages"
        :key="message.id"
        class="mt-4 text-lg select-none card card-color font-heading"
        @click="clear(message.id)"
      >
        {{ message.text }}
      </p>
    </transition-group>
  </transition>
</template>

<script>
export default {
  methods: {
    clear: function (id) {
      this.$store.commit('removeMessage', id)
    },
  },
}
</script>
