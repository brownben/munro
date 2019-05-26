/*
  Latest Results View Unit Tests
*/

import axios from 'axios'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import LatestResults from '@/views/LatestResults'
import { sampleSingleLeague } from '@/tests/test data/leagues'
import { sampleThreeEvents } from '@/tests/test data/events'

jest.mock('axios')
const flushPromises = () => new Promise(resolve => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const mockGetEvents = jest.fn()
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getEventsWithResults: mockGetEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const mockGetEvents = jest.fn()
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getEventsWithResults: mockGetEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ events: sampleThreeEvents })
  expect(wrapper.element).toMatchSnapshot()
})

test('Calls Correct Functions on Load', async () => {
  const mockGetEvents = jest.fn().mockResolvedValue()
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getEventsWithResults: mockGetEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  await wrapper.vm.$mount()
  expect(mockGetEvents).toHaveBeenCalledTimes(1)
  expect(mockGetEvents).toHaveBeenLastCalledWith()
})

test('Reload League on Route Change', async () => {
  const mockGetEvents = jest.fn().mockResolvedValue()
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({ routes: [{ path: '/' }, { path: '/other' }] })
  shallowMount(LatestResults, {
    localVue,
    router,
    mocks: {
      $auth: { user: false },
    },
    methods: {
      getEventsWithResults: mockGetEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  expect(mockGetEvents).toHaveBeenCalledTimes(0)
  router.push('/other')
  await flushPromises()
  expect(mockGetEvents).toHaveBeenCalledTimes(1)
  expect(mockGetEvents).toHaveBeenLastCalledWith()
})

test('Get Events - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: 'Test' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getEventsWithResults()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/latest-results')
})

test('Get League - Success', async () => {
  const mockAddMessage = jest.fn()
  axios.get.mockResolvedValue({ data: sampleSingleLeague[0] })
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.getEventsWithResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.events).toEqual(sampleSingleLeague[0])
})

test('Get League - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getEventsWithResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Getting Event Details')
})

test('Scoring Method Shorthand to Full', () => {
  const wrapper = shallowMount(LatestResults, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: jest.fn() },
      mounted: () => { },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.scoringMethodShorthandToFull('position')).toBe('Position Based (100 Max)')
  expect(wrapper.vm.scoringMethodShorthandToFull('position50')).toBe('Position Based (50 Max)')
  expect(wrapper.vm.scoringMethodShorthandToFull('position99')).toBe('Position Based (99 Max)')
  expect(wrapper.vm.scoringMethodShorthandToFull('position99average')).toBe('Position Based (99 Max, Reduced in a Draw)')
  expect(wrapper.vm.scoringMethodShorthandToFull('position5')).toBe('')
  expect(wrapper.vm.scoringMethodShorthandToFull('ello')).toBe('')
})
