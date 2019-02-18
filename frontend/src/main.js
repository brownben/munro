/*
  main.js

  The main vue instance. The authentication wrapper and messageStore
  are bound to this instance so they can be accessed throughout the full app
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './authentication'
import messageStore from './messageStore'

Vue.config.productionTip = false

Vue.prototype.$messages = messageStore
Vue.prototype.$auth = auth

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
