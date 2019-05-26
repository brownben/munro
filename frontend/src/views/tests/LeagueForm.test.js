/*
  League Form View Unit Tests
*/

import axios from 'axios'
import { mount } from '@vue/test-utils'
import LeagueForm from '@/views/LeagueForm'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Creation Form - Renders Correctly', () => {
  const mockGetLeagueDetails = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getLeagueDetails: mockGetLeagueDetails,
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeTruthy()
  expect(mockGetLeagueDetails).toHaveBeenCalledTimes(0)
  expect(wrapper.element).toMatchSnapshot()
})

test('Update Form - Renders Correctly', () => {
  const mockGetLeagueDetails = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/Test/edit', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    methods: {
      getLeagueDetails: mockGetLeagueDetails,
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeFalsy()
  expect(mockGetLeagueDetails).toHaveBeenCalledTimes(1)
  expect(wrapper.element).toMatchSnapshot()
})

test('Submit Method', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const getCreateSpy = jest.spyOn(wrapper.vm, 'createLeague')
  const getUpdateSpy = jest.spyOn(wrapper.vm, 'updateLeague')

  wrapper.setData({ create: true })
  wrapper.vm.submit()
  expect(getCreateSpy).toHaveBeenCalledTimes(1)
  expect(getUpdateSpy).toHaveBeenCalledTimes(0)

  jest.clearAllMocks()

  wrapper.setData({ create: false })
  wrapper.vm.submit()
  expect(getUpdateSpy).toHaveBeenCalledTimes(1)
  expect(getCreateSpy).toHaveBeenCalledTimes(0)
})

test('Check Validation Works', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ name: '', scoringMethod: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: 'Value', scoringMethod: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: '', scoringMethod: 'Value' })
  expect(wrapper.vm.validateForm()).toBeFalsy()

  wrapper.setData({ name: 'A Value', scoringMethod: 'Another Value' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
})

test('Return to League Home Page', () => {
  const mockAddMessageFunction = jest.fn()
  const mockRouterPushFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $router: { push: mockRouterPushFunction },
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'Test League' })
  wrapper.vm.returnToLeaguePage({ data: { message: 'This is the Message Returned' } })
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('This is the Message Returned')
  expect(mockRouterPushFunction).toHaveBeenCalledTimes(1)
  expect(mockRouterPushFunction).toHaveBeenLastCalledWith('/leagues/Test League')
})

test('Scoring Method Shorthand to Full', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.scoringMethodShorthandToFull('position')).toBe('Position Based (100 Max)')
  expect(wrapper.vm.scoringMethodShorthandToFull('position50')).toBe('Position Based (50 Max)')
  expect(wrapper.vm.scoringMethodShorthandToFull('')).toBe('')
  expect(wrapper.vm.scoringMethodShorthandToFull('pos')).toBe('')
})

test('Scoring Method Full to Shorthand', () => {
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '', params: { name: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.scoringMethodFullToShorthand('Position Based (100 Max)')).toBe('position')
  expect(wrapper.vm.scoringMethodFullToShorthand('Position Based (50 Max)')).toBe('position50')
  expect(wrapper.vm.scoringMethodFullToShorthand('')).toBe('')
  expect(wrapper.vm.scoringMethodFullToShorthand('pos')).toBe('')
})

test('Create League - Fails Validation', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/create-league', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  await wrapper.vm.createLeague()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Please Ensure Name and Scoring Method Fields are not Blank')
})

test('Create League - Successful Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  const mockReturnToLeaguePage = jest.fn()
  axios.post.mockResolvedValue({ data: { message: 'Hello' } })
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/create-league', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'Test League', scoringMethod: 'position' })
  wrapper.setMethods({ returnToLeaguePage: mockReturnToLeaguePage })
  await wrapper.vm.createLeague()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(1)
  expect(mockReturnToLeaguePage).toHaveBeenLastCalledWith({ data: { message: 'Hello' } })
})

test('Create League - Error in Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  axios.post.mockRejectedValue()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/create-league', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'Test League', scoringMethod: 'position' })
  await wrapper.vm.createLeague()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Error: Problem Creating League - Please Try Again')
})

test('Create League - Calls Correct API Location', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/create-league', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.post.mockResolvedValue()
  const sampleOutput = Object.assign({}, sampleSingleLeague[0])
  delete sampleOutput.info
  sampleOutput.scoringMethod = 'position'
  delete sampleOutput.numberOfEvents
  delete sampleOutput.oldName
  const sampleInput = Object.assign({}, sampleSingleLeague[0])
  delete sampleInput.oldName
  sampleInput.info = sampleInput.description
  delete sampleInput.description
  sampleInput.scoringMethod = 'Position Based (100 Max)'
  wrapper.setData(sampleInput)
  await wrapper.vm.createLeague()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith('/api/leagues', sampleOutput)
})

test('Update League - Calls Correct API Location', async () => {
  const mockAddMessageFunction = jest.fn()
  axios.put.mockResolvedValue()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: 'name' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const sampleOutput = Object.assign({}, sampleSingleLeague[0])
  delete sampleOutput.info
  sampleOutput.scoringMethod = 'position'
  sampleOutput.oldName = 'name'
  delete sampleOutput.numberOfEvents
  const sampleInput = Object.assign({}, sampleSingleLeague[0])
  sampleInput.info = sampleInput.description
  delete sampleInput.description
  sampleInput.oldName = 'name'
  sampleInput.scoringMethod = 'Position Based (100 Max)'
  wrapper.setData(sampleInput)
  await wrapper.vm.updateLeague()
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith('/api/leagues/name', sampleOutput)
})

test('Update League - Fails Validation', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  await wrapper.vm.updateLeague()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Please Ensure Name and Scoring Method Fields are not Blank')
})

test('Update League - Successful Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  const mockGetLeagueDetails = jest.fn()
  axios.put.mockResolvedValue({ data: { message: 'Hello' } })
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      getLeagueDetails: mockGetLeagueDetails,
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const mockReturnToLeaguePage = jest.fn()
  wrapper.setMethods({ returnToLeaguePage: mockReturnToLeaguePage })
  const sampleInput = Object.assign({}, sampleSingleLeague[0])
  sampleInput.info = sampleInput.description
  delete sampleInput.description
  wrapper.setData(sampleInput)
  await wrapper.vm.updateLeague()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(1)
  expect(mockReturnToLeaguePage).toHaveBeenLastCalledWith({ data: { message: 'Hello' } })
})

test('Update League - Error in Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  const mockGetLeagueDetails = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      getLeagueDetails: mockGetLeagueDetails,
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'Test League', scoringMethod: 'position' })
  axios.put.mockRejectedValue()
  await wrapper.vm.updateLeague()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Error: Problem Updating League - Please Try Again')
})

test('Get League Details - Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      created: () => { },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagueDetails()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Problem Fetching League Details')
})

test('Get League Details - Success', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      created: () => { },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: { ...sampleSingleLeague[0], description: '' } })
  await wrapper.vm.getLeagueDetails()
  expect(wrapper.vm.notFound).toBeFalsy()
  expect(wrapper.vm.logo).toBe(sampleSingleLeague[0].logo)
  expect(wrapper.vm.info).toBe(sampleSingleLeague[0].description)
  expect(wrapper.vm.website).toBe(sampleSingleLeague[0].website)
  expect(wrapper.vm.courses).toBe(sampleSingleLeague[0].courses.join(','))
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(0)
})

test('Get League Details - Not Found', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      created: () => { },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: false })
  await wrapper.vm.getLeagueDetails()
  expect(wrapper.vm.notFound).toBeTruthy()
  expect(wrapper.findAll('form').length).toBe(0)
})

test('Get League Details - Correct API Call', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(LeagueForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: 'a' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagueDetails()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/leagues/a')
})
