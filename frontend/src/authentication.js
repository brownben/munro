/*
  authentication.js

  Contains the functions to interact with the autthentication api.
*/

import axios from 'axios'

export default {
  login: function (username, password) {
    return axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ',
        {
          email: username,
          password,
          returnSecureToken: true,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((user) => {
        this.user = user
        document.cookie = `token=${user.idToken};secure;samesite=strict;path=/`
        return this.user
      })
  },

  logout: function () {
    this.user = false
    document.cookie = 'token=;secure;samesite=strict;path=/'
    return Promise.resolve(this.user)
  },

  user: false,
}
