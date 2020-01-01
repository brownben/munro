/*
  Home View Unit Tests
*/

import { mount } from '@vue/test-utils'
import Home from '@/views/Home'

beforeEach(() => {
  jest.clearAllMocks()
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Shows Admin Buttons When Logged In', () => {
  const wrapper = mount(Home, {
    mocks: {
      $auth: { user: true },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
  expect(wrapper.find('.actions').findAll('router-link-stub').length).toBe(3)
  expect(wrapper.find('.actions').findAll('router-link-stub').at(0).text()).toBe('Create New League')
  expect(wrapper.find('.actions').findAll('router-link-stub').at(1).text()).toBe('Manage Competitors')
})
