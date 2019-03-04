/*
  Dropdown Input Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import DropdownInput from '@/components/DropdownInput'

test('Is a Vue Instance', () => {
  const wrapper = mount(DropdownInput)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(DropdownInput, {
    propsData: {
      list: ['Item 1', 'Item 2', 'Item 3'],
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
