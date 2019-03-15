/*
  League Home View Unit Tests
*/

import axios from 'axios'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import League from '@/views/LeagueHome'
import { sampleSingleLeague } from '@/tests/test data/leagues'
import { sampleSingleEvent, sampleThreeEvents } from '@/tests/test data/events'

jest.mock('axios')
const flushPromises = () => new Promise(resolve => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
  })
  wrapper.setData({ league: sampleSingleLeague, events: sampleThreeEvents })
  expect(wrapper.element).toMatchSnapshot()
})

test('Calls Correct Functions on Load', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
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
      $auth: { isLoggedIn: false },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
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
      $auth: { isLoggedIn: false },
      $route: { params: { name: 'Test' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
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
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await wrapper.vm.getLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.league).toEqual(sampleSingleLeague[0])
})

test('Get League - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Getting League Details')
})

test('Get League Events - No League Data', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
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
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/Test/events')
})

test('Get League Events - Correct API - Logged In', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: true },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/Test/events/uploadKey')
})

test('Get League Events - Success', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleEvent })
  wrapper.setData({ league: sampleSingleLeague })
  await wrapper.vm.getLeagueEvents()
  expect(wrapper.vm.events).toEqual(sampleSingleEvent)
})

test('Get League Events - Success - Logged In', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: true },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
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
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Getting Event Details')
})

test('Get League Events - Error - Logged In', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: true },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  wrapper.setData({ league: { name: 'Test' } })
  await wrapper.vm.getLeagueEvents()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Getting Event Details')
})

test('Delete Event - Correct Confirm', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  global.confirm = jest.fn()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(global.confirm).toHaveBeenCalledTimes(1)
  expect(global.confirm).toHaveBeenLastCalledWith('Are you Sure you Want to Delete Event - EVENT? \nThis Action Can\'t Be Recovered')
})

test('Delete Event - Denied Confirmation', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  global.confirm = jest.fn().mockReturnValue(false)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(axios.delete).toHaveBeenCalledTimes(0)
})

test('Delete Event - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(axios.delete).toHaveBeenCalledTimes(1)
  expect(axios.delete).toHaveBeenLastCalledWith('/api/events/EVENT')
})

test('Delete Event - Success', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Event: EVENT was Deleted')
  expect(mockGetLeague).toHaveBeenCalledTimes(1)
  expect(mockGetLeagueEvents).toHaveBeenCalledTimes(1)
})

test('Delete Event - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockRejectedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Deleting Event - Please Try Again')
})

test('Delete League - Correct Confirm', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  global.confirm = jest.fn()
  wrapper.setData({ league: { name: 'LEAGUE' } })
  await wrapper.vm.deleteLeague()
  expect(global.confirm).toHaveBeenCalledTimes(1)
  expect(global.confirm).toHaveBeenLastCalledWith('Are you Sure you Want to Delete League - LEAGUE? \nThis Action Can\'t Be Recovered')
})

test('Delete League - Denied Confirmation', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  wrapper.setData({ league: { name: 'LEAGUE' } })
  global.confirm = jest.fn().mockReturnValue(false)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteLeague()
  expect(axios.delete).toHaveBeenCalledTimes(0)
})

test('Delete League - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  wrapper.setData({ league: { name: 'LEAGUE' } })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteLeague()
  expect(axios.delete).toHaveBeenCalledTimes(1)
  expect(axios.delete).toHaveBeenLastCalledWith('/api/leagues/LEAGUE')
})

test('Delete League - Success', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const mockAddMessage = jest.fn()
  const mockRouterPush = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $router: { push: mockRouterPush },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
  })
  wrapper.setData({ league: { name: 'LEAGUE' } })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('League: LEAGUE was Deleted')
  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/')
})

test('Delete League - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => { },
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  wrapper.setData({ league: { name: 'LEAGUE' } })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockRejectedValue()
  await wrapper.vm.deleteLeague()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Deleting League - Please Try Again')
})
