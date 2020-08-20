import auth from '/@/authentication.js'

export default (to, from, next) => {
  // Check they are logged in before going to restricted route, if they are not redirect
  const currentUser = auth.user
  if (!currentUser)
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  else next()
}
