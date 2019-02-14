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
