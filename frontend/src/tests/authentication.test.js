/*
  Unit Tests for /frontend/src/authentication.js
*/

import axios from 'axios'
import authentication from '@/authentication'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  authentication.isLoggedIn = false
})

test('Successful Login', () => {
  axios.post.mockResolvedValue({
    'message': 'Hello Username',
    'loggedIn': true,
  })
  return authentication.login().then(response => {
    expect(response).toEqual({
      'message': 'Hello Username',
      'loggedIn': true,
    })
    expect(authentication.isLoggedIn).toBeTruthy()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenLastCalledWith('/api/auth/login', expect.any(Object))
  })
})

test('Rejected Login', () => {
  axios.post.mockRejectedValue({
    'message': 'Wrong Username or Password',
    'loggedIn': false,
  })
  return authentication.login().catch(response => {
    expect(response).toEqual({
      'message': 'Wrong Username or Password',
      'loggedIn': false,
    })
    expect(authentication.isLoggedIn).toBeFalsy()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenLastCalledWith('/api/auth/login', expect.any(Object))
  })
})

test('Successful Logout', () => {
  authentication.isLoggedIn = true
  axios.post.mockResolvedValue({ 'message': 'Logged Out Successfully' })
  return authentication.logout().then(() => {
    expect(authentication.isLoggedIn).toBeFalsy()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenLastCalledWith('/api/auth/logout')
  })
})

test('Logout Error', () => {
  authentication.isLoggedIn = true
  axios.post.mockRejectedValue({ 'message': 'Something went Wrong' })
  return authentication.logout().catch(() => {
    expect(authentication.isLoggedIn).toBeTruthy()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenLastCalledWith('/api/auth/logout')
  })
})

test('Check Login - Logged In', () => {
  axios.get.mockResolvedValue({ 'data': { 'logged_in': true } })
  return authentication.checkLogin().then(response => {
    expect(response).toEqual(true)
    expect(authentication.isLoggedIn).toBeTruthy()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenLastCalledWith('/api/auth/isLoggedIn')
  })
})

test('Check Login - Logged Out', () => {
  axios.get.mockResolvedValue({ 'data': { 'logged_in': false } })
  return authentication.checkLogin().then(response => {
    expect(response).toEqual(false)
    expect(authentication.isLoggedIn).toBeFalsy()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenLastCalledWith('/api/auth/isLoggedIn')
  })
})
