<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <div id="menu" class="w-full h-12 border-b border-main-veryLight select-none">
    <h1
      class="w-full md:w-auto h-12 text-4xl font-heading text-main md:mx-8 inline-block text-center"
    >
      <router-link to="/">Munro</router-link>
    </h1>
    <svg
      viewBox="0 0 24 24"
      class="h-12 p-2 mr-2 fill-current text-main md:hidden inline-block float-right absolute right-0"
      @click="showMenu = !showMenu"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
    <transition name="shrink">
      <nav
        v-show="showMenu || !smallWindow"
        :class="{
          'sr-only': !showMenu && smallWindow,
          smallWindow: smallWindow,
        }"
        class="text-main text-lg font-normal h-screen--12 md:mr-2 md:h-12 md:float-right relative z-50 top--12 md:top-0 md:bg-transparent bg-white flex flex-col justify-center align-center w-full md:w-auto md:inline-block mt-12 md:mt-0"
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      showMenu: false,
      auth: this.$auth,
      smallWindow: false,
    }
  },

  watch: {
    $route: function() {
      this.showMenu = false
    },
  },

  mounted: function() {
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
.top--12 {
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
  @apply bg-main text-white;
}

@media (min-width: 768px) {
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

#menu nav:not(.smallWindow) a:hover:before {
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
