import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router'
import routes from './routes'

export const createRouter = () =>
  _createRouter({
    routes,
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),

    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      else return { top: 0, left: 0, behavior: 'smooth' }
    },
  })
