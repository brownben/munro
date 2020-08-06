<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <header id="menu" class="w-full h-12 select-none">
    <h1
      class="inline-block w-full h-12 text-4xl text-center leading-12 md:text-35xl md:w-auto font-heading text-main md:mx-8"
    >
      <router-link to="/">Munro</router-link>
    </h1>
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="absolute right-0 z-20 inline-block float-right h-12 p-2 mr-2 text-main md:hidden"
      @click="showMenu = !showMenu"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>

    <transition name="shrink">
      <nav
        v-show="showMenu || !smallWindow"
        :class="{
          smallWindow: smallWindow,
        }"
        class="relative z-50 flex flex-col justify-center w-full mt-12 text-lg font-normal bg-white text-main h-screen--12 md:mr-2 md:h-12 md:float-right -top-12 md:top-0 md:bg-transparent align-center md:w-auto md:inline-block md:mt-0"
      >
        <router-link to="/leagues" class="menu-item">Leagues</router-link>
        <router-link to="/latest-results" class="menu-item"
          >Latest Results</router-link
        >
        <router-link to="/upload" class="menu-item">Upload Results</router-link>
        <router-link v-if="auth.user" to="/logout" class="menu-item"
          >Log Out</router-link
        >
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      showMenu: false,
      auth: this.$auth,
      smallWindow: false,
    }
  },

  watch: {
    $route: function () {
      this.showMenu = false
    },
  },

  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.showMenu = false
      this.smallWindow = window.innerWidth <= 768
    },
  },
}
</script>
<style lang="postcss">
.-top-12 {
  top: -3rem;
}

.h-screen--12 {
  height: calc(100vh - 3rem);
}

.menu-item {
  transition: 0.3s;
  @apply text-center p-3 font-heading m-0 w-full block relative rounded-tl-lg rounded-br-lg;
  top: -3rem;
}

.menu-item:hover {
  @apply bg-main-400 text-white;
}

@screen md {
  .menu-item {
    margin-top: 0.652rem;
    @apply w-auto inline-block top-0 mr-4 p-0 ml-2;
  }
  .menu-item:hover {
    @apply text-main bg-white;
  }
}

#menu nav:not(.smallWindow) a {
  position: relative;
  color: hsl(290, 90%, 45%);
}

#menu nav:not(.smallWindow) a:before {
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
  width: 100%;
  height: 2px;
  background-color: hsl(290, 90%, 45%);
  content: '';
  transition: all 0.3s ease-in-out 0s;
  transform: scaleX(0);
  -webkit-transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
}

#menu nav:not(.smallWindow) a:hover:before,
#menu nav:not(.smallWindow) a:focus:before {
  visibility: visible;
  transform: scaleX(1);
  -webkit-transform: scaleX(1);
}

#menu nav {
  transition: 0.5s;
  transform-origin: top;
}

.shrink-enter,
.shrink-leave-to {
  transform: scaleY(0);
}
</style>
