/*
  main.js

  The main vue instance. The authentication wrapper and messageStore
  are bound to this instance so they can be accessed throughout the full app
*/

import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from './App'
import router from './router'
import auth from './authentication'
import messageStore from './messageStore'

Vue.config.productionTip = false

Vue.prototype.$messages = messageStore
Vue.prototype.$auth = auth

firebase.initializeApp({
  apiKey: 'AIzaSyCVgYvAzUakBroge-gVtTLF5MxjFpBEOYs',
  authDomain: 'munro-c6d2e.firebaseapp.com',
  projectId: 'munro-c6d2e',
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
    user.getIdToken().then(function (token) {
      document.cookie = 'token=' + token
    })
  }
  else {
    document.cookie = 'token='
  }
  initialize()
})

