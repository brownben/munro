/*
  router.js

  Sets up the VueJS router, defining all routes and which view to display for each one
*/

import Vue from 'vue'
import Router from 'vue-router'

import messageStore from '@/messageStore'

import CompetitorForm from '@/views/CompetitorForm'
import CompetitorMerge from '@/views/CompetitorMerge'
import Competitors from '@/views/Competitors'
import EventForm from '@/views/EventForm'
import Home from '@/views/Home'
import LeagueForm from '@/views/LeagueForm'
import League from '@/views/LeagueHome'
import Leagues from '@/views/Leagues'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'
import ResultsTable from '@/views/ResultsTable'
import ResultTransfer from '@/views/ResultTransfer'
import Upload from '@/views/Upload'

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
      component: ResultsTable,
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
      path: '/results/transfer',
      name: 'Transfer Result',
      component: ResultTransfer,
      beforeEnter: requireAuthentication,
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
