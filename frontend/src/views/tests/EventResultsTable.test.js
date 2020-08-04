import axios from 'axios'
import VueRouter from 'vue-router'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import ResultsTable from '@/views/EventResultsTable.vue'
import { sampleThreeEvents } from '@/tests/test data/events'
import {
  sampleSingleResult,
  sampleThreeResults,
  sampleThreeResultsSortedByAgeClass,
  sampleThreeResultsWithSplitAgeClass,
} from '@/tests/test data/results'

// A test is modifying sampleThreeResults so create backup copy
const sampleThreeResultsCopy = JSON.parse(JSON.stringify(sampleThreeResults))

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))
beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockResolvedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly + Fetches Data', async () => {
  const mockGetResults = jest.fn().mockResolvedValue()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getResults: mockGetResults,
    },
    computed: {
      eventsWithResults: () => sampleThreeEvents,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  expect(mockGetResults).toHaveBeenCalledTimes(1)
  expect(mockGetResults).toHaveBeenLastCalledWith()
  wrapper.setData({
    rawResults: sampleThreeResults,
    event: sampleThreeEvents[0],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Elapsed Time', () => {
  const wrapper = mount(ResultsTable, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.elapsedTime(0)).toBe('')
  expect(wrapper.vm.elapsedTime(1)).toBe('00:01')
  expect(wrapper.vm.elapsedTime(45)).toBe('00:45')
  expect(wrapper.vm.elapsedTime(60)).toBe('01:00')
  expect(wrapper.vm.elapsedTime(83)).toBe('01:23')
  expect(wrapper.vm.elapsedTime(1023)).toBe('17:03')
  expect(wrapper.vm.elapsedTime(3600)).toBe('60:00')
  expect(wrapper.vm.elapsedTime(5117)).toBe('85:17')
})

test('Results With Age Class Split', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    computed: {
      filteredResults: jest.fn(() => []),
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ rawResults: [] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([])
  wrapper.setData({ rawResults: [{ name: 'M45' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([
    { name: 'M45', gender: '' },
  ])
  wrapper.setData({ rawResults: [{ ageClass: 'M45' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([
    { ageClass: 'M45', age: 45, gender: 'M' },
  ])
  wrapper.setData({ rawResults: [{ ageClass: 'W100' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([
    { ageClass: 'W100', age: 100, gender: 'W' },
  ])
  wrapper.setData({ rawResults: [{ ageClass: 'M5' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([
    { ageClass: 'M5', age: 5, gender: 'M' },
  ])
  wrapper.setData({
    rawResults: [
      { ageClass: 'M5' },
      { ageClass: 'W100' },
      { ageClass: 'M45' },
      { ageClass: 'W16' },
    ],
  })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([
    { ageClass: 'M5', age: 5, gender: 'M' },
    { ageClass: 'W100', age: 100, gender: 'W' },
    { ageClass: 'M45', age: 45, gender: 'M' },
    { ageClass: 'W16', age: 16, gender: 'W' },
  ])
})

test('Refresh Data on Route Change', async () => {
  const mockGetResults = jest.fn().mockResolvedValue()
  const mockGetEvent = jest.fn().mockResolvedValue()
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({ routes: [{ path: '/' }, { path: '/other' }] })
  shallowMount(ResultsTable, {
    localVue,
    router,
    mocks: {
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getResults: mockGetResults,
      getEvent: mockGetEvent,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  expect(mockGetResults).toHaveBeenCalledTimes(0)
  expect(mockGetEvent).toHaveBeenCalledTimes(0)
  router.push('/other')
  await flushPromises()
  expect(mockGetResults).toHaveBeenCalledTimes(1)
  expect(mockGetResults).toHaveBeenLastCalledWith()
  expect(mockGetEvent).toHaveBeenCalledTimes(1)
  expect(mockGetEvent).toHaveBeenLastCalledWith()
})

test('Filter Changed', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.filterChanged({
    name: 'a',
    club: 'b',
    minAge: 10,
    maxAge: 90,
    male: true,
    female: false,
  })
  expect(wrapper.vm.filterPreferences.name).toBe('a')
  expect(wrapper.vm.filterPreferences.club).toBe('b')
  expect(wrapper.vm.filterPreferences.minAge).toBe(10)
  expect(wrapper.vm.filterPreferences.maxAge).toBe(90)
  expect(wrapper.vm.filterPreferences.male).toBeTruthy()
  expect(wrapper.vm.filterPreferences.female).toBeFalsy()
  wrapper.vm.filterChanged({
    name: 'a',
    club: 'b',
    minAge: '',
    maxAge: '',
    male: true,
    female: false,
  })
  expect(wrapper.vm.filterPreferences.minAge).toBe(0)
  expect(wrapper.vm.filterPreferences.maxAge).toBe(100)
})

test('Sort By - Same Property', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ sortedBy: '2', ascendingSort: false })
  wrapper.vm.sortBy('2')
  expect(wrapper.vm.ascendingSort).toBeTruthy()
  expect(wrapper.vm.sortedBy).toEqual('2')
})

test('Sort By - Different Property', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ sortedBy: '1', ascendingSort: false })
  wrapper.vm.sortBy('2')
  expect(wrapper.vm.ascendingSort).toBeFalsy()
  expect(wrapper.vm.sortedBy).toEqual('2')
})

test('Sort - Ascending', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.sort([], 'name')).toEqual([])
  expect(wrapper.vm.sort([], 'club')).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 'name')).toEqual(
    sampleSingleResult
  )
  expect(wrapper.vm.sort(sampleSingleResult, 'position')).toEqual(
    sampleSingleResult
  )
  expect(wrapper.vm.sort(sampleThreeResults, 'position')).toEqual(
    sampleThreeResults
  )
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 'ageClass')).toEqual(
    sampleThreeResultsSortedByAgeClass.reverse()
  )
})

test('Sort - Descending', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.sort([], 'name', false)).toEqual([])
  expect(wrapper.vm.sort([], 'club', false)).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 'name', false)).toEqual(
    sampleSingleResult
  )
  expect(wrapper.vm.sort(sampleSingleResult, 'position', false)).toEqual(
    sampleSingleResult
  )
  expect(wrapper.vm.sort(sampleThreeResults, 'position', false)).toEqual(
    sampleThreeResults
  )
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 'ageClass', false)).toEqual(
    sampleThreeResultsSortedByAgeClass.reverse()
  )
})

test('Filtered Results', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ rawResults: sampleThreeResults, sortedBy: 'position' })
  wrapper.setData({ filterPreferences: { male: true, female: false } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { male: false, female: true } })
  expect(wrapper.vm.filteredResults.length).toBe(1)
  wrapper.setData({ filterPreferences: { male: true, female: true } })
  expect(wrapper.vm.filteredResults.length).toBe(3)
  wrapper.setData({ filterPreferences: { male: false, female: false } })
  expect(wrapper.vm.filteredResults.length).toBe(0)
  wrapper.setData({ filterPreferences: { male: true, female: true } })
  wrapper.setData({ filterPreferences: { minAge: 22, maxAge: 60 } })
  expect(wrapper.vm.filteredResults.length).toBe(1)
  expect(wrapper.vm.filteredResults).toEqual([sampleThreeResults[0]])
  wrapper.setData({ filterPreferences: { minAge: 21, maxAge: 60 } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { minAge: 21, maxAge: 65 } })
  expect(wrapper.vm.filteredResults.length).toBe(3)
  wrapper.setData({ filterPreferences: { minAge: 0, maxAge: 100 } })
  wrapper.setData({ filterPreferences: { name: 'Blu' } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { name: 'bLU' } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { name: 'BLU' } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { name: '', club: 'ESOC' } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { club: 'esoc' } })
  expect(wrapper.vm.filteredResults.length).toBe(2)
  wrapper.setData({ filterPreferences: { club: 'In' } })
  expect(wrapper.vm.filteredResults.length).toBe(1)
})

test('Sorted Results', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ rawResults: [], sortedBy: 'position', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({ rawResults: [], sortedBy: 'points-1', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({
    rawResults: [],
    sortedBy: 'points-2',
    ascendingSort: false,
  })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({ rawResults: [] })
  wrapper.setData({
    rawResults: sampleThreeResultsCopy,
    sortedBy: 'position',
    ascendingSort: true,
  })
  expect(wrapper.vm.sortedResults).toEqual(
    sampleThreeResultsWithSplitAgeClass.slice().reverse()
  )
  wrapper.setData({ rawResults: [] })
  wrapper.setData({
    rawResults: sampleThreeResultsCopy,
    sortedBy: 'position',
    ascendingSort: false,
  })
  expect(wrapper.vm.sortedResults).toEqual(sampleThreeResultsWithSplitAgeClass)
})

test('Get Results - Correct API Call', async () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getResults()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/EVENT/results')
})

test('Get Results - Success - Results', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: sampleThreeResults })
  await wrapper.vm.getResults()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.rawResults).toEqual(sampleThreeResults)
})

test('Get Results - Success - No Results', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getResults()
  expect(wrapper.vm.rawResults).toEqual([])
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.found).toBeFalsy()
})

test('Get Results - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getResults()
  expect(wrapper.vm.rawResults).toEqual([])
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.found).toBeFalsy()
})

test('Get Event Details - Makes Request with Correct ID', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  await flushPromises()
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getEvent()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/EVENT')
})

test('Get Event Details - No Event Found', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(ResultsTable, {
    mocks: {
      $route: { params: { event: 'EVENT' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.eventFound).toBeTruthy()
  axios.get.mockResolvedValue({ data: false })
  await wrapper.vm.getEvent()
  expect(wrapper.vm.eventFound).toBeFalsy()
})
