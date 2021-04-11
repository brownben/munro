import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useAuthentication } from '../store/authentication'

export default (to: RouteLocationNormalized): RouteLocationRaw | true => {
  const auth = useAuthentication()
  // Check they are logged in before going to restricted route, if they are not redirect
  if (!auth.loggedIn)
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  else return true
}
