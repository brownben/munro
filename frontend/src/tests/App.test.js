/*
  App.vue Unit Tests
*/

import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(App, {
    mocks: {
      $auth: { checkLogin: jest.fn(), user: false },
      $route: { path: '' },
    },
    stubs: ['router-view'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(App, {
    mocks: {
      $auth: { checkLogin: jest.fn(), user: false },
      $route: { path: '' },
    },
    stubs: ['router-view'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
