/*
  Developers View Unit Tests
*/

import { mount } from '@vue/test-utils'
import Developers from '@/views/Developers'

test('Is a Vue Instance', () => {
  const wrapper = mount(Developers)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Developers)
  expect(wrapper.element).toMatchSnapshot()
})
