/*
  Accordion Dropdown Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import AccordionDropdown from '@/components/AccordionDropdown'

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

test('Open and Closes on Click', () => {
  const wrapper = mount(AccordionDropdown)
  expect(wrapper.findAll('.accordion-body').length).toBe(0)
  expect(wrapper.find('svg').classes()).not.toContain('rotate')
  wrapper.find('.accordion-head').trigger('click')
  expect(wrapper.findAll('.accordion-body').length).toBe(1)
  expect(wrapper.find('svg').classes()).toContain('rotate')
  wrapper.find('.accordion-head').trigger('click')
  expect(wrapper.findAll('.accordion-body').length).toBe(0)
  expect(wrapper.find('svg').classes()).not.toContain('rotate')
})
