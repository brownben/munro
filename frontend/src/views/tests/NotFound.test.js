/*
  Not Found View Unit Tests
*/

import { mount } from '@vue/test-utils'
import NotFound from '@/views/NotFound'

test('Is a Vue Instance', () => {
  const wrapper = mount(NotFound)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(NotFound)
  expect(wrapper.element).toMatchSnapshot()
  expect(wrapper.find('h1').text()).toBe('Sorry We Can\'t Find What You Are Looking For')
  expect(wrapper.findAll('button').length).toBe(2)
})
