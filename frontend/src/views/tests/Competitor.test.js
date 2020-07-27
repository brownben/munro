import axios from 'axios'
import { mount, shallowMount } from '@vue/test-utils'
import Competitor from '@/views/Competitor'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Competitor, {
    mocks: {
      $route: { path: '', params: {} },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Competitor, {
    mocks: {
      $route: { path: '', params: { id: '' } },
      $auth: { user: true },
    },
    propsData: {
      competitor: {
        name: 'Bob Jones',
        club: 'FVO',
        league: 'Sprintelope 2019',
        ageClass: 'M50',
      },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Competitor - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
    mocks: {
      $auth: { user: false },
      $route: { params: { id: 'Test' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getCompetitor()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/competitors/Test')
})

test('Get Competitor - Success', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
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
  axios.get.mockResolvedValue({ data: sampleSingleLeague[0] })
  await wrapper.vm.getCompetitor()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.competitor).toEqual(sampleSingleLeague[0])
})

test('Get Competitor - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
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
  await wrapper.vm.getCompetitor()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Getting Competitor Details'
  )
  wrapper.setData({ competitor: false })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Competitor Results - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
    mocks: {
      $auth: { user: false },
      $route: { params: { id: 'Test' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getCompetitorResults()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/competitors/Test/results')
})

test('Get Competitor Results - Success', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
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
  axios.get.mockResolvedValue({ data: sampleSingleLeague[0] })
  await wrapper.vm.getCompetitorResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.results).toEqual(sampleSingleLeague[0])
})

test('Get Competitor Results - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitor, {
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
  await wrapper.vm.getCompetitorResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Getting Competitor Results'
  )
})
