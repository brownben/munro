import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import CompetitorMerge from '@/views/admin/CompetitorMerge'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Return from Page', () => {
  const mockRouterPush = jest.fn()
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $route: { path: '/competitors/1/edit', params: { league: 'a' } },
      $router: { push: mockRouterPush },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ league: 'a' })
  wrapper.vm.returnToCompetitorsPage({ data: { message: 'Hello' } })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Hello')
  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/leagues/a/competitors')
})

test('Courses in League', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ league: 'a', leagues: [] })
  expect(wrapper.vm.coursesInLeague).toEqual([])
  wrapper.setData({
    leagues: [
      { name: 'a', courses: [2] },
      { name: 'b', courses: 3 },
      { name: 'c', courses: [4] },
    ],
  })
  expect(wrapper.vm.coursesInLeague).toEqual([2])
  wrapper.setData({
    league: 'c',
    leagues: [
      { name: 'a', courses: 2 },
      { name: 'b', courses: 3 },
      { name: 'c', courses: [4] },
    ],
  })
  expect(wrapper.vm.coursesInLeague).toEqual([4])
})

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getLeagues()
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues')
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
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
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching League Details'
  )
})

test('Get Competitors - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getCompetitors()
  expect(axios.get).toHaveBeenLastCalledWith('/api/competitors')
})

test('Get Competitors - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: [{ league: '1' }, { league: '2' }] })
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([{ league: '1' }, { league: '2' }])

  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([])

  axios.get.mockResolvedValue({
    data: [
      { league: 'a', property: 3 },
      { league: '2', another: 4 },
    ],
  })
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([
    { league: 'a', property: 3 },
    { league: '2', another: 4 },
  ])
})

test('Get Competitors - Shows Message on Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getCompetitors()
  expect(wrapper.vm.competitors).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching Competitors'
  )
})

test('Competitor Transform for Dropdown Input', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(
    wrapper.vm.competitorTransformForSelect({ name: 'Bob Jones', id: 22 })
  ).toEqual('Bob Jones [22]')
  expect(
    wrapper.vm.competitorTransformForSelect({
      name: 'Bob Jones',
      id: 22,
      ageClass: 'M45',
    })
  ).toEqual('Bob Jones (M45) [22]')
  expect(
    wrapper.vm.competitorTransformForSelect({
      name: 'Bob Jones',
      id: 22,
      club: 'HAT',
    })
  ).toEqual('Bob Jones (HAT) [22]')
  expect(
    wrapper.vm.competitorTransformForSelect({
      name: 'Bob Jones',
      id: 22,
      club: 'HAT',
      ageClass: 'M45',
    })
  ).toEqual('Bob Jones (M45, HAT) [22]')
})

test('Validate Form', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ competitorMerge: '', competitorKeep: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ competitorMerge: 'a', competitorKeep: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ competitorMerge: '', competitorKeep: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ competitorMerge: 'a', competitorKeep: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ competitorMerge: 'a', competitorKeep: 'b' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
})

test('Merge - Invalid', () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.merge()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'The Competitors Selected are the Same'
  )
})

test('Merge - Correct API', async () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $messages: { addMessage: jest.fn() },
      competitorTransformForSelect: jest.fn(),
    },
  })
  wrapper.setData({ competitorMerge: 'a', competitorKeep: 'b' })
  axios.post.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.merge()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith(
    '/api/competitors/merge',
    expect.any(Object)
  )
})

test('Merge - Success', async () => {
  const mockReturnToCompetitorsPage = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setMethods({ returnToCompetitorsPage: mockReturnToCompetitorsPage })
  wrapper.setData({ competitorMerge: 'a', competitorKeep: 'b' })
  axios.post.mockResolvedValue({ data: { message: 'Hello' } })
  await wrapper.vm.merge()
  expect(mockReturnToCompetitorsPage).toHaveBeenCalledTimes(1)
})

test('Merge - Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorMerge, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ competitorMerge: 'a', competitorKeep: 'b' })
  axios.post.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.merge()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Hello')
})

test('Competitors For League', () => {
  const wrapper = shallowMount(CompetitorMerge, {
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ competitors: [], league: 'a', course: 'b' })
  expect(wrapper.vm.competitorsForLeague).toEqual([])
  wrapper.setData({
    competitors: [
      { name: 'a', league: 'a', course: 'b' },
      { name: 'b', league: 'c', course: 'b' },
      { name: 'c', league: 'a', course: 'd' },
      { name: 'd', league: 'e', course: 'f' },
    ],
    league: 'a',
    course: 'b',
  })
  expect(wrapper.vm.competitorsForLeague).toEqual([
    { name: 'a', league: 'a', course: 'b' },
  ])
  wrapper.setData({
    competitors: [
      { name: 'd', league: 'a', course: 'b' },
      { name: 'b', league: 'a', course: 'b' },
      { name: 'a', league: 'a', course: 'b' },
      { name: 'c', league: 'a', course: 'b' },
    ],
    league: 'a',
    course: 'b',
  })
  expect(wrapper.vm.competitorsForLeague).toEqual([
    { name: 'a', league: 'a', course: 'b' },
    { name: 'b', league: 'a', course: 'b' },
    { name: 'c', league: 'a', course: 'b' },
    { name: 'd', league: 'a', course: 'b' },
  ])
})
