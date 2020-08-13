import { mount, shallowMount } from '@vue/test-utils'
import Search from '@/views/Search.vue'

import axios from 'axios'

const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(Search, {
    stubs: ['router-link'],
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(Search, {
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ loading: true, leagues: [], events: [], competitors: [] })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - No Results', () => {
  const wrapper = mount(Search, {
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ loading: false, leagues: [], events: [], competitors: [] })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Details - Request Called Correctly', async () => {
  const wrapper = mount(Search, {
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getDetails()

  expect(axios.get).toHaveBeenLastCalledWith('/api/search?query=a')
})

test('Get Details - Processes Data', async () => {
  const wrapper = shallowMount(Search, {
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({
    data: {
      leagues: [{ l: 'l' }],
      events: [{ e: 'e' }],
      competitors: [{ c: 'c' }],
    },
  })
  await wrapper.vm.getDetails()
  expect(wrapper.vm.leagues).toEqual([{ l: 'l' }])
  expect(wrapper.vm.events).toEqual([{ e: 'e' }])
  expect(wrapper.vm.competitors).toEqual([{ c: 'c' }])
  expect(wrapper.vm.loading).toBe(false)

  expect(axios.get).toHaveBeenLastCalledWith('/api/search?query=a')
})

test('Get Details - Shows Message on Error', async () => {
  const wrapper = mount(Search, {
    mocks: {
      $route: { params: { query: 'a' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getDetails()
  expect(wrapper.vm.leagues).toEqual([])

  expect(wrapper.vm.$messages.addMessage).toHaveBeenLastCalledWith(
    'Problem Fetching Data'
  )
})
