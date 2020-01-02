/*
  router.js

  Sets up the VueJS router, defining all routes and which view to display for each one
*/

import Vue from 'vue'
import Router from 'vue-router'

import messageStore from '@/messageStore'

const CompetitorForm = () => import('@/views/CompetitorForm')
const CompetitorMerge = () => import('@/views/CompetitorMerge')
const Competitors = () => import('@/views/Competitors')
const EventForm = () => import('@/views/EventForm')
const Home = () => import('@/views/Home')
const LeagueForm = () => import('@/views/LeagueForm')
const League = () => import('@/views/LeagueHome')
const Leagues = () => import('@/views/Leagues')
const LeagueEventsEmbed = () => import('@/views/LeagueEventsEmbed')
const Login = () => import('@/views/Login')
const NotFound = () => import('@/views/NotFound')
const LeagueResultsTable = () => import('@/views/LeagueResultsTable')
const EventResultsTable = () => import('@/views/EventResultsTable')
const ResultTransfer = () => import('@/views/ResultTransfer')
const Upload = () => import('@/views/Upload')
const UploadInstructions = () => import('@/views/UploadInstructions')
const Developers = () => import('@/views/Developers')
const LatestResults = () => import('@/views/LatestResults')

// Bind to Vue Instance
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/create-competitor',
      name: 'Create Competitor',
      component: CompetitorForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/competitors',
      name: 'Competitors',
      component: Competitors,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/competitors/:id/edit',
      name: 'Edit Competitors',
      component: CompetitorForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/competitors/merge',
      name: 'Merge Competitors',
      component: CompetitorMerge,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/competitors/:league',
      name: 'Competitors for League',
      component: Competitors,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/create-league',
      name: 'Create League',
      component: LeagueForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/leagues',
      name: 'Leagues',
      component: Leagues,
    },
    {
      path: '/leagues/:name',
      name: 'League',
      component: League,
    },
    {
      path: '/embed/leagues/:name/events',
      name: 'Embed League Events',
      component: LeagueEventsEmbed,
    },
    {
      path: '/leagues/:name/edit',
      name: 'Edit League',
      component: LeagueForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/leagues/:league/create-event',
      name: 'Create Event for League',
      component: EventForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/leagues/:name/results/:course',
      name: 'League Course Results',
      component: LeagueResultsTable,
    },
    {
      path: '/embed/leagues/:name/results/:course',
      name: 'Embed League Course Results',
      component: LeagueResultsTable,
    },
    {
      path: '/create-event',
      name: 'Create Event',
      component: EventForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/events/:id/edit',
      name: 'Edit Events',
      component: EventForm,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/events/:event/results',
      name: 'Event Results',
      component: EventResultsTable,
    },
    {
      path: '/upload',
      name: 'Upload Results',
      component: Upload,
    },
    {
      path: '/upload/:id',
      name: 'Upload Results (From Event Page)',
      component: Upload,
    },
    {
      path: '/upload-instructions',
      name: 'Upload Instructions',
      component: UploadInstructions,
    },
    {
      path: '/results/transfer',
      name: 'Transfer Result',
      component: ResultTransfer,
      beforeEnter: requireAuthentication,
    },
    {
      path: '/latest-results',
      name: 'Latest Results',
      component: LatestResults,
    },
    {
      path: '/developers',
      name: 'Developers',
      component: Developers,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logout',
      beforeEnter: function (to, from, next) {
        // Logout then redirect to the home page
        router.app.$auth.logout()
          .then(() => {
            next('/')
            messageStore.addMessage('Goodbye - Logged Out Successfully')
          })
          .catch(() => messageStore.addMessage('Problem Logging Out - Please Try Again'))
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],

  // Use natural looking routes (/<route>) not /#<route>
  mode: 'history',
})

export default router

function requireAuthentication (to, from, next) {
  // Check they are logged in before going to restricted route, if they are not redirect
  const currentUser = router.app.$auth.user
  if (!currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
  else next()
}
