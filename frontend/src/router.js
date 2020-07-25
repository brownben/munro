/*
  router.js

  Sets up the VueJS router, defining all routes and which view to display for each one
*/

import Vue from 'vue'
import Router from 'vue-router'

import messageStore from '@/messageStore'

// Bind to Vue Instance
Vue.use(Router)

const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },
]
const loginRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/admin/Login'),
  },
  {
    path: '/logout',
    beforeEnter: function (to, from, next) {
      // Logout then redirect to the home page
      router.app.$auth
        .logout()
        .then(() => {
          next('/')
          messageStore.addMessage('Goodbye - Logged Out Successfully')
        })
        .catch(() =>
          messageStore.addMessage('Problem Logging Out - Please Try Again')
        )
    },
  },
]
const competitorRoutes = [
  {
    path: '/leagues/:league/competitors',
    name: 'Competitors',
    component: () => import('@/views/admin/Competitors'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/create',
    name: 'Create Competitor',
    component: () => import('@/views/admin/CompetitorForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/:id',
    name: 'Competitor',
    component: () => import('@/views/Competitor'),
  },
  {
    path: '/competitors/:id/edit',
    name: 'Edit Competitors',
    component: () => import('@/views/admin/CompetitorForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/merge',
    name: 'Merge Competitors',
    component: () => import('@/views/admin/CompetitorMerge'),
    beforeEnter: requireAuthentication,
  },
]
const leagueRoutes = [
  {
    path: '/leagues',
    name: 'Leagues',
    component: () => import('@/views/Leagues'),
  },
  {
    path: '/leagues/create',
    name: 'Create League',
    component: () => import('@/views/admin/LeagueForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:name',
    name: 'League',
    component: () => import('@/views/LeagueHome'),
  },
  {
    path: '/leagues/:name/edit',
    name: 'Edit League',
    component: () => import('@/views/admin/LeagueForm'),
    beforeEnter: requireAuthentication,
  },
]
const eventRoutes = [
  {
    path: '/events/create',
    name: 'Create Event',
    component: () => import('@/views/admin/EventForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/events/:id/edit',
    name: 'Edit Events',
    component: () => import('@/views/admin/EventForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:league/create-event',
    name: 'Create Event for League',
    component: () => import('@/views/admin/EventForm'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/embed/leagues/:name/events',
    name: 'Embed League Events',
    component: () => import('@/views/LeagueEventsEmbed'),
  },
  {
    path: '/latest-results',
    name: 'Latest Results',
    component: () => import('@/views/LatestResults'),
  },
]
const resultRoutes = [
  {
    path: '/events/:event/results',
    name: 'Event Results',
    component: () => import('@/views/EventResultsTable'),
  },
  {
    path: '/leagues/:name/results/:course',
    name: 'League Course Results',
    component: () => import('@/views/LeagueResultsTable'),
  },
  {
    path: '/embed/leagues/:name/results/:course',
    name: 'Embed League Course Results',
    component: () => import('@/views/LeagueResultsTable'),
  },
  {
    path: '/results/transfer',
    name: 'Transfer Result',
    component: () => import('@/views/admin/ResultTransfer'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/results/manual',
    name: 'Manual Result',
    component: () => import('@/views/admin/ManualPointsForm'),
  },
]
const uploadRoutes = [
  {
    path: '/upload',
    name: 'Upload Results',
    component: () => import('@/views/Upload'),
  },
  {
    path: '/upload/instructions',
    name: 'Upload Instructions',
    component: () => import('@/views/UploadInstructions'),
  },
  {
    path: '/upload/file',
    name: 'Upload Results File',
    component: () => import('@/views/UploadFile'),
  },
  {
    path: '/upload/maprun',
    name: 'MapRun Results Import',
    component: () => import('@/views/UploadMaprun'),
  },
  {
    path: '/upload/result',
    name: 'User Submitted Results Form',
    component: () => import('@/views/UploadResult'),
  },
  {
    path: '/upload/:id',
    name: 'Upload Results (From Event Page)',
    component: () => import('@/views/UploadFile'),
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () => import('@/views/Developers'),
  },
]
const notFoundRoutes = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound'),
  },
]

const router = new Router({
  routes: [
    ...homeRoutes,
    ...loginRoutes,
    ...competitorRoutes,
    ...leagueRoutes,
    ...eventRoutes,
    ...resultRoutes,
    ...uploadRoutes,
    ...notFoundRoutes,
  ],

  scrollBehavior() {
    return { x: 0, y: 0 }
  },

  // Use natural looking routes (/<route>) not /#<route>
  mode: 'history',
})

export default router

function requireAuthentication(to, from, next) {
  // Check they are logged in before going to restricted route, if they are not redirect
  const currentUser = router.app.$auth.user
  if (!currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else next()
}
