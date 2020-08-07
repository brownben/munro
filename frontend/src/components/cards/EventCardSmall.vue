<template>
  <section
    class="flex flex-col items-center justify-around col-span-2 px-4 pt-6 pb-4 text-center bg-white shadow-md md:pb-2 md:col-span-1 md:px-3 xl:px-4 rounded-shape-xl"
  >
    <h3
      class="text-xs font-bold leading-4 tracking-wide uppercase truncate font-heading text-main-600"
    >
      {{ event.league }}
    </h3>
    <h4
      class="my-3 text-3xl font-bold leading-8 text-gray-900 sm:my-2 xl:text-3xl xl:mt-2 xl:mb-3 font-heading"
    >
      {{ event.name }}
    </h4>
    <h5 class="mb-2 leading-4 text-gray-500 font-heading">
      <template v-if="event.date">
        {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
          event.date.split('-')[0]
        }}
      </template>
      <span
        v-if="event.organiser && event.date"
        class="inline-block mx-1 md:hidden xl:inline-block"
      >
        -
      </span>
      <span
        v-if="event.organiser"
        class="inline-block md:hidden xl:inline-block"
      >
        <span class="inline-block md:hidden 2xl:inline-block">
          Organised By
        </span>
        {{ event.organiser }}
      </span>
    </h5>
    <router-link
      v-if="event.resultUploaded"
      :to="`/events/${event.id}/results`"
      class="mt-3 button"
      >Results</router-link
    >
  </section>
</template>

<script>
export default {
  props: {
    event: { type: Object, default: () => ({}) },
  },
}
</script>
