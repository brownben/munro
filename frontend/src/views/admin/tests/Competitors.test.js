import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import Competitors from '@/views/admin/Competitors'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { params: { league: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { params: { league: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Get Competitors - Success', async () => {
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { params: { league: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  flushPromises()
  axios.get.mockResolvedValue({
    data: [
      { name: 1, league: 'a' },
      { name: 2, league: 'a' },
      { name: 3, league: 'a' },
      { name: 4, league: 'b' },
    ],
  })
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([
    { name: 1, league: 'a' },
    { name: 2, league: 'a' },
    { name: 3, league: 'a' },
    { name: 4, league: 'b' },
  ])
  wrapper.setData({ league: 'a' })
  expect(wrapper.vm.filteredCompetitors).toEqual([
    { name: 1, league: 'a' },
    { name: 2, league: 'a' },
    { name: 3, league: 'a' },
  ])
})

test('Renders Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { params: { league: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  flushPromises()
  axios.get.mockRejectedValue()
  await wrapper.vm.getCompetitors()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Fetching Competitor Details'
  )
})

test('Change Sort Order', () => {
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { params: { league: '' } },
    },
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
    mocks: {
      $route: { params: { league: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.sort([{ a: 3 }, { a: 1 }, { a: 2 }], 'a', false)).toEqual([
    { a: 1 },
    { a: 2 },
    { a: 3 },
  ])
  expect(
    wrapper.vm.sort([{ a: 1 }, { a: 3 }, { a: 1 }, { a: 2 }], 'a', true)
  ).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }, { a: 1 }])
  expect(
    wrapper.vm.sort([{ a: 1 }, { a: 3 }, { a: 1 }, { a: 2 }], 'a')
  ).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }, { a: 1 }])
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '', id: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
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
  const wrapper = shallowMount(Competitors, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '', id: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching List of Leagues'
  )
})
