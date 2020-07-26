import axios from 'axios'

import { mount, shallowMount } from '@vue/test-utils'
import HomeEventsSection from '@/components/cards/HomeEventsSection'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = mount(HomeEventsSection, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(HomeEventsSection, { stubs: ['router-link'] })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Events - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(HomeEventsSection, {
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
  await wrapper.vm.getEventsWithResults()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/latest-results')
})

test('Get Events - Success', async () => {
  const mockAddMessage = jest.fn()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  const wrapper = shallowMount(HomeEventsSection, {
    mocks: {
      $auth: { user: false },
      $route: { params: { name: '' } },
      $messages: { addMessage: mockAddMessage },
      mounted: () => {},
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.getEventsWithResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.latestResults).toEqual(sampleSingleLeague)
})

test('Get Events - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(HomeEventsSection, {
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
  await wrapper.vm.getEventsWithResults()
  expect(wrapper.vm.latestResults).toBe(false)
})
