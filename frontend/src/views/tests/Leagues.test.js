import axios from 'axios'
import { mount } from '@vue/test-utils'
import Leagues from '@/views/Leagues'
import { sampleSingleLeague, sampleDataThreeLeagues } from '@/tests/test data/leagues'

jest.mock('axios')
const flushPromises = () => new Promise(resolve => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Leagues, {
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ leagues: sampleDataThreeLeagues })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Leagues, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Call Get Leagues On Load', () => {
  const mockGetLeagues = jest.fn()
  mount(Leagues, {
    methods: {
      getLeagues: mockGetLeagues,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  flushPromises()
  expect(mockGetLeagues).toHaveBeenCalledTimes(1)
})

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(Leagues, {
    mocks: {
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
  const wrapper = mount(Leagues, {
    mocks: {
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
  const wrapper = mount(Leagues, {
    mocks: {
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
