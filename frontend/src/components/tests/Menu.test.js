/*
  Menu Component Unit Tests
*/

import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import Menu from '@/components/Menu.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(Menu, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/' },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Menu, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/' },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()

  const wrapperTwo = mount(Menu, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/login' },
    },
    stubs: ['router-link'],
  })
  expect(wrapperTwo.element).toMatchSnapshot()
})

test('Displays Correct View off Authentication State', () => {
  const loggedInWrapper = mount(Menu, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/login' },
    },
    stubs: ['router-link'],
  })
  expect(loggedInWrapper.find('nav').html()).not.toContain('Logout')
  const loggedOutWrapper = mount(Menu, {
    mocks: {
      $auth: { user: true },
      $route: { path: '/login' },
    },
    stubs: ['router-link'],
  })
  expect(loggedOutWrapper.find('nav').html()).toContain('Logout')
})
