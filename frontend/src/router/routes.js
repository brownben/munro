import store from '/@/store'
import requireAuthentication from './requireAuthentication'

const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/Home.vue'),
  },
]
const searchRoutes = [
  {
    path: '/search',
    name: 'Search',
    component: () => import('/@/views/Search.vue'),
  },
  {
    path: '/search/:query',
    name: 'Search Query',
    component: () => import('/@/views/Search.vue'),
  },
]
const loginRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/admin/Login.vue'),
  },
  {
    path: '/logout',
    beforeEnter: function (to, from, next) {
      // Logout then redirect to the home page
      store
        .dispatch('logout')
        .then(() => {
          next('/')
          store.dispatch('createMessage', 'Goodbye - Logged Out Successfully')
        })
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
    name: 'Competitors',
    component: () => import('/@/views/admin/Competitors.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/create',
    name: 'Create Competitor',
    component: () => import('/@/views/admin/CompetitorForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/merge',
    name: 'Merge Competitors',
    component: () => import('/@/views/admin/CompetitorMerge.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/competitors/:id',
    name: 'Competitor',
    component: () => import('/@/views/Competitor.vue'),
  },
  {
    path: '/competitors/:id/edit',
    name: 'Edit Competitors',
    component: () => import('/@/views/admin/CompetitorForm.vue'),
    beforeEnter: requireAuthentication,
  },
]
const leagueRoutes = [
  {
    path: '/leagues',
    name: 'Leagues',
    component: () => import('/@/views/Leagues.vue'),
  },
  {
    path: '/leagues/create',
    name: 'Create League',
    component: () => import('/@/views/admin/LeagueForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:name',
    name: 'League',
    component: () => import('/@/views/LeagueHome.vue'),
  },
  {
    path: '/leagues/:name/edit',
    name: 'Edit League',
    component: () => import('/@/views/admin/LeagueForm.vue'),
    beforeEnter: requireAuthentication,
  },
]
const eventRoutes = [
  {
    path: '/events/create',
    name: 'Create Event',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/events/:id/edit',
    name: 'Edit Events',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/leagues/:league/create-event',
    name: 'Create Event for League',
    component: () => import('/@/views/admin/EventForm.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/embed/leagues/:name/events',
    name: 'Embed League Events',
    component: () => import('/@/views/LeagueEventsEmbed.vue'),
  },
  {
    path: '/latest-results',
    name: 'Latest Results',
    component: () => import('/@/views/LatestResults.vue'),
  },
]
const resultRoutes = [
  {
    path: '/events/:event/results',
    name: 'Event Results',
    component: () => import('/@/views/EventResultsTable.vue'),
  },
  {
    path: '/events/:event/results/:course',
    name: 'Event Results Course Specified',
    component: () => import('/@/views/EventResultsTable.vue'),
  },
  {
    path: '/leagues/:name/results/:course',
    name: 'League Course Results',
    component: () => import('/@/views/LeagueResultsTable.vue'),
  },
  {
    path: '/embed/leagues/:name/results/:course',
    name: 'Embed League Course Results',
    component: () => import('/@/views/LeagueResultsTable.vue'),
  },
  {
    path: '/results/transfer',
    name: 'Transfer Result',
    component: () => import('/@/views/admin/ResultTransfer.vue'),
    beforeEnter: requireAuthentication,
  },
  {
    path: '/results/manual',
    name: 'Manual Result',
    component: () => import('/@/views/admin/ManualPointsForm.vue'),
  },
]
const uploadRoutes = [
  {
    path: '/upload',
    name: 'Upload Results',
    component: () => import('/@/views/Upload.vue'),
  },
  {
    path: '/upload/instructions',
    name: 'Upload Instructions',
    component: () => import('/@/views/UploadInstructions.vue'),
  },
  {
    path: '/upload/file',
    name: 'Upload Results File',
    component: () => import('/@/views/UploadFile.vue'),
  },
  {
    path: '/upload/maprun',
    name: 'MapRun Results Import',
    component: () => import('/@/views/UploadMaprun.vue'),
  },
  {
    path: '/upload/result',
    name: 'User Submitted Results Form',
    component: () => import('/@/views/UploadResult.vue'),
  },
  {
    path: '/upload/:id',
    name: 'Upload Results (From Event Page)',
    component: () => import('/@/views/UploadFile.vue'),
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () => import('/@/views/Developers.vue'),
  },
]
const notFoundRoutes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
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
