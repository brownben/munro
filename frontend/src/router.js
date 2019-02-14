import Vue from 'vue'
import Router from 'vue-router'

import messageStore from '@/messageStore'

import Home from '@/views/Home'
import League from '@/views/League'
import LeagueForm from '@/views/LeagueForm'
import EventForm from '@/views/EventForm'
import Upload from '@/views/Upload'
import Table from '@/views/ResultsTable'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/create-league',
      name: 'Create League',
      component: LeagueForm,
      beforeEnter: requireAuthentication,
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
      path: '/leagues/:name/:course',
      name: 'League Course Results',
      component: Table,
    },

    {
      path: '/create-event',
      name: 'Create Event',
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
      path: '/events/:id/edit',
      name: 'Edit Events',
      component: EventForm,
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
  mode: 'history',
})

export default router

function requireAuthentication (to, from, next) {
  router.app.$auth.checkLogin()
    .then(loggedIn => {
      if (!loggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
      else next()
    })
}
