import axios from 'axios'
import { mount, shallowMount } from '@vue/test-utils'
import ManualPointsForm from '@/views/ManualPointsForm'
import { sampleSingleLeague } from '@/tests/test data/leagues'
import { sampleThreeResultsDraw } from '@/tests/test data/results'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(ManualPointsForm, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(ManualPointsForm, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Results Sorted Correctly', () => {
  const wrapper = mount(ManualPointsForm, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
  wrapper.setData({ course: '1', event: '', results: sampleThreeResultsDraw })
})

test('Return from Page', () => {
  const mockRouterPush = jest.fn()
  const mockAddMessage = jest.fn()
  const wrapper = mount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
      $router: { push: mockRouterPush },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.returnToCompetitorsPage({ data: { message: 'Hello' } })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Hello')
  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/competitors')
})

test('Elapsed Time', () => {
  const wrapper = mount(ManualPointsForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.elapsedTime(0)).toBe('00:00')
  expect(wrapper.vm.elapsedTime(1)).toBe('00:01')
  expect(wrapper.vm.elapsedTime(45)).toBe('00:45')
  expect(wrapper.vm.elapsedTime(60)).toBe('01:00')
  expect(wrapper.vm.elapsedTime(83)).toBe('01:23')
  expect(wrapper.vm.elapsedTime(1023)).toBe('17:03')
  expect(wrapper.vm.elapsedTime(3600)).toBe('60:00')
  expect(wrapper.vm.elapsedTime(5117)).toBe('85:17')
})

test('Competitor Transform for Dropdown Input', () => {
  const wrapper = shallowMount(ManualPointsForm, {
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

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getLeagues()
  expect(axios.get).toHaveBeenCalledWith('/api/leagues')
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
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
  const wrapper = shallowMount(ManualPointsForm, {
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
    'Problem Fetching Leagues'
  )
})

test('Get Competitors - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
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
  const wrapper = shallowMount(ManualPointsForm, {
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
  const wrapper = shallowMount(ManualPointsForm, {
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

test('Courses in League', () => {
  const wrapper = shallowMount(ManualPointsForm, {
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

test('Validate', () => {
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ event: '', competitor: '', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: 'a', competitor: '', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: '', competitor: 'a', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: '', competitor: '', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: 'a', competitor: 'a', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: 'a', competitor: '', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: '', competitor: 'a', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ event: 'a', competitor: 'a', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
})

test('Get Events - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: sampleSingleLeague })
  await wrapper.vm.getEvents()
  expect(axios.get).toHaveBeenLastCalledWith('/api/events')
})

test('Get Events - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: [{ league: '1' }, { league: '2' }] })
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([{ league: '1' }, { league: '2' }])

  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([])

  axios.get.mockResolvedValue({
    data: [
      { league: 'a', property: 3 },
      { league: '2', another: 4 },
    ],
  })
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([
    { league: 'a', property: 3 },
    { league: '2', another: 4 },
  ])
})

test('Get Events - Shows Message on Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getEvents()
  expect(wrapper.vm.events).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching Events'
  )
})

test('Elapsed Time to Seconds', () => {
  const wrapper = shallowMount(ManualPointsForm, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.elapsedTimeToSeconds('00:00')).toBe(0)
  expect(wrapper.vm.elapsedTimeToSeconds('00:17')).toBe(17)
  expect(wrapper.vm.elapsedTimeToSeconds('00:30')).toBe(30)
  expect(wrapper.vm.elapsedTimeToSeconds('00:59')).toBe(59)
  expect(wrapper.vm.elapsedTimeToSeconds('01:00')).toBe(60)
  expect(wrapper.vm.elapsedTimeToSeconds('60:00')).toBe(3600)
  expect(wrapper.vm.elapsedTimeToSeconds('01:42')).toBe(102)
  expect(wrapper.vm.elapsedTimeToSeconds('37:37')).toBe(2257)
})

test('Competitors for League', () => {
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ course: '2', league: 'b', leagues: [] })
  expect(wrapper.vm.competitorsForLeague).toEqual([])
  wrapper.setData({
    competitors: [
      { name: 'a', course: '2', league: 'b' },
      { name: 'b', course: '2', league: 'b' },
      { name: 'c', course: '2', league: 'b' },
    ],
  })
  expect(wrapper.vm.competitorsForLeague).toEqual([
    { name: 'a', course: '2', league: 'b' },
    { name: 'b', course: '2', league: 'b' },
    { name: 'c', course: '2', league: 'b' },
  ])
  wrapper.setData({
    league: 'c',
    course: '2',
    competitors: [
      { name: 'a', course: '2', league: 'b' },
      { name: 'b', course: '2', league: 'b' },
      { name: 'c', course: '2', league: 'b' },
    ],
  })
  expect(wrapper.vm.competitorsForLeague).toEqual([])
  wrapper.setData({
    league: 'c',
    course: '2',
    competitors: [
      { name: 'q', course: '2', league: 'c' },
      { name: 'b', course: '2', league: 'b' },
      { name: 'p', course: '2', league: 'c' },
    ],
  })
  expect(wrapper.vm.competitorsForLeague).toEqual([
    { name: 'p', course: '2', league: 'c' },
    { name: 'q', course: '2', league: 'c' },
  ])
})

test('Add Result - Invalid', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.addResult()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Select a Competitor and an Event'
  )
})

test('Add Result', async () => {
  const mockAddMessageFunction = jest.fn()
  const mockReturnToCompetitorsPage = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setMethods({ returnToCompetitorsPage: mockReturnToCompetitorsPage })
  wrapper.setData({
    event: '1 - 2',
    course: '2',
    events: [{ id: '4', name: '1', date: '2' }],
    competitor: '1',
    points: 7,
  })
  axios.get.mockResolvedValue()
  axios.post.mockResolvedValue()
  await wrapper.vm.addResult()
  expect(axios.post).toHaveBeenCalled()
  expect(axios.post).toHaveBeenLastCalledWith('/api/results/manual', {
    competitor: '1',
    points: 7,
    event: '4',
  })
  expect(wrapper.vm.returnToCompetitorsPage).toHaveBeenCalled()
  expect(mockAddMessageFunction).not.toHaveBeenCalled()
})

test('Add Result - No Event', async () => {
  const mockAddMessageFunction = jest.fn()
  const mockReturnToCompetitorsPage = jest.fn()
  const wrapper = shallowMount(ManualPointsForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setMethods({ returnToCompetitorsPage: mockReturnToCompetitorsPage })
  wrapper.setData({
    event: '1 - 2',
    course: '2',
    events: [],
    competitor: '1',
    points: 7,
  })
  axios.get.mockResolvedValue()
  axios.post.mockResolvedValue()
  await wrapper.vm.addResult()
  expect(axios.post).not.toHaveBeenCalled()

  expect(wrapper.vm.returnToCompetitorsPage).not.toHaveBeenCalled()
  expect(mockAddMessageFunction).toHaveBeenCalled()
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('No Event Selected')
})
