import { mount, shallowMount } from '@vue/test-utils'
import ResultsCard from '@/components/cards/ResultOverviewCard'

import axios from 'axios'

jest.mock('axios')

const flushPromises = () =>
  new Promise((resolve) => global.setImmediate(resolve))

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = mount(ResultsCard, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Not Logged In', () => {
  const wrapper = mount(ResultsCard, {
    propsData: {
      result: {
        id: 7,
        event: 'TestEvent',
        points: 43,
        time: 60612,
        position: 5,
        incomplete: false,
        type: '',
      },
    },
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Logged In', () => {
  const wrapper = mount(ResultsCard, {
    propsData: {
      result: {
        id: 7,
        event: 'TestEvent',
        points: 49,
        time: 60412,
        position: 2,
        incomplete: true,
        type: 'manual',
      },
    },
    mocks: {
      $auth: { user: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Elapsed Time', () => {
  const wrapper = mount(ResultsCard, {
    propsData: {
      result: {
        id: 7,
        event: 'TestEvent',
        points: 49,
        time: 60412,
        position: 2,
        incomplete: true,
        type: 'manual',
      },
    },
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link'],
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

test('Position Superscript', () => {
  const wrapper = mount(ResultsCard, {
    propsData: {
      result: {
        id: 7,
        event: 'TestEvent',
        points: 49,
        time: 60412,
        position: 2,
        incomplete: true,
        type: 'manual',
      },
    },
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.vm.positionSuperscript(0)).toBe('th')
  expect(wrapper.vm.positionSuperscript(1)).toBe('st')
  expect(wrapper.vm.positionSuperscript(2)).toBe('nd')
  expect(wrapper.vm.positionSuperscript(3)).toBe('rd')
  expect(wrapper.vm.positionSuperscript(4)).toBe('th')
  expect(wrapper.vm.positionSuperscript(5)).toBe('th')
  expect(wrapper.vm.positionSuperscript(10)).toBe('th')
  expect(wrapper.vm.positionSuperscript(11)).toBe('th')
  expect(wrapper.vm.positionSuperscript(12)).toBe('th')
  expect(wrapper.vm.positionSuperscript(13)).toBe('th')
  expect(wrapper.vm.positionSuperscript(14)).toBe('th')
  expect(wrapper.vm.positionSuperscript(15)).toBe('th')
  expect(wrapper.vm.positionSuperscript(21)).toBe('st')
  expect(wrapper.vm.positionSuperscript(22)).toBe('nd')
  expect(wrapper.vm.positionSuperscript(23)).toBe('rd')
  expect(wrapper.vm.positionSuperscript(101)).toBe('st')
  expect(wrapper.vm.positionSuperscript(111)).toBe('th')
  expect(wrapper.vm.positionSuperscript(112)).toBe('th')
  expect(wrapper.vm.positionSuperscript(121)).toBe('st')
  expect(wrapper.vm.positionSuperscript(122)).toBe('nd')
})

test('Hide Result', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $auth: { user: true },
    },
    propsData: {
      result: {
        id: 7,
        event: 'EVENT',
        type: '',
      },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.put.mockResolvedValue()
  await wrapper.vm.hideResult()
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith('/api/results/7', {
    rowid: 7,
    action: 'hide',
    event: 'EVENT',
    type: 'hidden',
  })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Result Updated')
})

test('Hide Result - Restore', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $auth: { user: true },
    },
    propsData: {
      result: {
        id: 7,
        event: 'EVENT',
        type: 'hidden',
      },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.put.mockResolvedValue()
  await wrapper.vm.hideResult()
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith('/api/results/7', {
    rowid: 7,
    action: 'hide',
    event: 'EVENT',
    type: null,
  })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Result Updated')
})

test('Hide Result - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $auth: { user: true },
    },
    propsData: {
      result: {
        id: 7,
        event: 'EVENT',
        type: '',
      },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.put.mockRejectedValue()
  await wrapper.vm.hideResult()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Hiding Result - Please Try Again'
  )
})

test('Incomplete Result', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $auth: { user: true },
    },
    propsData: {
      result: {
        id: 7,
        event: 'EVENT',
        type: '',
        incomplete: false,
      },
    },
    stubs: ['router-link'],
  })
  global.confirm = jest.fn().mockReturnValue(true)
  axios.put.mockResolvedValue()
  await wrapper.vm.incompleteResult()
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith('/api/results/7', {
    rowid: 7,
    action: 'incomplete',
    event: 'EVENT',
    incomplete: true,
  })
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Result Updated')
})

test('Incomplete Result - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = shallowMount(ResultsCard, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $auth: { user: true },
    },
    propsData: {
      result: {
        id: 7,
        event: 'EVENT',
        type: '',
        incomplete: false,
      },
    },
    stubs: ['router-link'],
  })
  await flushPromises()
  jest.clearAllMocks()
  global.confirm = jest.fn().mockReturnValue(true)
  axios.put.mockRejectedValue()
  await wrapper.vm.incompleteResult()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Problem Updating Result - Please Try Again'
  )
})
