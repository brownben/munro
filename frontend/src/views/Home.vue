<!--
  Home

  Home page of app, displaying summary of all the leagues
-->

<template>
  <div>
    <vue-headful
      :head="{
        meta: { name: 'robots', content: 'all' },
      }"
      title="Munro"
      description="League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options"
      url="https://munro-leagues.herokuapp.com/"
    />

    <Hero />

    <section
      v-if="auth.user"
      class="w-full py-8 text-center text-white actions bg-main-600"
    >
      <h2 class="pb-2 text-4xl font-bold font-heading">
        Hello {{ $auth.user.displayName || 'Admin' }}!
      </h2>
      <div class="mx-6">
        <router-link to="/leagues/create" class="button-white"
          >Create New League</router-link
        >
        <router-link to="/upload" class="button-white"
          >Upload Results</router-link
        >
      </div>
    </section>

    <LeaguesSection />
    <AboutCard />
    <EventsSection />

    <UploadSection />
    <DeveloperSection />
    <AppFooter />
  </div>
</template>

<script>
import Hero from '@/components/Hero'

import LeaguesSection from '@/components/cards/HomeLeaguesSection'
import AboutCard from '@/components/cards/AboutCard'
import EventsSection from '@/components/cards/HomeEventsSection'
import UploadSection from '@/components/cards/HomeUploadSection'
import DeveloperSection from '@/components/cards/HomeDeveloperSection'

import AppFooter from '@/components/Footer'

export default {
  components: {
    Hero,
    LeaguesSection,
    AboutCard,
    EventsSection,
    UploadSection,
    DeveloperSection,
    AppFooter,
  },

  data: function () {
    return {
      auth: this.$auth,
    }
  },
}
</script>
