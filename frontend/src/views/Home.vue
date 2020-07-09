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
      class="flex-row-reverse items-center justify-center block p-3 pb-4 mt-6 text-center view md:flex"
    >
      <img
        src="@/assets/images/UnDrawOFlagPurple.svg"
        alt="Orienteering Flag Next to Trees and Hills"
        class="inline-block pb-2 h-80 md:pl-6 xl:pl-20"
      />
      <h2
        class="w-full pt-3 text-3xl text-center md:text-left font-heading md:text-4xl xl:text-5xl text-main md:py-0"
      >
        Fast and Easy Results for Orienteering Leagues
      </h2>
    </div>

    <div
      v-if="auth.user"
      class="w-full p-3 my-4 mt-6 text-center text-white actions bg-main-dark"
    >
      <h2 class="py-3 text-3xl font-heading">
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

    <div class="flex flex-row flex-wrap view">
      <div class="w-full my-4 md:w-1/2 md:px-3">
        <div class="w-full h-full card">
          <img
            src="@/assets/images/SprintelopeLogo.png"
            alt="The Logo of Sprintelope"
            class="h-40"
          />
          <h1 class="my-2 text-2xl font-heading">(Not) Sprintelope 2020</h1>
          <p>
            Socially Distant Sprint/ Urban Orienteering Events in Edinburgh and
            the Lothians
          </p>
          <p>
            More information can be found on their
            <a
              href="https://en-gb.facebook.com/sprintelope/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              >website</a
            >
          </p>
          <router-link class="button" to="/leagues/(Not) Sprintelope 2020"
            >View League</router-link
          >
        </div>
      </div>

      <div class="w-full h-full my-4 md:w-1/2 md:px-3">
        <div class="card">
          <img
            src="@/assets/images/SprintelopeLogo.png"
            alt="The Logo of Sprintelope"
            class="h-40"
          />
          <h1 class="my-2 text-2xl font-heading">Sprintelope 2019</h1>
          <p>
            Wednesday Evening Sprint Orienteering Events in Edinburgh and the
            Lothians
          </p>
          <p>
            More information can be found on their
            <a
              href="https://en-gb.facebook.com/sprintelope/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              >website</a
            >
          </p>
          <router-link class="button" to="/leagues/Sprintelope 2019"
            >View League</router-link
          >
        </div>
      </div>

      <div class="w-full my-4 md:w-1/2 md:px-3">
        <div class="w-full h-full card">
          <h1 class="my-2 text-2xl font-heading">Fight with the Night</h1>
          <p>
            Thursday Night Orienteering Events Around Edinburgh Organised By
            Edinburgh Uni Orienteering Club
          </p>
          <p>
            More information can be found on their
            <a
              href="https://euoc.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              >website</a
            >
          </p>
          <router-link class="button" to="/leagues/Fight with the Night 19-20"
            >View League</router-link
          >
        </div>
      </div>
      <div class="w-full my-4 md:w-1/2 md:px-3">
        <div class="w-full h-full card">
          <h1 class="my-2 text-2xl font-heading">Northern Night Cup</h1>
          <p>
            A Series of Night Orienteering Events in the North of Scotland
          </p>
          <p>
            More information can be found on their
            <a
              href="https://www.orienteering.scot/northern-night-cup/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              >website</a
            >
          </p>
          <router-link class="button" to="/leagues/Northern Night Cup 19-20"
            >View League</router-link
          >
        </div>
      </div>
    </div>
    <div class="w-full p-3 text-center text-white bg-main view contours">
      <img
        src="@/assets/images/MunroLogoWhite.png"
        alt="Munro Logo"
        class="inline-block h-24 mt-4 mb-2"
      />
      <h1 class="my-2 text-2xl font-heading">About</h1>
      <div class="mb-3 text">
        <p>
          Munro is a sports league results calculator, created originally by Ben
          Brown for his local Orienteering League as part of his Advanced Higher
          Computing Project. Munro is designed to be as easy to use as possible
          providing all the features and information you need, whilst making it
          fast and simple to view the results; with multiple options to sort and
          filter them. It supports multiple file formats for upload and several
          different scoring systems, making the process as quick and stress free
          as possible for event organisers.
        </p>
        <p>
          Munro is Open Source and the code is avaliable on
          <a class="link" href="https://github.com/brownben/munro">Github</a>
        </p>
        <p>
          Munro is still under development so any feedback or comments would be
          welcome, please send them to munro.leagues@gmail.com
        </p>
        <p>
          For any help or enquires please email munro.leagues@gmail.com
        </p>
      </div>
    </div>
    <div class="flex flex-row flex-wrap view">
      <div class="w-full my-4 md:w-1/2 md:px-3">
        <div class="w-full h-full card">
          <h1 class="my-2 text-2xl font-heading">Upload Instructions</h1>
          <p>
            Instructions for Event Organisers on how to Upload Results to Munro
          </p>
          <router-link to="/upload-instructions" class="button"
            >View Info</router-link
          >
        </div>
      </div>
      <div class="w-full my-4 md:w-1/2 md:px-3">
        <div class="w-full h-full card">
          <h1 class="my-2 text-2xl font-heading">Developers</h1>
          <p>
            Information for developers about accessing the API and embedding the
            site in IFrames
          </p>
          <router-link to="/developers" class="button">View Info</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

.text p {
  @apply my-1;
}

#header img {
  max-width: 100%;
}

@media (min-width: 768px) {
  #header img {
    height: auto;
    max-height: 20rem;
  }
}
.contours {
  background-image: url('../assets/images/topography.svg');
}
</style>
