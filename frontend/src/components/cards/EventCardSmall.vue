<template>
  <section
    class="flex flex-col items-center justify-around col-span-2 px-4 pt-6 pb-4 text-center bg-white shadow-md md:px-2 md:pb-3 md:col-span-1 xl:px-4 rounded-shape-xl"
  >
    <h3
      class="text-xs font-bold leading-tight tracking-wider uppercase truncate font-heading text-main-600 md:tracking-wide"
    >
      {{ event.league }}
    </h3>
    <h4
      class="mt-3 mb-2 text-3xl font-bold leading-none tracking-tight text-gray-900 font-heading"
    >
      {{ event.name }}
    </h4>
    <h5 class="text-base leading-tight text-gray-500 font-heading">
      <template v-if="event.date">
        {{ event.date.split('-')[2] }}/{{ event.date.split('-')[1] }}/{{
          event.date.split('-')[0]
        }}
      </template>
      <span
        v-if="event.organiser && event.date"
        class="hidden mx-1 sm:inline-block md:hidden xl:inline-block"
      >
        -
      </span>
      <span
        v-if="event.organiser"
        class="block sm:inline-block md:hidden xl:inline-block"
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
      class="mt-4 text-base button"
    >
      Results
    </router-link>
  </section>
</template>

<script>
export default {
  props: {
    event: { type: Object, default: () => ({}) },
  },
}
</script>
