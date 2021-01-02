<template>
  <section class="w-full pt-8 pb-10 border-t bg-gray-50 border-main-100">
    <div class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
      <div class="flex flex-row flex-wrap justify-between px-6 mx-auto mb-4">
        <h2
          class="inline-block py-2 text-lg leading-6 tracking-wide uppercase font-heading text-main-600"
        >
          Leagues
        </h2>
        <router-link
          to="/leagues"
          class="inline-block px-4 pt-2 text-sm leading-6 tracking-wide text-right uppercase transition duration-300 text-main-600 font-heading hover:bg-main-100 focus:bg-main-100 rounded-shape"
        >
          View All Leagues →
        </router-link>
      </div>

      <div class="grid grid-cols-2 gap-6 px-6 sm:gap-8 md:grid-cols-3">
        <LeagueOverviewCard
          title="(Not) Sprintelope"
          description=" Socially Distant Sprint/ Urban Orienteering Around Edinburgh"
          website="https://en-gb.facebook.com/sprintelope/"
          alternative-link="/leagues/(Not) Sprintelope 2020"
          :larger="false"
          smaller
        />
        <LeagueOverviewCard
          title="Fight with the Night"
          description="Thursday Night Orienteering Events Around Edinburgh"
          website="https://euoc.wordpress.com/"
          alternative-link="/leagues/Fight with the Night 20-21"
          :larger="false"
          smaller
        />
        <LeagueOverviewCard
          title="Northern Night Cup"
          description="Night Orienteering Events in the North of Scotland"
          website="https://www.orienteering.scot/northern-night-cup/"
          alternative-link="/leagues/Northern Night Cup 19-20"
          :larger="false"
          smaller
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LeagueOverviewCard from '/@/components/cards/LeagueOverviewCard.vue'
</script>
