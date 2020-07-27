<template>
  <section
    v-if="(result && result.type !== 'hidden') || $auth.user"
    class="flex flex-col col-span-2 pt-6 text-center bg-white shadow-md lg:col-span-1 rounded-shape-xl"
  >
    <slot>
      <h2
        class="px-4 mb-2 font-bold leading-8 text-25xl md:text-3xl font-heading text-main-700"
      >
        {{ result.eventName }}
      </h2>
    </slot>

    <div class="flex flex-col flex-wrap justify-around w-full sm:flex-row">
      <div
        class="inline-block mx-4 mt-6 mb-2 leading-8 whitespace-no-wrap sm:mt-8 font-heading text-main-900 sm:mb-0"
      >
        <p class="text-6xl font-bold xl:text-8xl">
          <template v-if="result.time">
            {{ elapsedTime(result.time) }}
          </template>
          <template v-else>
            *
          </template>
        </p>
        <p class="inline-block mt-4 text-opacity-50 uppercase text-main-900">
          Time
        </p>
      </div>
      <div
        class="inline-block mx-4 mt-8 leading-8 whitespace-no-wrap sm:mt-8 font-heading text-main-900"
      >
        <p class="text-6xl font-bold xl:text-8xl">
          <template v-if="result.position && !result.incomplete">
            {{ result.position }}
            <sup
              class="relative inline-block -ml-3 text-3xl font-normal text-opacity-75 -top-7 text-main-900"
            >
              {{ positionSuperscript(result.position) }}
            </sup>
          </template>
          <template v-else>
            *
          </template>
        </p>
        <p
          class="inline-block mt-4 text-opacity-50 uppercase sm:mt-4 text-main-900"
        >
          Position
        </p>
      </div>
    </div>

    <div>
      <p
        class="mt-2 text-xl text-opacity-75 sm:mt-0 text-main-900 font-heading"
      >
        <span class="text-2xl font-bold"> {{ result.points }}</span> Points
      </p>

      <router-link
        :to="`/events/${result.event}/results`"
        class="mx-6 mt-4 mb-4 sm:mt-3 button"
      >
        View Results
      </router-link>
    </div>

    <div
      v-if="$auth.user"
      class="flex-grow w-full px-4 pt-4 pb-4 mt-2 shadow md:px-6 bg-main-100 rounded-shape-xl"
    >
      <h3
        class="mb-1 text-2xl font-bold text-center text-main-800 font-heading"
      >
        Admin Actions
      </h3>
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
        <button class="button-dark" @click="incompleteResult">
          <template v-if="result.incomplete">Mark as Complete</template>
          <template v-else>Mark as Incomplete</template>
        </button>
        <button class="button-dark" @click="hideResult">
          <template v-if="result.type !== 'hidden'">Hide Result</template>
          <template v-else>Include Result</template>
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
  },

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
        .then(() => this.$messages.addMessage(`Result Updated`))
        .then(() => this.$emit('resultChanged'))
        .catch(() =>
          this.$messages.addMessage('Problem Hiding Result - Please Try Again')
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
        .then(() => this.$messages.addMessage(`Result Updated`))
        .then(() => this.$emit('resultChanged'))
        .catch(() =>
          this.$messages.addMessage(
            'Problem Updating Result - Please Try Again'
          )
        )
    },
  },
}
</script>
