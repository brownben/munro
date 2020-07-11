<!--
  Navigation Menu

  The main navigation menu for the site. Deals with resize by monitoring window size and displaying appropriate menu style
  If logged in display logout instead of login.
-->

<template>
  <header id="menu" class="w-full bg-white select-none h-13 border-top">
    <h1
      class="inline-block w-full h-12 text-4xl text-center md:w-auto font-heading text-main md:mx-8"
    >
      <router-link to="/">Munro</router-link>
    </h1>
    <svg
      viewBox="0 0 24 24"
      class="absolute right-0 inline-block float-right h-12 p-2 mr-2 fill-current text-main md:hidden"
      @click="showMenu = !showMenu"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
    <transition name="shrink">
      <nav
        v-show="showMenu || !smallWindow"
        :class="{
          smallWindow: smallWindow,
        }"
        class="relative z-50 flex flex-col justify-center w-full text-lg font-normal bg-white text-main h-screen--13 md:mr-2 md:h-12 md:float-right top--13 md:top-0 md:bg-transparent align-center md:w-auto md:inline-block mt-13 md:mt-0"
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
.h-13 {
  height: 3.25rem;
}

.mt-13 {
  margin-top: 3.25rem;
}

.border-top {
  border-top: 0.25rem solid hsl(290, 90%, 45%);
}

.top--13 {
  top: -3.25rem;
}

.h-screen--13 {
  height: calc(100vh - 3.25rem);
}

.menu-item {
  transition: 0.3s;
  @apply text-center p-3 font-heading m-0 w-full block relative rounded-tl-lg rounded-br-lg;
  top: -3rem;
}

.menu-item:hover {
  @apply bg-main text-white;
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
