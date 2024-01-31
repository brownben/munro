<script setup lang="ts">
const leagues = [
  {
    to: '/leagues/Sprintelope 2023',
    src: '/logos/sprintelope',
    alt: 'Sprintelope League Logo',
    width: 318,
    height: 318,
  },
  {
    to: '/leagues/Fight with the Night 23-24',
    src: '/logos/euoc',
    alt: 'Edinburgh Uni Orienteering Club Logo',
    width: 557,
    height: 551,
  },
  {
    to: '/leagues/UK Elite League 2024',
    src: '/logos/uk-elite-orienteering-league',
    alt: 'UK Elite Orienteering League Logo',
    width: 512,
    height: 512,
  },
  {
    to: '/leagues/Route to WOC 2024',
    src: '/logos/scottish-orienteering',
    alt: 'Scottish Orienteering Logo',
    width: 871,
    height: 381,
  },
  {
    to: '/leagues/Bristol Urban League 2023',
    src: '/logos/bristol-orienteering-club',
    alt: 'Bristol Orienteering Club Logo',
    width: 225,
    height: 225,
  },
]
</script>
<template>
  <div
    class="w-full border-b border-gray-100 bg-gradient-to-b from-white to-gray-50 py-4 text-center"
  >
    <p class="pb-2 font-medium text-gray-500">
      Calculating results for the best leagues in the UK
    </p>
    <div
      class="mx-auto flex max-w-screen-lg flex-wrap justify-around gap-6 px-6 py-6 sm:py-8"
    >
      <NuxtLink v-for="league of leagues" :key="league.alt" :to="league.to">
        <picture>
          <source type="image/avif" :srcset="`${league.src}.avif`" />
          <img
            :alt="league.alt"
            :src="`${league.src}.png`"
            loading="lazy"
            :width="league.width"
            :height="league.height"
            class="h-16 w-auto flex-shrink-0 opacity-75 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 focus:opacity-100 focus:grayscale-0"
          />
        </picture>
      </NuxtLink>
    </div>
  </div>
</template>
