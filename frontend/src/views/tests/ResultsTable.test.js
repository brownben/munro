/*
  Results Table View Unit Tests
*/

import axios from 'axios'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import ResultsTable from '@/views/ResultsTable'
import { sampleThreeEvents } from '@/tests/test data/events'
import {
  sampleSingleResult,
  sampleThreeResults,
  sampleThreeResultsWithSplitAgeClass,
  sampleThreeResultsSortedByAgeClass,
  sampleThreeResultsSortedByEventThreePoints,
  sampleThreeResultsSortedByEventThreePointsWithSplitAgeClass,
} from '@/tests/test data/results'

// A test is modifying sampleThreeResults so create backup copy
const sampleThreeResultsCopy = JSON.parse(JSON.stringify(sampleThreeResults))

jest.mock('axios')
const flushPromises = () => new Promise(resolve => global.setImmediate(resolve))
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
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly + Fetches Data', async () => {
  const mockGetResults = jest.fn().mockResolvedValue()
  const mockGetEventList = jest.fn().mockResolvedValue()
  const mockGetOtherCourses = jest.fn().mockResolvedValue()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getResults: mockGetResults,
      getEventList: mockGetEventList,
      getOtherCourses: mockGetOtherCourses,
    },
    computed: {
      eventsWithResults: () => sampleThreeEvents,
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  expect(mockGetResults).toHaveBeenCalledTimes(1)
  expect(mockGetResults).toHaveBeenLastCalledWith()
  expect(mockGetEventList).toHaveBeenCalledTimes(1)
  expect(mockGetEventList).toHaveBeenLastCalledWith()
  expect(mockGetOtherCourses).toHaveBeenCalledTimes(1)
  expect(mockGetOtherCourses).toHaveBeenLastCalledWith()
  wrapper.setData({
    rawResults: sampleThreeResults,
    events: sampleThreeEvents,
    otherCourses: ['Long', 'Short'],
    smallWindow: false,
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Check Resize Event is Added/ Removed', () => {
  const adder = jest
    .spyOn(global, 'addEventListener')
    .mockImplementation(() => { })
  const remover = jest
    .spyOn(global, 'removeEventListener')
    .mockImplementation(() => { })

  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })

  expect(adder).toHaveBeenCalled()
  wrapper.destroy()
  expect(remover).toHaveBeenCalled()
})

test('Get Event List - Correct API Call', async () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getEventList()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/LEAGUE/events')
})

test('Get Event List - Success', async () => {
  axios.get.mockResolvedValue({ data: sampleSingleResult })
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  await wrapper.vm.getEventList()
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.events).toEqual(sampleSingleResult)
})

test('Get Event List - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getEventList()
  expect(wrapper.vm.events).toEqual([])
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Fetching List of Events')
})

test('Sort By - Same Property', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ openedRows: [1, 2, 3], sortedBy: '2', ascendingSort: false })
  wrapper.vm.sortBy('2')
  expect(wrapper.vm.openedRows).toEqual([])
  expect(wrapper.vm.ascendingSort).toBeTruthy()
  expect(wrapper.vm.sortedBy).toEqual('2')
})

test('Sort By - Different Property', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ openedRows: [1, 2, 3], sortedBy: '1', ascendingSort: false })
  wrapper.vm.sortBy('2')
  expect(wrapper.vm.openedRows).toEqual([])
  expect(wrapper.vm.ascendingSort).toBeFalsy()
  expect(wrapper.vm.sortedBy).toEqual('2')
})

test('Toggle Row', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.openedRows).toEqual([])
  wrapper.vm.toggleRow(1)
  expect(wrapper.vm.openedRows).toEqual([1])
  wrapper.vm.toggleRow(2)
  wrapper.vm.toggleRow(3)
  expect(wrapper.vm.openedRows).toEqual([1, 2, 3])
  wrapper.vm.toggleRow(1)
  expect(wrapper.vm.openedRows).toEqual([2, 3])
  wrapper.vm.toggleRow(1)
  expect(wrapper.vm.openedRows).toEqual([2, 3, 1])
  wrapper.vm.toggleRow(3)
  expect(wrapper.vm.openedRows).toEqual([2, 1])
})

test('Filter Changed', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
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

test('Refresh Data on Route Change', async () => {
  const mockGetResults = jest.fn().mockResolvedValue()
  const mockGetEventList = jest.fn()
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
      getEventList: mockGetEventList,
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  expect(mockGetResults).toHaveBeenCalledTimes(0)
  expect(mockGetEventList).toHaveBeenCalledTimes(0)
  router.push('/other')
  await flushPromises()
  expect(mockGetResults).toHaveBeenCalledTimes(1)
  expect(mockGetResults).toHaveBeenLastCalledWith()
  expect(mockGetEventList).toHaveBeenCalledTimes(1)
  expect(mockGetEventList).toHaveBeenLastCalledWith()
})

test('Get Results - Correct API Call', async () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: 'LEAGUE', course: 'COURSE' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockResolvedValue()
  await wrapper.vm.getResults()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/LEAGUE/results/COURSE')
})

test('Get Results - Success - Results', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
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
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
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
      $route: { params: { name: 'LEAGUE', course: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getResults()
  expect(wrapper.vm.rawResults).toEqual([])
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.found).toBeFalsy()
})

test('Sort - Ascending', async () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.sort([], 'name')).toEqual([])
  expect(wrapper.vm.sort([], 'club')).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 'name')).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleSingleResult, 'position')).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleThreeResults, 'position')).toEqual(sampleThreeResults)
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 'ageClass')).toEqual(sampleThreeResultsSortedByAgeClass.reverse())
})

test('Sort - Descending', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.sort([], 'name', false)).toEqual([])
  expect(wrapper.vm.sort([], 'club', false)).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 'name', false)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleSingleResult, 'position', false)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleThreeResults, 'position', false)).toEqual(sampleThreeResults)
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 'ageClass', false)).toEqual(sampleThreeResultsSortedByAgeClass.reverse())
})

test('Sort - Ascending - By Points', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.sort([], 0, true, true)).toEqual([])
  expect(wrapper.vm.sort([], 1, true, true)).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 0, true, true)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleSingleResult, 1, true, true)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleThreeResults, 0, true, true)).toEqual(sampleThreeResults)
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 2, true, true)).toEqual(sampleThreeResultsSortedByEventThreePoints.slice().reverse())
})

test('Sort - Descending - By Points', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.sort([], 0, false, true)).toEqual([])
  expect(wrapper.vm.sort([], 1, false, true)).toEqual([])
  expect(wrapper.vm.sort(sampleSingleResult, 0, false, true)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleSingleResult, 1, false, true)).toEqual(sampleSingleResult)
  expect(wrapper.vm.sort(sampleThreeResults, 0, false, true)).toEqual(sampleThreeResults.reverse())
  expect(wrapper.vm.sort(sampleThreeResultsCopy, 2, false, true)).toEqual(sampleThreeResultsSortedByEventThreePoints)
})

test('Events With Results', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ events: [] })
  expect(wrapper.vm.eventsWithResults).toEqual([])
  wrapper.setData({ events: [{ name: 'a', resultUploaded: false }, { name: 'b', resultUploaded: false }] })
  expect(wrapper.vm.eventsWithResults).toEqual([])
  wrapper.setData({ events: [{ name: 'a', resultUploaded: true }, { name: 'b', resultUploaded: false }] })
  expect(wrapper.vm.eventsWithResults).toEqual([{ name: 'a', resultUploaded: true }])
  wrapper.setData({ events: [{ name: 'a', resultUploaded: true }, { name: 'b', resultUploaded: true }] })
  expect(wrapper.vm.eventsWithResults).toEqual([{ name: 'a', resultUploaded: true }, { name: 'b', resultUploaded: true }])
})

test('Results With Age Class Split', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    computed: {
      filteredResults: jest.fn(),
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ rawResults: [] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([])
  wrapper.setData({ rawResults: [{ name: 'M45' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([{ name: 'M45' }])
  wrapper.setData({ rawResults: [{ ageClass: 'M45' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([{ ageClass: 'M45', age: 45, gender: 'M' }])
  wrapper.setData({ rawResults: [{ ageClass: 'W100' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([{ ageClass: 'W100', age: 100, gender: 'W' }])
  wrapper.setData({ rawResults: [{ ageClass: 'M5' }] })
  expect(wrapper.vm.resultsWithAgeClassSplit).toEqual([{ ageClass: 'M5', age: 5, gender: 'M' }])
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

test('Mobile Results Dropdown Works', () => {
  global.innerWidth = 500
  global.dispatchEvent(new Event('resize'))
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    computed: {
      eventsWithResults: () => sampleThreeEvents,
    },
    stubs: ['router-link'],
  })
  wrapper.setData({ rawResults: sampleThreeResults, events: sampleThreeEvents })
  expect(wrapper.element).toMatchSnapshot()
  const row = wrapper.findAll('.normal-table-row').at(1)
  expect(row.html()).toContain('svg')
  expect(wrapper.findAll('.mobile-table-expansion').length).toBe(0)
  row.trigger('click')
  expect(wrapper.findAll('.mobile-table-expansion').length).toBe(1)
  expect(wrapper.element).toMatchSnapshot()
  row.trigger('click')
  expect(wrapper.findAll('.mobile-table-expansion').length).toBe(0)
})

test('Filtered Results', () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
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
    stubs: ['router-link'],
  })
  wrapper.setData({ rawResults: [], sortedBy: 'position', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({ rawResults: [], sortedBy: 'points-1', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({ rawResults: [], sortedBy: 'points-2', ascendingSort: false })
  expect(wrapper.vm.sortedResults).toEqual([])
  wrapper.setData({ rawResults: [] })
  wrapper.setData({ rawResults: sampleThreeResultsCopy, sortedBy: 'position', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual(sampleThreeResultsWithSplitAgeClass.slice().reverse())
  wrapper.setData({ rawResults: [] })
  wrapper.setData({ rawResults: sampleThreeResultsCopy, sortedBy: 'position', ascendingSort: false })
  expect(wrapper.vm.sortedResults).toEqual(sampleThreeResultsWithSplitAgeClass)
  wrapper.setData({ rawResults: [] })
  wrapper.setData({ rawResults: sampleThreeResultsCopy, sortedBy: 'points-2', ascendingSort: false })
  expect(wrapper.vm.sortedResults).toEqual(sampleThreeResultsSortedByEventThreePointsWithSplitAgeClass)
  wrapper.setData({ rawResults: [] })
  wrapper.setData({ rawResults: sampleThreeResultsCopy, sortedBy: 'points-2', ascendingSort: true })
  expect(wrapper.vm.sortedResults).toEqual(sampleThreeResultsSortedByEventThreePointsWithSplitAgeClass.reverse())
})

test('Links to other Courses', async () => {
  const wrapper = shallowMount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: 'Long' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link'],
  })
  flushPromises()
  axios.get.mockResolvedValue({ data: { courses: ['Long', 'Short'] } })
  await wrapper.vm.getOtherCourses()
  expect(wrapper.vm.otherCourses).toEqual(['Short'])
  axios.get.mockResolvedValue({})
  await wrapper.vm.getOtherCourses()
  expect(wrapper.vm.otherCourses).toBeFalsy()
})
