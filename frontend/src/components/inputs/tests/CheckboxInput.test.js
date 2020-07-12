/*
  Checkbox Input Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import CheckboxInput from '@/components/inputs/CheckboxInput'

test('Is a Vue Instance', () => {
  const wrapper = mount(CheckboxInput)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Checked', () => {
  const wrapper = mount(CheckboxInput, {
    propsData: {
      value: true,
      label: 'Test Checkbox',
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Unchecked', () => {
  const wrapper = mount(CheckboxInput, {
    propsData: {
      value: false,
      label: 'Another Input',
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Expect Value to be Emmitted When Clicked', () => {
  const wrapper = mount(CheckboxInput, {
    propsData: {
      value: false,
    },
  })
  wrapper.find('label').trigger('click')
  expect(wrapper.emitted().input[0][0]).toBeTruthy()
  wrapper.find('label').trigger('click')
  expect(wrapper.emitted().input[1][0]).toBeFalsy()
})
