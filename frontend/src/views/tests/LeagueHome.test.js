/*
  League Home View Unit Tests
*/

import { mount } from '@vue/test-utils'
import League from '@/views/LeagueHome'

test('Is a Vue Instance', () => {
  const wrapper = mount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(League, {
    mocks: {
      $auth: { isLoggedIn: false },
      $route: { params: { name: '' } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
