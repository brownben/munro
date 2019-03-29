/*
  App.vue Unit Tests
*/

import { shallowMount } from '@vue/test-utils'
import App from '@/App'

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(App, {
    mocks: {
      $auth: { checkLogin: jest.fn(), user: false },
    },
    stubs: ['router-view'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(App, {
    mocks: {
      $auth: { checkLogin: jest.fn(), user: false },
    },
    stubs: ['router-view'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
