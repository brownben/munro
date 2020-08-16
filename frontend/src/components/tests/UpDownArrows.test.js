import { shallowMount } from '@vue/test-utils'
import UpDownArrows from '../UpDownArrows.vue'

test('Renders Correctly', () => {
  const wrapper = shallowMount(UpDownArrows)
  expect(wrapper.findAll('svg').length).toBe(2)
})

test('Ascending', () => {
  const wrapper = shallowMount(UpDownArrows, {
    props: {
      active: true,
      ascending: true,
    },
  })
  expect(wrapper.findAll('svg')[0].classes()).toContain(...['h-5', '-mt-1'])
  expect(wrapper.findAll('svg')[1].classes()).toContain(...['h-2', 'mt-2'])
})

test('Not Ascending', () => {
  const wrapper = shallowMount(UpDownArrows, {
    props: {
      active: true,
      ascending: false,
    },
  })
  expect(wrapper.findAll('svg')[0].classes()).toContain(...['h-2', 'mt-2'])
  expect(wrapper.findAll('svg')[1].classes()).toContain(...['h-5', '-mt-1'])
})

test('Not Active', () => {
  const wrapper = shallowMount(UpDownArrows, {
    props: {
      active: false,
      ascending: true,
    },
  })
  expect(wrapper.findAll('svg')[0].classes()).toContain(
    ...['h-7/2', '-mt-1', 'text-opacity-75']
  )
  expect(wrapper.findAll('svg')[1].classes()).toContain(
    ...['h-7/2', '-mt-1', 'text-opacity-75']
  )
})
