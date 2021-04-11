<template>
  <transition name="fade">
    <transition-group
      v-show="$store.getters.allMessages.length > 0"
      id="messages"
      tag="div"
      name="messages"
      mode="out-in"
      role="alert"
      class="fixed bottom-0 right-0 z-50 mx-4 my-4"
    >
      <template v-for="message of $store.getters.allMessages" :key="message.id">
        <p
          v-if="message.visible"
          class="mt-4 text-lg select-none card card-color font-heading"
          @click="clear(message.id)"
        >
          {{ message.text }}
        </p>
      </template>
    </transition-group>
  </transition>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

const clear = (id: number) => store.commit('removeMessage', id)
</script>
