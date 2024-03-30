<script setup lang="ts">
import type { PropType } from 'vue'
import type { EventResultWithEventName } from '~/api-types'
import { elapsedTime } from '~/utils/time'

const props = defineProps({
  result: {
    type: Object as PropType<EventResultWithEventName>,
    required: true,
  },
  competitorPool: {
    type: String,
    required: true,
  },
  admin: { type: Boolean, default: false },
})
const emit = defineEmits(['result-changed'])

const toggleVisibility = async () => {
  await usePatch(`results/${props.result.id}`, {
    visible: !props.result.visible,
  })
  emit('result-changed')
}
const toggleIncomplete = async () => {
  await usePatch(`results/${props.result.id}`, {
    incomplete: !props.result.incomplete,
  })
  emit('result-changed')
}

const showTransferForm = ref(false)
</script>

<template>
  <article class="flex flex-col py-8">
    <h2
      class="mb-4 text-2xl font-bold leading-tight text-gray-700 dark:text-gray-300"
    >
      {{ result.event_name }}
    </h2>
    <dl class="flex flex-col gap-6 sm:flex-row sm:gap-16">
      <div>
        <dt class="mb-1 font-medium text-gray-500 dark:text-gray-400">Time:</dt>
        <dd
          class="text-5xl font-black tracking-tight text-gray-800 dark:text-gray-100"
        >
          <template v-if="result.incomplete">*</template>
          <template v-else>{{ elapsedTime(result.time) || '*' }}</template>
        </dd>
      </div>
      <div>
        <dt class="mb-1 font-medium text-gray-500 dark:text-gray-400">
          Course:
        </dt>
        <dd
          class="text-5xl font-black tracking-tight text-gray-800 dark:text-gray-100"
        >
          {{ result.course }}
        </dd>
      </div>
    </dl>
    <template v-if="admin">
      <dl class="mt-6 text-gray-800 dark:text-gray-400">
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">ID:</dt>
          <dd class="select-all truncate">{{ result.id }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">Visible:</dt>
          <dd class="select-all">{{ result.visible }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">
            Incomplete:
          </dt>
          <dd class="select-all">{{ result.incomplete }}</dd>
        </div>
        <div v-if="result.type" class="flex gap-2">
          <dt class="flex-shrink-0 font-medium dark:text-gray-300">Type:</dt>
          <dd class="select-all">{{ result.type }}</dd>
        </div>
      </dl>
      <div class="-mb-2 mt-4 flex flex-wrap gap-3">
        <ButtonSmall @click="toggleIncomplete">
          <template v-if="result.incomplete"> Mark as Complete </template>
          <template v-else> Mark as Incomplete </template>
        </ButtonSmall>
        <ButtonSmall @click="toggleVisibility">
          <template v-if="result.visible"> Hide Result </template>
          <template v-else> Include Result </template>
        </ButtonSmall>
        <ButtonSmall @click="showTransferForm = !showTransferForm">
          Transfer Result
        </ButtonSmall>
      </div>
      <LazyResultTransferForm
        v-if="showTransferForm"
        :competitor-pool="competitorPool"
        :result="result.id"
        @result-changed="emit('result-changed')"
      />
    </template>
    <NuxtLink
      :to="`/events/${result.event}/results`"
      class="mt-8 inline-block text-main-700 hover:text-main-600 dark:text-main-600 dark:hover:text-main-500"
    >
      View all results for {{ result.event_name }} →
    </NuxtLink>
  </article>
</template>
