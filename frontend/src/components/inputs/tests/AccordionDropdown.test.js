/*
  Accordion Dropdown Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import AccordionDropdown from '@/components/inputs/AccordionDropdown.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(AccordionDropdown)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(AccordionDropdown, {
    props: {
      title: 'Accordion Dropdown',
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
