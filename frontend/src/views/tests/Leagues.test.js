/*
  League Home View Unit Tests
*/

import { mount } from '@vue/test-utils'
import League from '../../views/League'

test('Is a Vue Instance', () => {
  const wrapper = mount(League)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(League)
  expect(wrapper.element).toMatchSnapshot()
})
