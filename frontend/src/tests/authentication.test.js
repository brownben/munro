/*
  Unit Tests for /frontend/src/authentication.js
*/

import firebase from 'firebase/app'
import 'firebase/auth'
import authentication from '@/authentication'

jest.mock('firebase')
jest.mock('firebase/app')
jest.mock('firebase/auth')

beforeEach(() => {
  jest.clearAllMocks()
})

test('Successful Login', async () => {
  authentication.user = false
  const mockSignIn = jest.fn().mockResolvedValue(true)
  firebase.auth = () => ({
    signInWithEmailAndPassword: mockSignIn,
  })
  await authentication.login('username', 'password')
  expect(authentication.user).toBeTruthy()
  expect(mockSignIn).toHaveBeenCalledTimes(1)
  expect(mockSignIn).toHaveBeenLastCalledWith('username', 'password')
})

test('Rejected Login', () => {
  authentication.user = false
  const mockSignIn = jest.fn().mockRejectedValue()
  firebase.auth = () => ({
    signInWithEmailAndPassword: mockSignIn,
  })
  return authentication.login('username', 'password').catch(() => {
    expect(authentication.user).toBeFalsy()
    expect(mockSignIn).toHaveBeenCalledTimes(1)
    expect(mockSignIn).toHaveBeenLastCalledWith('username', 'password')
  })
})

test('Successful Logout', async () => {
  const mockSignOut = jest.fn().mockResolvedValue()
  authentication.user = true
  firebase.auth = jest.fn().mockReturnValue({
    signOut: mockSignOut,
  })
  await authentication.logout()
  expect(authentication.user).toBeFalsy()
  expect(mockSignOut).toHaveBeenCalledTimes(1)
})

test('Logout Error', () => {
  const mockSignOut = jest.fn().mockRejectedValue()
  authentication.user = true
  firebase.auth = jest.fn().mockReturnValue({
    signOut: mockSignOut,
  })
  return authentication.logout().catch(() => {
    expect(authentication.user).toBeTruthy()
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })
})

test('Check Login - Logged In', () => {
  firebase.auth = jest.fn().mockReturnValue({ currentUser: true })
  expect(authentication.checkLogin()).toBeTruthy()
})

test('Check Login - Logged Out', () => {
  firebase.auth = jest.fn().mockReturnValue({ currentUser: false })
  expect(authentication.checkLogin()).toBeFalsy()
})
