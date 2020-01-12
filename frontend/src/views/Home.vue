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
      class="view md:flex items-center p-3 mt-6 justify-center text-center flex-row-reverse block pb-4"
    >
      <img
        src="@/assets/images/UnDrawOFlagPurple.svg"
        alt="Orienteering Flag Next to Trees and Hills"
        class="h-80 inline-block pb-2 md:pl-6 xl:pl-20"
      />
      <h2
        class="w-full text-center md:text-left font-heading text-3xl md:text-4xl xl:text-5xl text-main md:py-0 pt-3"
      >
        Fast and Easy Results for Orienteering Leagues
      </h2>
    </div>

    <div
      v-if="auth.user"
      class="actions w-full bg-main-dark text-white my-4 p-3 text-center mt-6"
    >
      <h2 class="text-3xl font-heading py-3">
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

    <div class="view flex flex-wrap flex-row">
      <div class="h-full w-full md:w-1/2 my-4 md:px-3">
        <div class="card">
          <img
            src="@/assets/images/SprintelopeLogo.png"
            alt="The Logo of Sprintelope"
            class="h-40"
          />
          <h1 class="text-2xl font-heading my-2">Sprintelope 2019</h1>
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
      <div class="w-full md:w-1/2 my-4 md:px-3">
        <div class="h-full w-full card">
          <img
            src="@/assets/images/SprintelopeLogo.png"
            alt="The Logo of Sprintelope"
            class="h-40"
          />
          <h1 class="text-2xl font-heading my-2">Sprintelope 2018</h1>
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
          <router-link class="button" to="/leagues/Sprintelope 2018"
            >View League</router-link
          >
        </div>
      </div>
      <div class="w-full md:w-1/2 my-4 md:px-3">
        <div class="h-full w-full card">
          <h1 class="text-2xl font-heading my-2">Fight with the Night</h1>
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
      <div class="w-full md:w-1/2 my-4 md:px-3">
        <div class="h-full w-full card">
          <h1 class="text-2xl font-heading my-2">Northern Night Cup</h1>
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
    <div class="w-full bg-main text-white p-3 text-center view contours">
      <img
        src="@/assets/images/MunroLogoWhite.png"
        alt="Munro Logo"
        class="h-24 inline-block mt-4 mb-2"
      />
      <h1 class="text-2xl font-heading my-2">About</h1>
      <div class="text mb-3">
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
    <div class="view flex flex-wrap flex-row">
      <div class="w-full md:w-1/2 my-4 md:px-3">
        <div class="h-full w-full card">
          <h1 class="text-2xl font-heading my-2">Upload Instructions</h1>
          <p>
            Instructions for Event Organisers on how to Upload Results to Munro
          </p>
          <router-link to="/upload-instructions" class="button"
            >View Info</router-link
          >
        </div>
      </div>
      <div class="w-full md:w-1/2 my-4 md:px-3">
        <div class="h-full w-full card">
          <h1 class="text-2xl font-heading my-2">Developers</h1>
          <p>
            Information for developers about accessing the API and embedding the
            site in IFrames
          </p>
          <router-link to="/developers" class="button">View Info</router-link>
        </div>
      </div>
    </div>

    <p
      class="bg-main-dark rounded-tl-xl text-white text-center font-heading p-2 mt-2"
    >
      © Ben Brown 2019
      <router-link v-if="!auth.user" to="/login" class="px-2 link"
        >Admin Login</router-link
      >
      <router-link v-else to="/logout" class="px-2 link">Logout</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data: function() {
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
