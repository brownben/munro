/*
  authentication.js

  Contains the functions to interact with the autthentication api.
  Stores login state in isLoggedIn for the views to access, this is updated using checkLogin
*/

import axios from 'axios'

export default {
  login: function (username, password) {
    return axios.post('/api/auth/login', {
      username: username,
      password: password,
    })
      .then(response => {
        this.isLoggedIn = true
        return response
      })
  },

  logout: function () {
    return axios.post('/api/auth/logout')
      .then(() => { this.isLoggedIn = false })
  },

  checkLogin: function () {
    return axios.get('/api/auth/isLoggedIn')
      .then(response => {
        this.isLoggedIn = response.data.logged_in
        return response.data.logged_in
      })
  },

  isLoggedIn: false,
}
