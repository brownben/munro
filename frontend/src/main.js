/*
  main.js

  The main vue instance. The authentication wrapper and messageStore
  are bound to this instance so they can be accessed throughout the full app
*/

import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import vueHeadful from 'vue-headful'

import App from './App'
import router from './router'
import auth from './authentication'
import messageStore from './messageStore'

Vue.config.productionTip = false

Vue.prototype.$messages = messageStore
Vue.prototype.$auth = auth

Vue.component('vue-headful', vueHeadful)

firebase.initializeApp({
  apiKey: 'AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ',
  authDomain: 'munro-leagues.firebaseapp.com',
  projectId: 'munro-leagues',
})
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

let app
function initialize () {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App),
    })
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    Vue.prototype.$auth.user = user
    user.getIdToken().then(token => {
      document.cookie = 'token=' + token + ';secure;samesite=strict;path=/'
    })
  }
  else {
    document.cookie = 'token=;secure;samesite=strict;path=/'
  }
  initialize()
})
