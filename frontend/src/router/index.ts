import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export default createRouter({
  routes,
  history: createWebHistory('/'),

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { top: 0, left: 0, behavior: 'smooth' }
  },
})
