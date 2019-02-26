/*
  Unit Tests for /frontend/src/authentication.js
*/

import axios from 'axios'
import authentication from '../authentication'

jest.mock('axios')

beforeEach(() => {
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
    expect(authentication.isLoggedIn).toBe(true)
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
    expect(authentication.isLoggedIn).toBe(false)
  })
})

test('Successful Logout', () => {
  authentication.isLoggedIn = true
  axios.post.mockResolvedValue({ 'message': 'Logged Out Successfully' })
  return authentication.logout().then(() => {
    expect(authentication.isLoggedIn).toBe(false)
  })
})

test('Logout Error', () => {
  authentication.isLoggedIn = true
  axios.post.mockRejectedValue({ 'message': 'Something went Wrong' })
  return authentication.logout().catch(() => {
    expect(authentication.isLoggedIn).toBe(true)
  })
})

test('Check Login - Logged In', () => {
  axios.get.mockResolvedValue({ 'data': { 'logged_in': true } })
  return authentication.checkLogin().then(response => {
    expect(response).toEqual(true)
    expect(authentication.isLoggedIn).toBe(true)
  })
})

test('Check Login - Logged Out', () => {
  axios.get.mockResolvedValue({ 'data': { 'logged_in': false } })
  return authentication.checkLogin().then(response => {
    expect(response).toEqual(false)
    expect(authentication.isLoggedIn).toBe(false)
  })
})
