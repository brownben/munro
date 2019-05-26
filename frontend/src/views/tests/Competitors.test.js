import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import Competitors from '@/views/Competitors'

jest.mock('axios')
const flushPromises = () => new Promise(resolve => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(Competitors, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(Competitors, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Competitors - Success', async () => {
  const wrapper = shallowMount(Competitors, {
    stubs: ['router-link', 'vue-headful'],
  })
  flushPromises()
  axios.get.mockResolvedValue({ data: [1, 2, 3, 4, 5] })
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([1, 2, 3, 4, 5])
})

test('Renders Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitors, {
    mocks: {
      '$messages': { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  flushPromises()
  axios.get.mockRejectedValue()
  await wrapper.vm.getCompetitors()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Fetching Competitor Details')
})

test('Change Sort Order', () => {
  const wrapper = shallowMount(Competitors, {
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ sortedBy: 'Age' })
  wrapper.vm.sortBy('Name')
  expect(wrapper.vm.ascendingSort).toBeFalsy()
  expect(wrapper.vm.sortedBy).toEqual('Name')
  wrapper.vm.sortBy('Name')
  expect(wrapper.vm.ascendingSort).toBeTruthy()
  expect(wrapper.vm.sortedBy).toEqual('Name')
})

test('Sort', () => {
  const wrapper = shallowMount(Competitors, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.sort([{ 'a': 3 }, { 'a': 1 }, { 'a': 2 }], 'a', false)).toEqual([{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }])
  expect(wrapper.vm.sort([{ 'a': 1 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }], 'a', true)).toEqual([{ 'a': 3 }, { 'a': 2 }, { 'a': 1 }, { 'a': 1 }])
  expect(wrapper.vm.sort([{ 'a': 1 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }], 'a')).toEqual([{ 'a': 3 }, { 'a': 2 }, { 'a': 1 }, { 'a': 1 }])
})
