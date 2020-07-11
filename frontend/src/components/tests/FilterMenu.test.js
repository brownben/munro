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

test('Emits Correct Values', () => {
  const wrapper = mount(FilterMenu)

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
  wrapper.vm.onChange()
  expect(wrapper.emitted().changed.length).toBe(1)
  expect(wrapper.emittedByOrder()[0].args[0]).toEqual({
    name: 'Tester',
    club: 'IND',
    minAge: 15,
    maxAge: 50,
    male: false,
    female: true,
  })
})
