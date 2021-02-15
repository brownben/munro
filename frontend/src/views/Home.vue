<template>
  <main>
    <Meta
      title="Munro"
      description="League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/"
      :block-robots="false"
    />

    <HeroSection />
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
    <AboutSection />
    <DeveloperSection />
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '../components/HomeSectionHero.vue'
import LeaguesSection from '../components/HomeSectionLeagues.vue'
import SearchSection from '../components/HomeSectionSearch.vue'
import EventsSection from '../components/HomeSectionEvents.vue'
import UploadSection from '../components/HomeSectionUpload.vue'
import AboutSection from '../components/HomeSectionAbout.vue'
import DeveloperSection from '../components/HomeSectionDeveloper.vue'
import AppFooter from '../components/AppFooter.vue'
</script>
