import store from '/@/store'

export default (to, from, next) => {
  // Check they are logged in before going to restricted route, if they are not redirect
  if (!store.getters.loggedIn)
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  else next()
}
