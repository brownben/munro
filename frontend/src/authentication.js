/*
  authentication.js

  Contains the functions to interact with the autthentication api.
  Stores login state in isLoggedIn for the views to access, this is updated using checkLogin
*/

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  login: function (username, password) {
    return firebase.auth().signInWithEmailAndPassword(username, password)
      .then(user => {
        this.user = user
        return user
      })
  },

  logout: function () {
    return firebase.auth().signOut()
      .then(() => { this.user = false })
  },

  checkLogin: function () {
    this.user = firebase.auth().currentUser
    if (this.user) return true
    else return false
  },

  user: false,
}
