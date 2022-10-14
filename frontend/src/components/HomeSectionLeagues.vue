<template>
  <section class="w-full pt-8 pb-10 border-t bg-gray-50 border-main-100">
    <div class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
      <div class="flex flex-row flex-wrap justify-between px-6 mx-auto mb-4">
        <h2
          class="inline-block py-2 text-lg leading-6 tracking-wide uppercase font-heading text-main-700"
        >
          Leagues
        </h2>
        <div>
          <router-link
            to="/leagues"
            class="inline-block px-4 py-2 text-sm tracking-wide text-right uppercase transition duration-300 text-main-700 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape focus-visible:shadow-outline"
          >
            View All Leagues &rarr;
          </router-link>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 px-6 sm:gap-8 md:grid-cols-3">
        <CardLeague
          title="Sprintelope"
          description="Wednesday Evening Sprint Orienteering Events in Edinburgh and the Lothians"
          website="https://en-gb.facebook.com/sprintelope/"
          alternative-link="/leagues/Sprintelope 2022"
          :larger="false"
          smaller
        />
        <CardLeague
          title="UK Elite League"
          description="The UK's must-do races for elites and aspiring elites"
          website="http://www.ukeliteoleague.org.uk/"
          alternative-link="/leagues/UK Elite League 2022"
          :larger="false"
          smaller
        />
        <CardLeague
          title="Fight with the Night"
          description="Thursday Night Orienteering Events Around Edinburgh"
          website="https://euoc.wordpress.com/"
          alternative-link="/leagues/Fight with the Night 22-23"
          :larger="false"
          smaller
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardLeague from './CardLeague.vue'
</script>
