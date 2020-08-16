import { shallowMount } from '@vue/test-utils'
import TextInput from '../TextInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(TextInput, {
    props: {
      label: 'Test Label:',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('Test Label:')
  expect(wrapper.html()).toContain('<input')
  expect(wrapper.html()).toContain('type="text"')
})

test('Focus Is Correctly Applied to Label', async () => {
  const wrapper = shallowMount(TextInput)
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
  const wrapper = shallowMount(TextInput)
  await wrapper.find('input').setValue('newOutput')
  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['newOutput'])
})
