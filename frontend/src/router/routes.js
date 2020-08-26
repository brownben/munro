import store from '/@/store/index.ts'
import requireAuthentication from './requireAuthentication'

const homeRoutes = [
  {
    path: '/',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/about',
    component: () => import('/@/views/About.vue'),
  },
]
const searchRoutes = [
  {
    path: '/search',
    component: () => import('/@/views/Search.vue'),
  },
  {
    path: '/search/:query',
    component: () => import('/@/views/Search.vue'),
  },
]
const loginRoutes = [
  {
    path: '/login',
    component: () => import('/@/views/admin/Login.vue'),
  },
  {
    path: '/logout',
    beforeEnter: function (to, from, next) {
      // Logout then redirect to the home page
      next('/')
      store
        .dispatch('logout')
        .then(() =>
          store.dispatch('createMessage', 'Goodbye - Logged Out Successfully')
        )
        .catch(() =>
          store.dispatch(
            'createMessage',
            'Problem Logging Out - Please Try Again'
          )
        )
    },
  },
]
const competitorRoutes = [
  {
    path: '/leagues/:league/competitors',
    component: () => import('/@/views/admin/Competitors.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/create',
    component: () => import('/@/views/admin/CompetitorForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/merge',
    component: () => import('/@/views/admin/CompetitorMerge.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/:id',
    component: () => import('/@/views/Competitor.vue'),
  },
  {
    path: '/competitors/:id/edit',
    component: () => import('/@/views/admin/CompetitorForm.vue'),
    beforeEnter: requireAuthentication,
  },
]
const leagueRoutes = [
  {
    path: '/leagues',
    component: () => import('/@/views/Leagues.vue'),
  },
  {
    path: '/leagues/create',
    component: () => import('/@/views/admin/LeagueForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:name',
    component: () => import('/@/views/LeagueHome.vue'),
  },
  {
    path: '/leagues/:name/edit',
    component: () => import('/@/views/admin/LeagueForm.vue'),
    beforeEnter: requireAuthentication,
  },
]
const eventRoutes = [
  {
    path: '/events/create',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/events/:id/edit',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:league/create-event',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/embed/leagues/:name/events',
    component: () => import('/@/views/LeagueEventsEmbed.vue'),
  },
  {
    path: '/latest-results',
    component: () => import('/@/views/LatestResults.vue'),
  },
]
const resultRoutes = [
  {
    path: '/events/:event/results',
    component: () => import('/@/views/EventResultsTable.vue'),
  },
  {
    path: '/events/:event/results/:course',
    component: () => import('/@/views/EventResultsTable.vue'),
  },
  {
    path: '/leagues/:league/results/:course',
    component: () => import('/@/views/LeagueResultsTable.vue'),
  },
  {
    path: '/embed/leagues/:league/results/:course',
    component: () => import('/@/views/LeagueResultsTable.vue'),
  },
  {
    path: '/results/transfer',
    component: () => import('/@/views/admin/ResultTransfer.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/results/manual',
    component: () => import('/@/views/admin/ManualPointsForm.vue'),
  },
]
const uploadRoutes = [
  {
    path: '/upload',
    component: () => import('/@/views/Upload.vue'),
  },
  {
    path: '/upload/instructions',
    component: () => import('/@/views/UploadInstructions.vue'),
  },
  {
    path: '/upload/file',
    component: () => import('/@/views/UploadFile.vue'),
  },
  {
    path: '/upload/maprun',
    component: () => import('/@/views/UploadMaprun.vue'),
  },
  {
    path: '/upload/result',
    component: () => import('/@/views/UploadResult.vue'),
  },
  {
    path: '/upload/:id',
    component: () => import('/@/views/UploadFile.vue'),
  },
  {
    path: '/developers',
    component: () => import('/@/views/Developers.vue'),
  },
]
const notFoundRoutes = [
  {
    path: '/:catchAll(.*)',
    component: () => import('/@/views/NotFound.vue'),
  },
]

export default [
  ...homeRoutes,
  ...searchRoutes,
  ...loginRoutes,
  ...competitorRoutes,
  ...leagueRoutes,
  ...eventRoutes,
  ...resultRoutes,
  ...uploadRoutes,
  ...notFoundRoutes,
]
