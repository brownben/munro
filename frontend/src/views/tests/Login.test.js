/*
  Login View Unit Tests
*/

import { mount } from '@vue/test-utils'
import Login from '@/views/Login'
import auth from '@/authentication'

jest.mock('@/authentication')

beforeEach(() => jest.clearAllMocks())

test('Is a Vue Instance', () => {
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Show Message on When Redirected', () => {
  const mockAddMessageFunction = jest.fn()
  mount(Login, {
    mocks: {
      $route: { query: { redirect: '/leagues' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Please Login to Access that Page')
})

test('Blank Fields Works', () => {
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
    },
    stubs: ['router-link'],
  })
  wrapper.findAll('input').at(0).setValue('username')
  wrapper.findAll('input').at(1).setValue('password')
  expect(wrapper.vm.username).toBe('username')
  expect(wrapper.vm.password).toBe('password')
  wrapper.vm.blankFields()
  expect(wrapper.vm.username).toBe('')
  expect(wrapper.vm.password).toBe('')
})

test('Check Validation Works', () => {
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ username: '', password: '' })
  expect(wrapper.vm.validateLogin()).toBeFalsy()

  wrapper.setData({ username: 'value', password: '' })
  expect(wrapper.vm.validateLogin()).toBeFalsy()

  wrapper.setData({ username: '', password: 'value' })
  expect(wrapper.vm.validateLogin()).toBeFalsy()

  wrapper.setData({ username: 'A Value', password: 'Another Value' })
  expect(wrapper.vm.validateLogin()).toBeTruthy()

  wrapper.findAll('input').at(0).setValue('username')
  wrapper.findAll('input').at(1).setValue('password')
  expect(wrapper.vm.validateLogin()).toBeTruthy()
})

test('Send Login Function - Successful', async () => {
  const mockAddMessageFunction = jest.fn()
  auth.login.mockResolvedValue({ data: { 'loggedIn': true, 'message': 'Hello User' } })
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })
  const blankFieldsSpy = jest.spyOn(wrapper.vm, 'blankFields')
  // Calls Auth Login Functions
  wrapper.setData({ username: 'username', password: 'password' })
  await wrapper.vm.sendLoginRequest()
  expect(auth.login).toHaveBeenCalledTimes(1)
  expect(auth.login).toHaveBeenLastCalledWith('username', 'password')

  // Correct Actions On Completion
  expect(blankFieldsSpy).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Hello User')
})

test('Send Login Function - Validation Fails', () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })
  const blankFieldsSpy = jest.spyOn(wrapper.vm, 'blankFields')
  wrapper.setData({ username: '', password: '' })
  wrapper.vm.sendLoginRequest()
  expect(blankFieldsSpy).toHaveBeenCalledTimes(0)
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Problem: Username or Password were left Blank')
})

test('Send Login Function - Error', () => {
  const mockAddMessageFunction = jest.fn()
  auth.login.mockRejectedValue()
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })
  const blankFieldsSpy = jest.spyOn(wrapper.vm, 'blankFields')

  // Calls Auth Login Functions
  wrapper.setData({ username: 'username', password: 'password' })
  return wrapper.vm.sendLoginRequest().then(() => {
    expect(auth.login).toHaveBeenCalledTimes(1)
    expect(auth.login).toHaveBeenLastCalledWith('username', 'password')

    // Expect Correct Function on Response
    expect(blankFieldsSpy).toHaveBeenCalledTimes(0)
    expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
    expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Error: Problem Logging In - Please Try Again')
  })
})

test('Redirect on Successful Login', async () => {
  const mockAddMessageFunction = jest.fn()
  auth.login.mockResolvedValue({ data: { 'loggedIn': true, 'message': 'Hello User' } })
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: '/other' } },
      $router: { replace: jest.fn() },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })

  // Calls Auth Login Functions
  wrapper.setData({ username: 'username', password: 'password' })
  await wrapper.vm.sendLoginRequest()

  expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.$router.replace).toHaveBeenLastCalledWith('/other')
})

test('Redirect on Successful Login - If No Path Specified', async () => {
  const mockAddMessageFunction = jest.fn()
  auth.login.mockResolvedValue({ data: { 'loggedIn': true, 'message': 'Hello User' } })
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: false } },
      $router: { replace: jest.fn() },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })

  // Calls Auth Login Functions
  wrapper.setData({ username: 'username', password: 'password' })
  await wrapper.vm.sendLoginRequest()
  expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.$router.replace).toHaveBeenLastCalledWith('/')
})

test('Don\'t Redirect on Failed Login', async () => {
  const mockAddMessageFunction = jest.fn()
  auth.login.mockResolvedValue({ data: { 'loggedIn': false, 'message': 'Hello User' } })
  const wrapper = mount(Login, {
    mocks: {
      $route: { query: { redirect: '/other' } },
      $router: { replace: jest.fn() },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link'],
  })

  // Calls Auth Login Functions
  wrapper.setData({ username: 'username', password: 'password' })
  await wrapper.vm.sendLoginRequest()
  expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(0)
})
