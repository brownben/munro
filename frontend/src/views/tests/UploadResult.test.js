import axios from 'axios'

import { mount } from '@vue/test-utils'

import Upload from '@/views/UploadResult.vue'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Upload Buttons Shows Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: '1',
    name: '2',
    course: '3',
    time: '2',
  })
  expect(wrapper.findAll('button').length).toBe(1)
  expect(wrapper.element).toMatchSnapshot()
  wrapper.setData({
    eventId: '1',
    name: '2',
    course: '',
    time: '2',
  })
  expect(wrapper.findAll('button').length).toBe(0)
  wrapper.setData({
    eventId: '',
    name: '2',
    course: '',
    time: '',
  })
  expect(wrapper.findAll('button').length).toBe(0)
})

test('Get Events - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
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
  await wrapper.vm.getEvents()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events')
})

test('Get Events - Success', async () => {
  const mockAddMessage = jest.fn()

  const wrapper = mount(Upload, {
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
  axios.get.mockResolvedValue({
    data: [
      { userSubmittedResults: false, name: 'a' },
      { userSubmittedResults: true, name: 'b' },
      { userSubmittedResults: true, name: 'c' },
    ],
  })
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([
    { userSubmittedResults: true, name: 'b' },
    { userSubmittedResults: true, name: 'c' },
  ])
})

test('Get Events - No Events', async () => {
  const mockAddMessage = jest.fn()

  const wrapper = mount(Upload, {
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
  axios.get.mockResolvedValue({
    data: [],
  })
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([])
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Sorry, No Events Found to Submit Results For'
  )
})

test('Get Events - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
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
  await wrapper.vm.getEvents()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Getting Event Details'
  )
})

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getLeagues()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues')
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  axios.get.mockResolvedValue({ data: [{ league: '1' }, { league: '2' }] })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([{ league: '1' }, { league: '2' }])

  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])

  axios.get.mockResolvedValue({
    data: [
      { league: 'a', property: 3 },
      { league: '2', another: 4 },
    ],
  })
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([
    { league: 'a', property: 3 },
    { league: '2', another: 4 },
  ])
})

test('Get Leagues - Shows Message on Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching League Details'
  )
})

test('Upload Result - Success', async () => {
  const mockAddMessage = jest.fn()
  const mockRouterPush = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $router: { push: mockRouterPush },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: '1',
    course: '2',
    name: '3',
    time: '4',
  })
  axios.post.mockResolvedValue()
  await wrapper.vm.uploadResult()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith('/api/upload/result', {
    eventId: '1',
    course: '2',
    name: '3',
    time: '4',
  })
  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/events/1/results')
  expect(mockAddMessage).toHaveBeenCalledWith('Result Uploaded Successfully')
})

test('Upload Result - Failure', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.post.mockRejectedValue({ response: { data: { message: 'Error' } } })
  await wrapper.vm.uploadResult()
  expect(mockAddMessage).toHaveBeenLastCalledWith('Error')
})
