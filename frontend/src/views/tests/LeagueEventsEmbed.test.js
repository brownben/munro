/*
  League Home View Unit Tests
*/

import axios from 'axios'
import VueRouter from 'vue-router'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import League from '@/views/LeagueEventsEmbed'
import { sampleSingleLeague } from '@/tests/test data/leagues'
import { sampleSingleEvent, sampleThreeEvents } from '@/tests/test data/events'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ league: sampleSingleLeague, events: sampleThreeEvents })
  expect(wrapper.element).toMatchSnapshot()
})

test('Calls Correct Functions on Load', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  await wrapper.vm.$mount()
  expect(mockGetLeague).toHaveBeenCalledTimes(1)
  expect(mockGetLeague).toHaveBeenLastCalledWith()
  expect(mockGetLeagueEvents).toHaveBeenCalledTimes(1)
  expect(mockGetLeagueEvents).toHaveBeenLastCalledWith()
})

test('Reload League on Route Change', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({ routes: [{ path: '/' }, { path: '/other' }] })
  shallowMount(League, {
    localVue,
    router,
    mocks: {
      $auth: { user: false },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  expect(mockGetLeague).toHaveBeenCalledTimes(0)
  expect(mockGetLeagueEvents).toHaveBeenCalledTimes(0)
  router.push('/other')
  await flushPromises()
  expect(mockGetLeague).toHaveBeenCalledTimes(1)
  expect(mockGetLeague).toHaveBeenLastCalledWith()
  expect(mockGetLeagueEvents).toHaveBeenCalledTimes(1)
  expect(mockGetLeagueEvents).toHaveBeenLastCalledWith()
})

test('Get League - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: 'Test' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getLeague()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/Test')
})

test('Get League - Success', async () => {
  const mockAddMessage = jest.fn()
  axios.get.mockResolvedValue({ data: sampleSingleLeague[0] })
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.getLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.league).toEqual(sampleSingleLeague[0])
})

test('Get League - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Getting League Details'
  )
})

test('Get League Events - No League Data', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  wrapper.setData({ league: false })
  expect(wrapper.vm.getLeagueEvents()).toBeFalsy()
  expect(axios.get).toHaveBeenCalledTimes(0)
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
})

test('Get League Events - Correct API', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/Test/events')
})

test('Get League Events - Success', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleEvent })
  wrapper.setData({ league: sampleSingleLeague })
  await wrapper.vm.getLeagueEvents()
  expect(wrapper.vm.events).toEqual(sampleSingleEvent)
})

test('Get League Events - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Getting Event Details'
  )
})

test('Scoring Method Shorthand to Full', () => {
  const wrapper = mount(League, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.scoringMethodShorthandToFull('position')).toBe(
    'Position Based (100 Max)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('position50')).toBe(
    'Position Based (50 Max)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('position99')).toBe(
    'Position Based (99 Max)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('position99average')).toBe(
    'Position Based (99 Max, Reduced in a Draw)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('positionDouble')).toBe(
    'Position Based (100 Max, Double Points)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('position50Double')).toBe(
    'Position Based (50 Max, Double Points)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('timeAverage')).toBe(
    'Relative to Average Time (1000 Average)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('timeAverage100')).toBe(
    'Relative to Average Time (100 Average)'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('file')).toBe(
    'From Upload File'
  )
  expect(wrapper.vm.scoringMethodShorthandToFull('')).toBe('')
  expect(wrapper.vm.scoringMethodShorthandToFull('pos')).toBe('')
})
