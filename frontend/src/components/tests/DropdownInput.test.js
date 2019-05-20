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
      includeBlank: true,
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Open\'s and Closes Correctly', () => {
  const wrapper = mount(DropdownInput, {
    propsData: {
      list: ['Item 1', 'Item 2', 'Item 3'],
      includeBlank: true,
    },
  })
  wrapper.find('.visible').trigger('click')
  expect(wrapper.find('.dropdown').isVisible()).toBeTruthy()
  wrapper.find('.visible').trigger('click')
  expect(wrapper.find('.dropdown').isVisible()).toBeFalsy()
  wrapper.find('.visible').trigger('click')
  wrapper.findAll('p').at(3).trigger('click')
  expect(wrapper.vm.currentValue).toBe('Item 3')
  expect(wrapper.find('.dropdown').isVisible()).toBeFalsy()
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
