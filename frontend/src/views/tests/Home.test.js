/*
  Home View Unit Tests
*/

import axios from 'axios'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home'
import { sampleSingleLeague, sampleDataThreeLeagues } from '@/tests/test data/leagues'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - No Leagues', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - One League', async () => {
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.getLeagues()
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Multiple Leagues', async () => {
  axios.get.mockResolvedValue({ data: sampleDataThreeLeagues })
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.getLeagues()
  expect(wrapper.element).toMatchSnapshot()
})

test('Shows Admin Buttons When Logged In', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: true },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
  expect(wrapper.find('.actions').findAll('router-link-stub').length).toBe(3)
  expect(wrapper.find('.actions').findAll('router-link-stub').at(0).text()).toBe('Create New League')
  expect(wrapper.find('.actions').findAll('router-link-stub').at(1).text()).toBe('Upload Results')
})

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getLeagues()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues')
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
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
      $auth: { user: false },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Problem Fetching League Details')
})
