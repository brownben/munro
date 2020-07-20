/*
  Unit Tests for /frontend/src/authentication.js
*/

import authentication from '@/authentication'

import axios from 'axios'
jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
})

test('Login', async () => {
  authentication.user = false
  axios.post.mockResolvedValue({
    data: { name: 'Hello', idToken: 1 },
  })
  await authentication.login('username', 'password')
  expect(authentication.user).toBeTruthy()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith(
    expect.any(String),
    {
      email: 'username',
      password: 'password',
      returnSecureToken: true,
    },
    { headers: { 'Content-Type': 'application/json' } }
  )
  expect(authentication.user).toEqual({ name: 'Hello', idToken: 1 })
})

test('Logout', async () => {
  authentication.user = true
  await authentication.logout()
  expect(authentication.user).toBeFalsy()
})
