<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  tagline: { type: String, default: '' },
  linkText: { type: String, default: '' },
  linkLocation: { type: String, default: '' },
})
</script>
<template>
  <header
    class="w-full border-b border-gray-100 bg-linear-to-b from-white to-gray-50 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 print:border-0 print:to-white"
    :class="{ 'border-none': !!$slots.rightAction }"
  >
    <div
      class="relative mx-auto max-w-(--breakpoint-lg) px-6 py-6 sm:pt-8 sm:pb-10 lg:px-8 print:sm:py-4"
    >
      <NuxtLink
        v-if="linkLocation"
        :to="linkLocation"
        class="text-main-700 dark:text-main-500 mb-1 text-xl font-bold sm:-mb-1 sm:text-xl"
      >
        {{ linkText }}
      </NuxtLink>

      <h1
        class="text-4xl leading-none font-black tracking-tight text-pretty text-gray-900 sm:text-5xl sm:leading-tight dark:text-gray-50"
      >
        {{ title }}
        <slot name="title" />
      </h1>
      <p
        v-if="tagline"
        class="mt-3 text-lg leading-tight text-gray-600 sm:text-xl dark:text-gray-300"
      >
        {{ tagline }}
      </p>
      <p
        v-if="!!$slots.description"
        class="mt-3 text-lg leading-tight text-gray-600 sm:text-xl dark:text-gray-200"
      >
        <slot name="description" />
      </p>

      <div
        v-if="!!$slots.default"
        class="flex flex-col gap-x-7 gap-y-2 sm:flex-row sm:flex-wrap print:hidden"
        :class="{
          'pt-8 sm:pt-10': !!$slots.description || tagline,
          'pt-4': !(!!$slots.description || tagline),
        }"
      >
        <slot />
      </div>
      <div v-if="!!$slots.extra" class="pt-8"><slot name="extra" /></div>

      <div
        v-if="!!$slots.rightAction"
        class="top-0 right-0 flex h-full flex-col justify-center sm:absolute sm:pr-6 lg:px-8"
      >
        <div
          class="pt-4 sm:-mt-2 md:-mt-6"
          :class="{ 'pt-8 sm:pt-0': !!$slots.default }"
        >
          <slot name="rightAction" />
        </div>
      </div>

      <slot name="other" />
    </div>
  </header>
</template>
