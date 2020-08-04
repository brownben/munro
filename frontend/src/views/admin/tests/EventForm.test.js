/*
  Event Form View Unit Tests
*/

import axios from 'axios'
import { mount } from '@vue/test-utils'
import EventForm from '@/views/admin/EventForm.vue'
import { sampleSingleEvent } from '@/tests/test data/events'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '', params: { league: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Creation Form - Renders Correctly', () => {
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '', params: { league: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeTruthy()
  expect(wrapper.element).toMatchSnapshot()
})

test('Update Form - Renders Correctly', () => {
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeFalsy()
  expect(wrapper.element).toMatchSnapshot()
})

test('Submit Method', () => {
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const getCreateSpy = jest.spyOn(wrapper.vm, 'createEvent')
  const getUpdateSpy = jest.spyOn(wrapper.vm, 'updateEvent')

  wrapper.setData({ create: true })
  wrapper.vm.submit()
  expect(getCreateSpy).toHaveBeenCalledTimes(1)
  expect(getUpdateSpy).toHaveBeenCalledTimes(0)

  jest.resetAllMocks()

  wrapper.setData({ create: false })
  wrapper.vm.submit()
  expect(getUpdateSpy).toHaveBeenCalledTimes(1)
  expect(getCreateSpy).toHaveBeenCalledTimes(0)
})

test('Get Leagues - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
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
  const wrapper = mount(EventForm, {
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

test('Get Event Details - Makes Request with Correct ID', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '', id: 'eventID' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.resetAllMocks()
  axios.get.mockResolvedValue({ data: [] })
  await wrapper.vm.getEventDetails()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/eventID')
})

test('Get Event Details - Processes Response Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: {
        path: '/events/1/edit',
        params: { league: '', id: 'SprintelopeBushEstate2018-05-09' },
      },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: sampleSingleEvent })
  await wrapper.vm.getEventDetails()
  expect(wrapper.findAll('input').at(0).element.value).toBe(
    sampleSingleEvent.name
  )
  expect(wrapper.findAll('input').at(1).element.value).toBe(
    sampleSingleEvent.date
  )
  expect(wrapper.findAll('input').at(2).element.value).toBe(
    sampleSingleEvent.organiser
  )
  expect(wrapper.findAll('input').at(6).element.value).toBe(
    sampleSingleEvent.routegadget
  )
})

test('Get Event Details - No Event Found', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '', id: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  expect(wrapper.vm.notFound).toBeFalsy()
  axios.get.mockResolvedValue({ data: null })
  await wrapper.vm.getEventDetails()
  expect(wrapper.vm.notFound).toBeTruthy()
})

test('Get Event Details - Shows Message on Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getEventDetails()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Getting Event Details'
  )
})

test('Check Validation Works', () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })

  wrapper.setData({ name: '', league: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )

  wrapper.setData({ name: 'Value', league: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(2)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )

  wrapper.setData({ name: '', league: 'Value' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(3)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )

  wrapper.setData({ name: '/', league: 'A' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(4)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    "Please Ensure Name doesn't Include any Slashes"
  )

  wrapper.setData({ name: '\\', league: 'A' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(5)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    "Please Ensure Name doesn't Include any Slashes"
  )

  wrapper.setData({ name: 'Hello/ bye', league: 'A' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(6)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    "Please Ensure Name doesn't Include any Slashes"
  )

  wrapper.setData({ name: 'A Value', league: 'Another Value' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(6)
})

test('Return to League Home Page', () => {
  const mockAddMessageFunction = jest.fn()
  const mockRouterPushFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $router: { push: mockRouterPushFunction },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({ league: 'Test League' })
  wrapper.vm.returnToLeaguePage({
    data: { message: 'This is the Message Returned' },
  })
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'This is the Message Returned'
  )
  expect(mockRouterPushFunction).toHaveBeenCalledTimes(1)
  expect(mockRouterPushFunction).toHaveBeenLastCalledWith(
    '/leagues/Test League'
  )
})

test('Create Event - Fails Validation', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  await wrapper.vm.createEvent()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )
})

test('Create Event - Successful Creation', async () => {
  axios.post.mockResolvedValue({ message: 'Event - X was Created' })
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const mockReturnToLeaguePage = jest.fn()
  wrapper.setMethods({ returnToLeaguePage: mockReturnToLeaguePage })
  wrapper.setData(sampleSingleEvent)
  await wrapper.vm.createEvent()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(1)
  expect(mockReturnToLeaguePage).toHaveBeenLastCalledWith({
    message: 'Event - X was Created',
  })
})

test('Create Event - Error in Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  axios.post.mockRejectedValue({ message: 'Something went Wrong' })
  const mockReturnToLeaguePage = jest.fn()
  wrapper.setMethods('returnToLeaguePage', mockReturnToLeaguePage)
  wrapper.setData(sampleSingleEvent)
  await wrapper.vm.createEvent()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(0)
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Error: Problem Creating Event - Please Try Again'
  )
})

test('Create Event - Calls Correct API Location', async () => {
  axios.post.mockResolvedValue({ message: 'Event - X was Created' })
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData(sampleSingleEvent)
  sampleSingleEvent.id = undefined
  await wrapper.vm.createEvent()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith('/api/events', sampleSingleEvent)
  // Reset for Next Tests
  sampleSingleEvent.id = 'SprintelopeBushEstate2018-05-09'
})

test('Update Event - Calls Correct API Location', async () => {
  axios.put.mockRejectedValue({
    response: { data: { message: 'Event - X was Updated' } },
  })
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData(sampleSingleEvent)
  await wrapper.vm.updateEvent()
  const sampleSingleEventNoID = sampleSingleEvent
  sampleSingleEventNoID.id = undefined
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith(
    '/api/events/SprintelopeBushEstate2018-05-09',
    sampleSingleEventNoID
  )
})

test('Update Event - Fails Validation', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  await wrapper.vm.updateEvent()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )
})

test('Update Event - Successful Creation', async () => {
  axios.put.mockResolvedValue({ message: 'Event - X was Created' })
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const mockReturnToLeaguePage = jest.fn()
  wrapper.setMethods({ returnToLeaguePage: mockReturnToLeaguePage })
  wrapper.setData(sampleSingleEvent)
  await wrapper.vm.updateEvent()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(1)
  expect(mockReturnToLeaguePage).toHaveBeenLastCalledWith({
    message: 'Event - X was Created',
  })
})

test('Update Event - Error in Creation', async () => {
  const mockAddMessageFunction = jest.fn()
  axios.put.mockRejectedValue({
    response: {
      data: { message: 'Error: Problem Updating Event - Please Try Again' },
    },
  })
  const wrapper = mount(EventForm, {
    mocks: {
      $route: { path: '/events/1/edit', params: { league: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  const mockReturnToLeaguePage = jest.fn()
  wrapper.setMethods('returnToLeaguePage', mockReturnToLeaguePage)
  wrapper.setData(sampleSingleEvent)
  await wrapper.vm.updateEvent()
  expect(mockReturnToLeaguePage).toHaveBeenCalledTimes(0)
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Error: Problem Updating Event - Please Try Again'
  )
})
