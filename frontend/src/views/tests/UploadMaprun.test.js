import axios from 'axios'

import { mount } from '@vue/test-utils'
import Upload from '@/views/UploadMaprun'

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

test('Upload Buttons Shows Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({
    eventId: '1',
    uploadKey: '2',
    course: '3',
    maprunId: '2',
  })
  expect(wrapper.findAll('button').length).toBe(1)
  expect(wrapper.element).toMatchSnapshot()
  wrapper.setData({
    eventId: '1',
    uploadKey: '2',
    course: '',
    maprunId: '2',
  })
  expect(wrapper.findAll('button').length).toBe(0)
  wrapper.setData({
    eventId: '',
    uploadKey: '2',
    course: '',
    maprunId: '',
  })
  expect(wrapper.findAll('button').length).toBe(0)
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
  axios.get.mockResolvedValue({ data: { name: 'Test', league: '2' } })
  await wrapper.vm.findEvent()
  expect(axios.get).toHaveBeenCalledWith('/api/events/id')
  expect(axios.get).toHaveBeenCalledWith('/api/leagues/2')
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
      getMaprunData: jest.fn().mockResolvedValue('fileData'),
    },
  })
  wrapper.setData({
    eventId: '1',
    uploadKey: '2',
    course: '3',
  })
  await wrapper.vm.uploadFile()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith('/api/upload/stream', {
    eventId: '1',
    uploadKey: '2',
    file: 'fileData',
    course: '3',
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
    methods: {
      findEvent: jest.fn(),
      getMaprunData: jest.fn().mockResolvedValue('fileData'),
    },
  })
  wrapper.setData({
    eventId: '1',
    uploadKey: '2',
  })
  axios.post.mockResolvedValue()
  await wrapper.vm.uploadFile()

  expect(mockRouterPush).toHaveBeenCalledTimes(1)
  expect(mockRouterPush).toHaveBeenLastCalledWith('/events/1/results')
  expect(mockAddMessage).toHaveBeenCalledTimes(2)
  expect(mockAddMessage).toHaveBeenNthCalledWith(1, 'Upload Data Sent')
  expect(mockAddMessage).toHaveBeenLastCalledWith(
    'Results Uploaded Successfully'
  )
})

test('Upload File - Failure', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
      getMaprunData: jest.fn().mockResolvedValue('fileData'),
    },
  })
  axios.post.mockRejectedValue({ response: { data: { message: 'Error' } } })
  await wrapper.vm.uploadFile()
  expect(mockAddMessage).toHaveBeenCalledTimes(2)
  expect(mockAddMessage).toHaveBeenNthCalledWith(1, 'Upload Data Sent')
  expect(mockAddMessage).toHaveBeenLastCalledWith('Error')
})

test('Upload File - No MapRun Event Found', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
      getMaprunData: jest.fn().mockResolvedValue(''),
    },
  })

  await wrapper.vm.uploadFile()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenNthCalledWith(
    1,
    'Error: No MapRun Event Found With That Id'
  )
})

test('Get MapRun Data - Success', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
      maprunHTMLtoCSV: jest.fn((a) => `${a} World`),
    },
  })
  axios.get.mockResolvedValue({ data: 'Hello' })
  wrapper.setData({ maprunId: '2' })
  expect(await wrapper.vm.getMaprunData()).toBe('Hello World')
  expect(axios.get).toHaveBeenLastCalledWith(
    'https://www.p.fne.com.au/rg/cgi-bin/SelectResultFileForSplitsBrowserFiltered.cgi?act=fileToSplitsBrowser&eventName=CombinedResults_2.csv'
  )
  expect(mockAddMessage).toHaveBeenCalledTimes(0)
})

test('Get MapRun Data - Error', async () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
      maprunHTMLtoCSV: jest.fn((a) => `${a} World`),
    },
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getMaprunData()
  expect(mockAddMessage).toHaveBeenCalledTimes(1)
  expect(mockAddMessage).toHaveBeenNthCalledWith(
    1,
    'Error: Problem Connecting to MapRun Server'
  )
})

test('Get MapRun Data - Error', () => {
  const mockAddMessage = jest.fn()
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
      $messages: { addMessage: mockAddMessage },
    },
    stubs: ['router-link', 'vue-headful'],
    methods: {
      findEvent: jest.fn(),
    },
  })

  expect(wrapper.vm.maprunHTMLtoCSV('')).toBe('')
  expect(
    wrapper.vm.maprunHTMLtoCSV(
      '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="css/main.css"><script src="../sorttable.js"></script><title>Score Results </title><body><div style="width:100%" class="header2"><p>CombinedResults_Test11.csv : </p><p><font size="4" color="yellow">Columns are now sortable!</font></p></div><table class="sortable" id="withsymbolsbeforesorting"><tbody><tr><th>Pos</th><th>Name</th><th>Track</th><th>Time</th><th>Classifier</th><th class="sorttable_numeric">Controls&nbspVisited Count: List</th><th class="sorttable_numeric">Dist (km)</th><th class="sorttable_numeric">Pace (mins/km)</th></tr></tbody></table></html>'
    )
  ).toBe('')
  expect(
    wrapper.vm.maprunHTMLtoCSV(
      `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="css/main.css"><script src="../sorttable.js"></script><title>Score Results </title><body><div style="width:100%" class="header2"><p>CombinedResults_Test11.csv : </p><p><font size="4" color="yellow">Columns are now sortable!</font></p></div><table class="sortable" id="withsymbolsbeforesorting"><tbody><tr><th>Pos</th><th>Name</th><th>Track</th><th>Time</th><th>Classifier</th><th class="sorttable_numeric">Controls&nbspVisited Count: List</th><th class="sorttable_numeric">Dist (km)</th><th class="sorttable_numeric">Pace (mins/km)</th></tr><tr><td sorttable_customkey="1" class='row3'>1</td><td class='row10'><a href='PersonalResults.cgi?FirstName=Eric&Surname=Smyth'>Eric Smyth</a></td><td class='row3'>--</td><td sorttable_customkey="958" class='row5'>15:58</td><td class='row5'>OK</td><td class='row15'>5: 1, 2, 3, 4, 5</td><td class='row5'>2.78</td><td class='row5'>5:45</td></tr></tbody></table></html>`
    )
  ).toBe('Eric Smyth,--,15:58,OK')

  expect(
    wrapper.vm.maprunHTMLtoCSV(
      `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="css/main.css"><script src="../sorttable.js"></script><title>Score Results </title><body><div style="width:100%" class="header2"><p>CombinedResults_Test11.csv : </p><p><font size="4" color="yellow">Columns are now sortable!</font></p></div><table class="sortable" id="withsymbolsbeforesorting"><tbody><tr><th>Pos</th><th>Name</th><th>Track</th><th>Time</th><th>Classifier</th><th class="sorttable_numeric">Controls&nbspVisited Count: List</th><th class="sorttable_numeric">Dist (km)</th><th class="sorttable_numeric">Pace (mins/km)</th></tr><tr><td sorttable_customkey="1" class='row3'>1</td><td class='row10'><a href='PersonalResults.cgi?FirstName=Eric&Surname=Smyth'>Eric Smyth</a></td><td class='row3'>--</td><td sorttable_customkey="958" class='row5'>15:58</td><td class='row5'>OK</td><td class='row15'>5: 1, 2, 3, 4, 5</td><td class='row5'>2.78</td><td class='row5'>5:45</td></tr><tr><td sorttable_customkey="1" class='row3'>1</td><td class='row10'><a href='PersonalResults.cgi?FirstName=Lee&Surname=Caves'>Lee Caves</a></td><td class='row3'>--</td><td sorttable_customkey="1200" class='row5'>20:00</td><td class='row5'>OK</td><td class='row15'>2: 1, 2</td><td class='row5'>2.14</td><td class='row5'>9:21</td><td class='row5'>03-04-2020</td></tr><tr><td sorttable_customkey="2" class='row3'>2</td><td class='row10'><a href='PersonalResults.cgi?FirstName=Rudi&Surname=Paul'>Rudi Paul</a></td><td class='row3'>--</td><td sorttable_customkey="2488" class='row5'>41:28</td><td class='row5'>OK</td><td class='row15'>3: 1, 2, 3</td><td class='row5'>4.27</td><td class='row5'>9:43</td><td class='row5'>17-03-2020</td></tr><tr>
      <td sorttable_customkey="6" class='row3'>6</td>
      <td class='row10'><a href='PersonalResults.cgi?FirstName=Judith&Surname=Bell'>Judith Bell</a></td><td class='row3'><a href='reitti.cgi?act=map&id=6590&kieli=&cID=1&pID=50004'>Track</a></td><td sorttable_customkey="2353" class='row5'>39:13</td><td class='row5'>OK</td><td class='row15'>24: 52, 53, 83, 84, 54, 79, 95, 85, 55, 87, 81, 58, 60, 59, 57, 90, 91, 61, 65, 97, 82, 96, 80, 96</td><td class='row5'>6.42</td><td class='row5'>6:07</td><td class='row5'>17-07-2020</td></tr></tbody></table></html>`
    )
  ).toBe(
    'Eric Smyth,--,15:58,OK\nLee Caves,--,20:00,OK\nRudi Paul,--,41:28,OK\nJudith Bell,50004,39:13,OK'
  )
})
