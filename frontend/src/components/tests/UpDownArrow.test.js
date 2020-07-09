/*
  UpDownArrows Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import UpDownArrows from '@/components/UpDownArrows'

test('Is a Vue Instance', () => {
  const wrapper = mount(UpDownArrows)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Passed with Props', () => {
  const wrapper = mount(UpDownArrows, {
    propsData: {
      active: true,
      ascending: false,
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Check Classes Update', () => {
  const wrapper = mount(UpDownArrows, {
    propsData: {
      active: true,
      ascending: true,
    },
  })
  expect(wrapper.props().active).toBeTruthy()
  expect(wrapper.props().ascending).toBeTruthy()
  expect(wrapper.findAll('svg').at(0).classes()).toEqual([])
  expect(wrapper.findAll('svg').at(1).classes()).toContain('active-arrow')

  const wrapper1 = mount(UpDownArrows, {
    propsData: {
      active: true,
      ascending: false,
    },
  })
  expect(wrapper1.findAll('svg').at(0).classes()).toContain('active-arrow')
  expect(wrapper1.findAll('svg').at(1).classes()).toEqual([])

  const wrapper2 = mount(UpDownArrows, {
    propsData: {
      active: false,
      ascending: false,
    },
  })
  expect(wrapper2.findAll('svg').at(0).classes()).toEqual([])
  expect(wrapper2.findAll('svg').at(1).classes()).toEqual([])
})

test('Renders Correctly - No Props', () => {
  const wrapper = mount(UpDownArrows)
  expect(wrapper.element).toMatchSnapshot()
})
