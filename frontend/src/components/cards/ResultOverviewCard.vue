<template>
  <section
    v-if="(result && result.type !== 'hidden') || $store.getters.loggedIn"
    class="flex flex-col col-span-2 pt-6 text-center bg-white shadow-md lg:col-span-1 rounded-shape-xl"
  >
    <slot>
      <h2
        class="px-4 mb-3 text-xl font-bold tracking-wide uppercase font-heading text-main-700"
      >
        {{ result.eventName }}
      </h2>
    </slot>

    <div class="flex flex-row flex-wrap justify-around w-full">
      <div
        class="inline-block mx-8 mb-2 text-gray-900 whitespace-no-wrap font-heading"
      >
        <p class="text-5xl font-bold">
          <template v-if="result.position && !result.incomplete">
            {{ result.position }}
            <sup
              class="relative inline-block -ml-3 text-xl font-normal text-gray-500 -top-5"
            >
              {{ positionSuperscript(result.position) }}
            </sup>
          </template>
          <template v-else> * </template>
        </p>
        <p class="inline-block text-sm text-gray-500 uppercase">Position</p>
      </div>
      <div
        v-if="showTime"
        class="inline-block mx-8 mb-2 text-gray-900 whitespace-no-wrap font-heading"
      >
        <p class="text-5xl font-bold">
          <template v-if="result.time">
            {{ elapsedTime(result.time) }}
          </template>
          <template v-else> * </template>
        </p>
        <p class="inline-block text-sm text-gray-500 uppercase">Time</p>
      </div>
      <div
        class="inline-block mx-8 mb-2 text-gray-900 whitespace-no-wrap font-heading"
      >
        <p class="text-5xl font-bold">
          {{ result.points }}
        </p>
        <p class="inline-block text-sm text-gray-500 uppercase">Points</p>
      </div>
    </div>

    <div class="px-6">
      <router-link
        v-if="showTime"
        :to="`/events/${result.event}/results`"
        class="mt-4 mb-4 sm:mt-3 button"
      >
        View Results
      </router-link>
      <div v-else class="my-4" />
    </div>

    <div
      v-if="$store.getters.loggedIn"
      class="flex-grow w-full px-4 pt-4 pb-4 mt-2 shadow md:px-6 bg-main-50 rounded-shape-xl"
    >
      <div class="flex flex-row flex-wrap justify-around px-6">
        <p class="mx-2 mb-1">
          <b class="mr-2 text-main-800">Id:</b>
          {{ result.id }}
        </p>

        <p v-if="result.type" class="mx-2 mb-1">
          <b class="mr-2 text-main-800">Type:</b>
          {{ result.type }}
        </p>
        <p
          v-if="result.incomplete"
          class="mx-2 font-bold text-main-800 font-heading"
        >
          Incomplete Result
        </p>
      </div>
      <div class="w-full mt-2">
        <button class="button button-dark" @click="incompleteResult">
          <template v-if="result.incomplete"> Mark as Complete </template>
          <template v-else> Mark as Incomplete </template>
        </button>
        <button class="button button-dark" @click="hideResult">
          <template v-if="result.type !== 'hidden'"> Hide Result </template>
          <template v-else> Include Result </template>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  props: {
    result: {
      type: Object,
      default: () => {},
    },
    showTime: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['result-changed'],

  methods: {
    positionSuperscript: function (position) {
      if (position % 10 === 1 && position % 100 !== 11) return 'st'
      else if (position % 10 === 2 && position % 100 !== 12) return 'nd'
      else if (position % 10 === 3 && position % 100 !== 13) return 'rd'
      else return 'th'
    },

    twoDigits: function (number) {
      if (number.toString().length < 2) return `0${number.toString()}`
      else return number
    },

    elapsedTime: function (totalTimeInSeconds) {
      if (typeof totalTimeInSeconds !== 'number') return totalTimeInSeconds
      else if (totalTimeInSeconds === 0) return ''

      const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
      const timeInSeconds = Math.abs(totalTimeInSeconds % 60)

      return `${this.twoDigits(timeInMinutes)}:${this.twoDigits(timeInSeconds)}`
    },

    hideResult: function () {
      let type = 'hidden'
      if (this.result.type === 'hidden') type = null

      return axios
        .put(`/api/results/${this.result.id}`, {
          rowid: this.result.id,
          action: 'hide',
          event: this.result.event,
          type,
        })
        .then(() => this.$store.dispatch('createMessage', `Result Updated`))
        .then(() => this.$emit('result-changed'))
        .catch(() =>
          this.$store.dispatch(
            'createMessage',
            'Problem Hiding Result - Please Try Again'
          )
        )
    },

    incompleteResult: function () {
      return axios
        .put(`/api/results/${this.result.id}`, {
          rowid: this.result.id,
          action: 'incomplete',
          incomplete: !this.result.incomplete,
          event: this.result.event,
        })
        .then(() => this.$store.dispatch('createMessage', `Result Updated`))
        .then(() => this.$emit('result-changed'))
        .catch(() =>
          this.$store.dispatch(
            'createMessage',
            'Problem Updating Result - Please Try Again'
          )
        )
    },
  },
}
</script>
