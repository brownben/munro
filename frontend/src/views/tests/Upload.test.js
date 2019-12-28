/*
  Upload View Unit Tests
*/

import axios from 'axios'

import { mount } from '@vue/test-utils'
import Upload from '@/views/Upload'

jest.mock('axios')

test('Is a Vue Instance', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Overwrite Checkbox Shows When Expected', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['checkbox-input', 'router-link', 'vue-headful'],
  })
  wrapper.setData({
    event: { resultUploaded: true },
  })
  expect(wrapper.vm.event.resultUploaded).toBe(true)
  expect(wrapper.findAll('checkbox-input-stub').length).toBe(1)
  wrapper.setData({
    event: { resultUploaded: false },
  })
  expect(wrapper.findAll('checkbox-input-stub').length).toBe(0)
})

test('Upload Buttons Shows Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: 1,
    uploadKey: 2,
    file: 3,
    overwrite: 4,
  })
  expect(wrapper.findAll('button').length).toBe(1)
  expect(wrapper.element).toMatchSnapshot()
  wrapper.setData({
    eventId: 1,
    uploadKey: 2,
    file: '',
    overwrite: 4,
  })
  expect(wrapper.findAll('button').length).toBe(0)
  wrapper.setData({
    eventId: '',
    uploadKey: 2,
    file: '',
    overwrite: 4,
  })
  expect(wrapper.findAll('button').length).toBe(0)
})

test('Check Event ID is Autofilled when Provided', () => {
  const mockFindEvent = jest.fn()
  const wrapper = mount(Upload, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $route: { params: { id: 'id' } },
    },
    methods: {
      findEvent: mockFindEvent,
    },
  })
  expect(wrapper.vm.eventId).toBe('id')
  expect(mockFindEvent).toHaveBeenCalledTimes(1)
})

test('Upload File - Correct API Call', async () => {
  axios.post.mockResolvedValue({ data: {} })
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: 'id' } },
      $router: { push: jest.fn() },
      $messages: { addMessage: jest.fn() },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
    },
  })
  wrapper.setData({
    eventId: 1,
    uploadKey: 2,
    file: 3,
    overwrite: 4,
    event: {
      routegadget: 5,
      results: 6,
      winsplits: 7,
    },
  })
  await wrapper.vm.uploadFile()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith('/api/upload', {
    eventId: 1,
    file: 3,
    overwrite: 4,
    results: 6,
    routegadget: 5,
    uploadKey: 2,
    winsplits: 7,
  })
})

test('Upload File - Success', async () => {
  const mockAddMessage = jest.fn()
  const mockRouterPush = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $router: { push: mockRouterPush },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: 1,
    uploadKey: 2,
    file: 3,
    overwrite: 4,
    event: { league: 'test' },
  })
  axios.post.mockResolvedValue()
  await wrapper.vm.uploadFile()

  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/leagues/test')
  expect(mockAddMessage).toHaveBeenCalledTimes(2)
  expect(mockAddMessage).toHaveBeenNthCalledWith(1, 'Upload Data Sent')
  expect(mockAddMessage).toHaveBeenLastCalledWith('Results Uploaded Successfully')
})

test('Upload File - Failure', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: 1,
    uploadKey: 2,
    file: 3,
    overwrite: 4,
  })
  axios.post.mockRejectedValue({ response: { data: { message: 'Error' } } })
  await wrapper.vm.uploadFile()
  expect(mockAddMessage).toHaveBeenCalledTimes(2)
  expect(mockAddMessage).toHaveBeenNthCalledWith(1, 'Upload Data Sent')
  expect(mockAddMessage).toHaveBeenLastCalledWith('Error')
})

test('Find Event - Correct API Call', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ eventId: 'id' })
  axios.get.mockResolvedValue()
  await wrapper.vm.findEvent()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/events/id')
})

test('Find Event - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.findEvent()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenLastCalledWith('Problem Fetching Event Name')
})

test('Find Event - Success - Event Found', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: { name: 'event', date: '22/33/44' } })
  await wrapper.vm.findEvent()
  expect(wrapper.vm.event).toEqual({ name: 'event', date: '22/33/44' })
})

test('Find Event - Success - Event Not Found', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockResolvedValue({ data: false })
  await wrapper.vm.findEvent()
  expect(wrapper.vm.event).toEqual({ name: 'No Event Found' })
})

test('File Change - No Files', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.fileChange({ target: { files: [] } })).toBeFalsy()
  expect(wrapper.vm.fileChange({ dataTransfer: { files: [] } })).toBeFalsy()
})

test('File Change - Files', () => {
  const mockReadFile = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    methods: {
      readFile: mockReadFile,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.fileChange({ target: { files: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] } })
  expect(wrapper.vm.fileName).toBe('a')
  expect(mockReadFile).toHaveBeenCalledTimes(1)
  expect(mockReadFile).toHaveBeenLastCalledWith({ name: 'a' })
  mockReadFile.mockClear()
  wrapper.vm.fileChange({ dataTransfer: { files: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] } })
  expect(wrapper.vm.fileName).toBe('a')
  expect(mockReadFile).toHaveBeenCalledTimes(1)
  expect(mockReadFile).toHaveBeenLastCalledWith({ name: 'a' })
})

class mockFileReader {
  readAsText () { }
}

test('Read File', () => {
  const mockOnLoad = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    methods: {
      readFileResult: mockOnLoad,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  const mockReadAsText = jest.fn(() => wrapper.vm.readFileResult())
  mockFileReader.prototype.readAsText = mockReadAsText
  global.FileReader = mockFileReader
  global.FileReader.readAsText = mockReadAsText
  wrapper.vm.readFile(new Blob())
  expect(mockReadAsText).toHaveBeenCalledTimes(1)
  expect(mockReadAsText).toHaveBeenLastCalledWith(expect.any(Blob))
  expect(mockOnLoad).toHaveBeenCalledTimes(1)
})

test('Read File Result', () => {
  const wrapper = mount(Upload, {
    attachToDocument: true,
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.readFileResult({ target: { result: 'Some Text' } })
  expect(wrapper.vm.file).toBe('Some Text')
})
