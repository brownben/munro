/*
  Filter Menu Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import FilterMenu from '@/components/FilterMenu'

test('Is a Vue Instance', () => {
  const wrapper = mount(FilterMenu)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(FilterMenu)
  expect(wrapper.element).toMatchSnapshot()
})

test('Change Function is Called When any Input Changes', () => {
  const mockFunction = jest.fn()
  const wrapper = mount(FilterMenu)
  wrapper.setMethods({ onChange: mockFunction })

  // Open the Body
  wrapper.find('.accordion-head').trigger('click')

  // Change all the Values
  wrapper.findAll('input').at(0).setValue('Value')
  wrapper.findAll('input').at(1).setValue('Another Value')
  wrapper.findAll('input').at(2).setValue('3')
  wrapper.findAll('input').at(3).setValue('4')
  wrapper.findAll('input').at(4).setChecked(false)
  wrapper.findAll('input').at(5).setChecked(false)
  expect(mockFunction).toHaveBeenCalledTimes(6)
})

test('Emits Values on Changed', () => {
  const wrapper = mount(FilterMenu)

  // Open the Body
  wrapper.find('.accordion-head').trigger('click')

  // Change all the Values
  wrapper.setData({
    preferences: {
      name: 'Tester',
      club: 'IND',
      minAge: 15,
      maxAge: 50,
      male: false,
      female: true,
    },
  })
  wrapper.findAll('input').at(0).setValue('Test Runner')
  wrapper.findAll('input').at(4).setChecked(true)
  expect(wrapper.emitted().changed.length).toBe(2)
  expect(wrapper.emittedByOrder()[1].args[0]).toEqual({
    name: 'Test Runner',
    club: 'IND',
    minAge: 15,
    maxAge: 50,
    male: true,
    female: true,
  })
})
