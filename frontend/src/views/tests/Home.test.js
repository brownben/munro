/*
  Home View Unit Tests
*/

import axios from 'axios'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home'
import { sampleDataOneLeague, sampleDataThreeLeagues } from '@/tests/test data/leagues'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - No Leagues', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - One League', async () => {
  axios.get.mockResolvedValue({ data: sampleDataOneLeague })
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
  })
  await wrapper.vm.getLeagues()
  expect(wrapper.findAll('.league').length).toBe(1)
  expect(wrapper.find('.league').find('h1').text()).toBe('Sprintelope')
  expect(wrapper.find('.league').find('img').attributes('alt')).toBe('The Logo of Sprintelope')
  expect(wrapper.find('.league').findAll('p').length).toBe(1)
})

test('Renders Correctly - Multiple Leagues', async () => {
  axios.get.mockResolvedValue({ data: sampleDataThreeLeagues })
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
  })
  await wrapper.vm.getLeagues()
  expect(wrapper.findAll('.league').length).toBe(3)
  expect(wrapper.element).toMatchSnapshot()
})

test('Shows Admin Buttons When Logged In', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: true },
    },
  })
  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
  expect(wrapper.find('.actions').findAll('button').length).toBe(2)
  expect(wrapper.find('.actions').findAll('button').at(0).text()).toBe('Create New League')
  expect(wrapper.find('.actions').findAll('button').at(1).text()).toBe('Upload Results')
})

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
  })
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleDataOneLeague })
  await wrapper.vm.getLeagues()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues')
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
  })
  axios.get.mockResolvedValue({ data: [{ league: '1' }, { league: '2' }] })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([{ league: '1' }, { league: '2' }])

  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])

  axios.get.mockResolvedValue({ data: [{ league: 'a', property: 3 }, { league: '2', another: 4 }] })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([{ league: 'a', property: 3 }, { league: '2', another: 4 }])
})

test('Get Leagues - Shows Message on Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Home, {
    mocks: {
      $auth: { isLoggedIn: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Problem Fetching League Details')
})
