import { shallowMount } from '@vue/test-utils'
import EventOverviewCard from '@/components/cards/EventOverviewCard'

import axios from 'axios'

jest.mock('axios')
const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(EventOverviewCard, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Normal View', () => {
  const wrapper = shallowMount(EventOverviewCard, {
    propsData: {
      event: {
        name: 'Test Event',
        date: '2001-01-01',
        organiser: 'John Doe',
        website: 'http://example.com',
        resultUploaded: true,
        moreInformation: 'Text',
        winsplits: 'http://winsplits',
        routegadget: 'http://routegadget',
        results: 'http://results',
      },
      league: { dynamicEventResults: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Show League Title', () => {
  const wrapper = shallowMount(EventOverviewCard, {
    propsData: {
      event: {
        name: 'Test Event',
        date: '2001-01-01',
        organiser: 'John Doe',
        website: 'http://example.com',
        resultUploaded: true,
        moreInformation: 'Text',
        winsplits: 'http://winsplits',
        routegadget: 'http://routegadget',
        results: 'http://results',
      },
      league: { dynamicEventResults: true },
      showLeagueName: true,
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Logged In', () => {
  const wrapper = shallowMount(EventOverviewCard, {
    propsData: {
      event: {
        name: 'Test Event',
        date: '2001-01-01',
        organiser: 'John Doe',
        website: 'http://example.com',
        resultUploaded: true,
        moreInformation: 'Text',
        winsplits: 'http://winsplits',
        routegadget: 'http://routegadget',
        results: 'http://results',
      },
      league: { dynamicEventResults: true },
      showLeagueName: true,
      auth: { user: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Delete Event - Correct Confirm', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(EventOverviewCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(global.confirm).toHaveBeenCalledTimes(1)
  expect(global.confirm).toHaveBeenLastCalledWith(
    "Are you Sure you Want to Delete Event - EVENT? \nThis Action Can't Be Recovered"
  )
})

test('Delete Event - Denied Confirmation', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(EventOverviewCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn().mockReturnValue(false)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(axios.delete).toHaveBeenCalledTimes(0)
})

test('Delete Event - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(EventOverviewCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(axios.delete).toHaveBeenCalledTimes(1)
  expect(axios.delete).toHaveBeenLastCalledWith('/api/events/EVENT')
})

test('Delete Event - Success', async () => {
  const mockGetLeague = jest.fn().mockResolvedValue()
  const mockGetLeagueEvents = jest.fn()
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(EventOverviewCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
    methods: {
      getLeague: mockGetLeague,
      getLeagueEvents: mockGetLeagueEvents,
    },
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockResolvedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(axios.delete).toHaveBeenLastCalledWith(`/api/events/EVENT`)
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Event: EVENT was Deleted')
})

test('Delete Event - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(EventOverviewCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.delete.mockRejectedValue()
  await wrapper.vm.deleteEvent({ id: 'EVENT', name: 'EVENT' })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Deleting Event - Please Try Again'
  )
})
