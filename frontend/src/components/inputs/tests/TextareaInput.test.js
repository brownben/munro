import { shallowMount } from '@vue/test-utils'
import TextareaInput from '../TextareaInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(TextareaInput, {
    props: {
      label: 'Test Label:',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('Test Label:')
  expect(wrapper.html()).toContain('<textarea')
})

test('Focus Is Correctly Applied to Label', async () => {
  const wrapper = shallowMount(TextareaInput)
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
  await wrapper.find('textarea').trigger('focus')
  expect(wrapper.find('label').classes('text-main-600')).toBeTruthy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeFalsy()
  await wrapper.find('textarea').trigger('blur')
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
})

test('Emits Data On Change', async () => {
  const wrapper = shallowMount(TextareaInput)
  await wrapper.find('textarea').setValue('newOutput')
  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['newOutput'])
})
