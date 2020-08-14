import axios from 'axios'
import { mount, shallowMount } from '@vue/test-utils'
import CompetitorForm from '@/views/admin/CompetitorForm.vue'
import { sampleSingleLeague } from '@/tests/test data/leagues'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '' },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Create', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeTruthy()
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Upload', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.create).toBeFalsy()
  expect(wrapper.element).toMatchSnapshot()
})

test('Return from Page', () => {
  const mockRouterPush = jest.fn()
  const mockAddMessage = jest.fn()
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: mockAddMessage },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
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

test('Get Leagues - Request Called Correctly', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $route: { path: '', params: { id: '' } },
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
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $route: { path: '', params: { id: '' } },
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
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $route: { path: '', params: { id: '' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  axios.get.mockRejectedValue()
  await wrapper.vm.getLeagues()
  expect(wrapper.vm.leagues).toEqual([])
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Fetching List of Leagues'
  )
})

test('Courses in League', () => {
  const wrapper = shallowMount(CompetitorForm, {
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
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ name: '', league: '', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: 'a', league: '', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: '', league: 'a', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: '', league: '', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: 'a', league: 'a', course: '' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: 'a', league: '', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: '', league: 'a', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeFalsy()
  wrapper.setData({ name: 'a', league: 'a', course: 'a' })
  expect(wrapper.vm.validateForm()).toBeTruthy()
})

test('Submit', async () => {
  const mockCreate = jest.fn()
  const mockUpdate = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: jest.fn() },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setMethods({
    createCompetitor: mockCreate,
    updateCompetitor: mockUpdate,
  })
  wrapper.setData({ create: true })
  await wrapper.vm.submit()
  expect(mockUpdate).toHaveBeenCalledTimes(0)
  expect(mockCreate).toHaveBeenCalledTimes(1)
  wrapper.setData({ create: false })
  await wrapper.vm.submit()
  expect(mockCreate).toHaveBeenCalledTimes(1)
  expect(mockUpdate).toHaveBeenCalledTimes(1)
})

test('Create Competitor - Invalid', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.createCompetitor()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )
})

test('Create Competitor - Correct API', async () => {
  const wrapper = shallowMount(CompetitorForm, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $messages: { addMessage: jest.fn() },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
  })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.post.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.createCompetitor()
  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenLastCalledWith(
    '/api/competitors',
    expect.any(Object)
  )
})

test('Create Competitor - Success', async () => {
  const mockReturnToCompetitorsPage = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
  })
  wrapper.setMethods({ returnToCompetitorsPage: mockReturnToCompetitorsPage })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.post.mockResolvedValue({ data: { message: 'Hello' } })
  await wrapper.vm.createCompetitor()
  expect(mockReturnToCompetitorsPage).toHaveBeenCalledTimes(1)
})

test('Create Competitor - Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.post.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.createCompetitor()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Error: Problem Creating Competitor - Please Try Again'
  )
})

test('Update Competitor - Invalid', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  await wrapper.vm.updateCompetitor()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Please Ensure Name and League Fields are not Blank'
  )
})

test('Update Competitor - Correct API', async () => {
  const wrapper = shallowMount(CompetitorForm, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $messages: { addMessage: jest.fn() },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
  })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.put.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.updateCompetitor()
  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenLastCalledWith(
    '/api/competitors/',
    expect.any(Object)
  )
})

test('Update Competitor - Success', async () => {
  const mockReturnToCompetitorsPage = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    stubs: ['router-link', 'vue-headful'],
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
  })
  wrapper.setMethods({ returnToCompetitorsPage: mockReturnToCompetitorsPage })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.put.mockResolvedValue({ data: { message: 'Hello' } })
  await wrapper.vm.updateCompetitor()
  expect(mockReturnToCompetitorsPage).toHaveBeenCalledTimes(1)
})

test('Update Competitor - Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $messages: { addMessage: mockAddMessageFunction },
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.setData({ name: 'a', league: 'b', course: 'c' })
  axios.put.mockRejectedValue({ response: { data: { message: 'Hello' } } })
  await wrapper.vm.updateCompetitor()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith('Hello')
})

test('Get Competitor Details - Error', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      created: () => {},
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getCompetitorDetails()
  expect(mockAddMessageFunction).toHaveBeenCalledTimes(1)
  expect(mockAddMessageFunction).toHaveBeenLastCalledWith(
    'Problem Getting Competitor Details'
  )
})

test('Get Competitor Details - Not Found', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = shallowMount(CompetitorForm, {
    mocks: {
      $route: { path: '/leagues/1/edit', params: { name: '' } },
      $messages: { addMessage: mockAddMessageFunction },
      created: () => {},
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: false })
  await wrapper.vm.getCompetitorDetails()
  expect(wrapper.vm.notFound).toBeTruthy()
  expect(wrapper.findAll('form').length).toBe(0)
})

test('Get Competitor Details - Correct API Call', async () => {
  const mockAddMessageFunction = jest.fn()
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: 'a' } },
      $messages: { addMessage: mockAddMessageFunction },
    },
    stubs: ['dropdown-input', 'router-link', 'vue-headful'],
  })
  jest.clearAllMocks()
  axios.get.mockRejectedValue()
  await wrapper.vm.getCompetitorDetails()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('/api/competitors/a')
})
