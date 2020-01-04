/*
  Cookie Dialog Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import CookieDialog from '@/components/CookieDialog'

beforeEach(() => localStorage.clear())

test('Is a Vue Instance', () => {
  const wrapper = mount(CookieDialog)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(CookieDialog)
  expect(wrapper.element).toMatchSnapshot()
  wrapper.find('div').trigger('click')
  expect(wrapper.element).toMatchSnapshot()
})

test('Shows when LocalStorage is Empty', () => {
  const wrapper = mount(CookieDialog)
  expect(wrapper.find('p').isVisible()).toBeTruthy()
})

test("Doesn't show when LocalStorage is has Correct Value", () => {
  localStorage.setItem('cookies', 'accepted')
  expect(localStorage.getItem('cookies')).toBe('accepted')
  const wrapper = mount(CookieDialog)
  expect(wrapper.isEmpty()).toBeTruthy()
})

test('Shows when LocalStorage is has Incorrect Value', () => {
  localStorage.setItem('cookies', 'ccepted')
  const wrapper = mount(CookieDialog)
  expect(wrapper.find('p').isVisible()).toBeTruthy()
})

test('Shows Correct Message', () => {
  const wrapper = mount(CookieDialog)
  expect(wrapper.contains('p')).toBeTruthy()
  expect(wrapper.find('p').text()).toBe(
    `This site uses Cookies and Local Storage in order to function
        correctly. By using this site you consent to the use of Cookies and
        Local Storage.`
  )
})

test('Closes When Clicked', () => {
  const wrapper = mount(CookieDialog)
  expect(wrapper.findAll('.card-color').length).not.toBe(0)
  wrapper.find('.card-color').trigger('click')
  expect(wrapper.findAll('.card-color').length).toBe(0)
})
