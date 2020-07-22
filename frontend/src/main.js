/*
  main.js

  The main vue instance. The authentication wrapper and messageStore
  are bound to this instance so they can be accessed throughout the full app
*/

import Vue from 'vue'
import vueHeadful from 'vue-headful'

import App from './App'
import router from './router'
import auth from './authentication'
import messageStore from './messageStore'

import './registerServiceWorker'
import './assets/styles/tailwind.pcss'

Vue.config.productionTip = false

Vue.prototype.$messages = messageStore
Vue.prototype.$auth = auth

Vue.component('VueHeadful', vueHeadful)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})
