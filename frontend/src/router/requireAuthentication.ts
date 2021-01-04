import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import store from '/@/store/index'

export default (to: RouteLocationNormalized): RouteLocationRaw | true => {
  // Check they are logged in before going to restricted route, if they are not redirect
  if (!store.getters.loggedIn)
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  else return true
}
