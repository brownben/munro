import { shallowMount } from '@vue/test-utils'
import NumberInput from '../NumberInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(NumberInput, {
    props: {
      label: 'Test Label:',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('Test Label:')
  expect(wrapper.html()).toContain('<input')
  expect(wrapper.html()).toContain('type="number"')
  expect(wrapper.html()).toContain('min="0"')
  expect(wrapper.html()).toContain('max="100"')
})

test('Focus Is Correctly Applied to Label', async () => {
  const wrapper = shallowMount(NumberInput)
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
  await wrapper.find('input').trigger('focus')
  expect(wrapper.find('label').classes('text-main-600')).toBeTruthy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeFalsy()
  await wrapper.find('input').trigger('blur')
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
})

test('Emits Data On Change', async () => {
  const wrapper = shallowMount(NumberInput)
  await wrapper.find('input').setValue(5)
  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual([5])
})
