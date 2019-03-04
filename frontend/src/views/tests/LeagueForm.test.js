/*
  League Form View Unit Tests
*/

import axios from 'axios'
import { mount } from '@vue/test-utils'
import LeagueForm from '@/views/LeagueForm'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Creation Form - Renders Correctly', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input'],
  })
  const getLeagueDetailsSpy = jest.spyOn(wrapper.vm, 'getLeagueDetails')
  expect(wrapper.vm.create).toBeTruthy()
  expect(getLeagueDetailsSpy).toHaveBeenCalledTimes(0)
  expect(wrapper.element).toMatchSnapshot()
})

test('Update Form - Renders Correctly', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/Test/edit', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input'],
  })
  const getLeagueDetailsSpy = jest.spyOn(wrapper.vm, 'getLeagueDetails')
  expect(wrapper.vm.create).toBeFalsy()
  expect(getLeagueDetailsSpy).toHaveBeenCalledTimes(1)
  expect(wrapper.element).toMatchSnapshot()
})

test('Submit Method', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input'],
  })
  const getCreateSpy = jest.spyOn(wrapper.vm, 'createLeague')
  const getUpdateSpy = jest.spyOn(wrapper.vm, 'updateLeague')

  wrapper.setData({ create: true })
  wrapper.vm.submit()
  expect(getCreateSpy).toHaveBeenCalledTimes(1)
  expect(getUpdateSpy).toHaveBeenCalledTimes(0)

  jest.resetAllMocks()

  wrapper.setData({ create: false })
  wrapper.vm.submit()
  expect(getUpdateSpy).toHaveBeenCalledTimes(1)
  expect(getCreateSpy).toHaveBeenCalledTimes(0)
})

test('Check Validation Works', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input'],
  })
  wrapper.setData({ name: '', scoringMethod: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: 'Value', scoringMethod: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: '', scoringMethod: 'Value' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: 'A Value', scoringMethod: 'Another Value' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
})

test('Return to League Home Page', () => {
  const mockAddMessageFunction = jest.fn()
  const mockRouterPushFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $router: { push: mockRouterPushFunction },
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input'],
  })
  wrapper.setData({ name: 'Test League' })
  wrapper.vm.returnToLeaguePage({ data: { message: 'This is the Message Returned' } })
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('This is the Message Returned')
  expect(mockRouterPushFunction).toHaveBeenCalledTimes(1)
  expect(mockRouterPushFunction).toHaveBeenLastCalledWith('/leagues/Test League')
})
