<!--
  Home

  Home page of app, displaying summary of all the leagues
-->

<template>
  <div>
    <Meta
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro"
      description="League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/"
    />

    <Hero />
    <section
      v-if="$store.getters.loggedIn"
      class="w-full py-8 text-center text-white actions bg-main-600"
    >
      <h2 class="pb-2 text-4xl font-bold font-heading">
        Hello {{ $store.getters.userName || 'Admin' }}!
      </h2>
      <div class="mx-6">
        <router-link to="/leagues/create" class="button button-white">
          Create New League
        </router-link>
        <router-link to="/upload" class="button button-white">
          Upload Results
        </router-link>
      </div>
    </section>

    <LeaguesSection />
    <SearchSection />
    <EventsSection />
    <UploadSection />
    <AboutCard />
    <DeveloperSection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Hero from '/@/components/Hero.vue'
import LeaguesSection from '/@/components/cards/HomeLeaguesSection.vue'
import AboutCard from '/@/components/cards/AboutCard.vue'
import EventsSection from '/@/components/cards/HomeEventsSection.vue'
import UploadSection from '/@/components/cards/HomeUploadSection.vue'
import SearchSection from '/@/components/cards/HomeSearchSection.vue'
import DeveloperSection from '/@/components/cards/HomeDeveloperSection.vue'
import AppFooter from '/@/components/Footer.vue'
</script>
