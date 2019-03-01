/*
  Menu Component Unit Tests
*/
/* global global */

import VueRouter from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'
import Menu from '../../components/Menu'

test('Is a Vue Instance', () => {
  const wrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Desktop', () => {
  const wrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Mobile', () => {
  global.innerWidth = 500
  global.dispatchEvent(new Event('resize'))

  const wrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Displays Correct View off Authentication State', () => {
  const loggedInWrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
    stubs: ['router-link'],
  })
  expect(loggedInWrapper.find('.actions').html()).toContain('Admin Login')
  const loggedOutWrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: true },
    },
    stubs: ['router-link'],
  })
  expect(loggedOutWrapper.find('.actions').html()).toContain('Log Out')
})

test('Close Mobile Menu on Route Change', () => {
  global.innerWidth = 500
  global.dispatchEvent(new Event('resize'))

  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({ routes: [{ path: '/' }, { path: '/other' }] })
  const wrapper = mount(Menu, {
    localVue,
    router,
    mocks: {
      $auth: { isLoggedIn: true },
    },
  })

  expect(wrapper.find('.actions').isVisible()).toBeFalsy()
  wrapper.find('svg').trigger('click')
  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
  router.push('/other')
  expect(wrapper.find('.actions').isVisible()).toBeFalsy()
})

test('Desktop Menu Remains Static on Route Change', () => {
  global.innerWidth = 1000
  global.dispatchEvent(new Event('resize'))
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({ routes: [{ path: '/' }, { path: '/other' }] })
  const wrapper = mount(Menu, {
    localVue,
    router,
    mocks: {
      $auth: { isLoggedIn: true },
    },
  })

  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
  router.push('/other')
  expect(wrapper.find('.actions').isVisible()).toBeTruthy()
})

test('Check Resize Event is Added/ Removed', () => {
  const adder = jest
    .spyOn(global, 'addEventListener')
    .mockImplementation(() => { })
  const remover = jest
    .spyOn(global, 'removeEventListener')
    .mockImplementation(() => { })

  const wrapper = mount(Menu, {
    mocks: {
      $auth: { isLoggedIn: false },
    },
    stubs: ['router-link'],
  })

  expect(adder).toHaveBeenCalled()
  wrapper.destroy()
  expect(remover).toHaveBeenCalled()
})
