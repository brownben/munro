/*
  Dropdown Input Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import DropdownInput from '@/components/inputs/DropdownInput.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(DropdownInput)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(DropdownInput, {
    propsData: {
      list: ['Item 1', 'Item 2', 'Item 3'],
      includeBlank: true,
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Value Watcher', () => {
  const wrapper = mount(DropdownInput, {
    propsData: {
      list: ['Item 1', 'Item 2', 'Item 3'],
      includeBlank: true,
      value: 'Hello',
    },
  })
  wrapper.setProps({ value: 'Hello World' })
  expect(wrapper.vm.currentValue).toBe('Hello World')
})
