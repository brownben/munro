<!--
  Home

  Home page of app, displaying summary of all the leagues
-->

<template>
  <div>
    <div class="view">
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
        class="md:flex items-center p-3 justify-center text-center flex-row-reverse block pb-4"
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

      <div class="flex flex-wrap flex-row">
        <div
          v-if="auth.user"
          class="actions p-4 w-full text-center shadow-md rounded-tl-lg rounded-br-lg my-4 bg-white flex flex-col align-center justify-center mx-3"
        >
          <h2 class="text-3xl font-heading">Admin Actions</h2>
          <div>
            <router-link to="/create-league" class="button"
              >Create New League</router-link
            >
            <router-link to="/competitors" class="button"
              >Manage Competitors</router-link
            >
            <router-link to="/upload" class="button"
              >Upload Results</router-link
            >
          </div>
        </div>
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
        <div class="p-4 w-full card-text md:mx-3 my-4">
          <img
            src="@/assets/images/MunroLogo.png"
            alt="Munro Logo"
            class="h-24"
          />
          <h1 class="text-2xl font-heading my-2">About</h1>
          <div class="text">
            <p>
              Munro is a sports league results calculator, created originally by
              Ben Brown for his local Orienteering League as part of his
              Advanced Higher Computing Project. Munro is designed to be as easy
              to use as possible providing all the features and information you
              need, whilst making it fast and simple to view the results; with
              multiple options to sort and filter them. It supports multiple
              file formats for upload and several different scoring systems,
              making the process as quick and stress free as possible for event
              organisers.
            </p>
            <p>
              Munro is Open Source and the code is avaliable on
              <a class="link" href="https://github.com/brownben/munro"
                >Github</a
              >
            </p>
            <p>
              Munro is still under development so any feedback or comments would
              be welcome, please send them to munro.leagues@gmail.com
            </p>
            <p>For any help or enquires please email munro.leagues@gmail.com</p>
          </div>
        </div>
        <div class="w-full md:w-1/2 my-4 md:px-3">
          <div class="h-full w-full card">
            <h1 class="text-2xl font-heading my-2">Developers</h1>
            <p>
              Information for developers about accessing the API and embedding
              the site in IFrames
            </p>
            <router-link to="/developers" class="button">View Info</router-link>
          </div>
        </div>
        <div class="w-full md:w-1/2 my-4 md:px-3">
          <div class="h-full w-full card">
            <h1 class="text-2xl font-heading my-2">Upload Instructions</h1>
            <p>Instructions for how to upload results to Munro</p>
            <router-link to="/upload-instructions" class="button"
              >View Info</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <p
      class="bg-main rounded-tl-xl text-white text-center font-heading p-2 mt-4"
    >
      © Ben Brown 2019
      <router-link v-if="!auth.user" to="/login" class="px-2"
        >Admin Login</router-link
      >
      <router-link v-else to="/logout" class="px-2">Logout</router-link>
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
<style scoped>
.text p {
  @apply my-1;
}

#header img {
  max-width: 100%;
}

@media (max-width: 768px) {
  #header img {
    height: auto;
    max-height: 20rem;
  }
}
</style>
