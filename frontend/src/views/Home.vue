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
      description="Fast and Easy Results System for Orienteering Leagues by Munro, a simple way to calculate the results for orienteering leagues, with search and sort features"
      url="https://munro-leagues.herokuapp.com/"
    />
    <div
      id="header"
      class="flex-row-reverse items-center justify-center block w-10/12 p-3 pb-4 m-auto mt-6 mb-8 text-center md:w-3/4 md:flex"
    >
      <img
        src="@/assets/images/UnDrawOFlagPurple.svg"
        alt="Orienteering Flag Next to Trees and Hills"
        class="inline-block pb-2 h-80 md:pl-10 xl:pl-20"
      />
      <h2
        class="w-full pt-3 text-3xl text-center md:text-left font-heading md:text-4xl xl:text-5xl text-main md:py-0"
      >
        Fast and Easy Results for Orienteering Leagues
      </h2>
    </div>

    <Layout class="mt-8">
      <div v-if="auth.user" class="col-span-2 card-color-dark actions">
        <h2 class="pb-2 font-bold text-35xl font-heading">
          Hello {{ $auth.user.displayName || 'Admin' }}!
        </h2>
        <div class="pb-2">
          <router-link to="/create-league" class="button-white"
            >Create New League</router-link
          >
          <router-link to="/competitors" class="button-white"
            >Manage Competitors</router-link
          >
          <router-link to="/upload" class="button-white"
            >Upload Results</router-link
          >
        </div>
      </div>

      <LeagueOverviewCard
        title="(Not) Sprintelope 2020"
        description=" Socially Distant Sprint/ Urban Orienteering Events in Edinburgh and
          the Lothians"
        website="https://en-gb.facebook.com/sprintelope/"
      >
        <img
          src="@/assets/images/SprintelopeLogo.png"
          alt="The Logo of Sprintelope"
          class="h-40"
        />
      </LeagueOverviewCard>
      <LeagueOverviewCard
        title="Sprintelope 2019"
        description="Wednesday Evening Sprint Orienteering Events in Edinburgh and the
          Lothians"
        website="https://en-gb.facebook.com/sprintelope/"
      >
        <img
          src="@/assets/images/SprintelopeLogo.png"
          alt="The Logo of Sprintelope"
          class="h-40"
        />
      </LeagueOverviewCard>

      <LeagueOverviewCard
        title="Fight with the Night"
        description="Thursday Night Orienteering Events Around Edinburgh Organised By
          Edinburgh Uni Orienteering Club"
        website="https://euoc.wordpress.com/"
        alternativeLink="/leagues/Fight with the Night 19-20"
      />
      <LeagueOverviewCard
        title="Northern Night Cup"
        description="A Series of Night Orienteering Events in the North of Scotland"
        website="https://www.orienteering.scot/northern-night-cup/"
        alternativeLink="/leagues/Northern Night Cup 19-20"
      />

      <AboutCard />

      <LeagueOverviewCard
        title="Upload Instructions"
        description="Instructions for Event Organisers on how to Upload Results to Munro"
        buttonText="View Info"
        alternativeLink="/upload-instructions"
      />
      <LeagueOverviewCard
        title="Developers"
        description="Information for developers about accessing the API and embedding the
          site in IFrames"
        buttonText="View Info"
        alternativeLink="/developers"
      />
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import AboutCard from '@/components/cards/AboutCard'
import LeagueOverviewCard from '@/components/cards/LeagueOverviewCard'

export default {
  components: {
    Layout,
    LeagueOverviewCard,
    AboutCard,
  },

  data: function () {
    return {
      auth: this.$auth,
    }
  },
}
</script>
<style lang="postcss">
.h-80 {
  height: 18rem;
}

#header img {
  max-width: 100%;
}

@screen md {
  #header img {
    height: auto;
    max-height: 20rem;
  }
}
</style>
