import { shallowMount } from '@vue/test-utils'
import DropdownInput from '../DropdownInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(DropdownInput, {
    props: {
      label: 'Test Label:',
      type: 'text',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('Test Label:')
  expect(wrapper.find('select').exists()).toBeTruthy()
  expect(wrapper.html()).toContain('type="text"')
})

test('Focus Is Correctly Applied to Label', async () => {
  const wrapper = shallowMount(DropdownInput)
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
  await wrapper.find('select').trigger('focus')
  expect(wrapper.find('label').classes('text-main-600')).toBeTruthy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeFalsy()
  await wrapper.find('select').trigger('blur')
  expect(wrapper.find('label').classes('text-main-600')).toBeFalsy()
  expect(wrapper.find('label').classes('text-gray-600')).toBeTruthy()
})

test('Emits Data On Change', async () => {
  const wrapper = shallowMount(DropdownInput, {
    props: {
      list: ['1', 'newOutput', '3'],
      shift: false,
    },
  })
  await wrapper.find('select').setValue('newOutput')
  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  expect(wrapper.emitted()['update:modelValue'][0]).toContain('newOutput')
})

test('Shift Option Works', () => {
  const wrapper = shallowMount(DropdownInput, {
    props: { shift: true },
  })
  const options = wrapper.findAll('option')
  expect(options.length).toBe(1)
  expect(options[0].text()).toBe('')
})

test('String Options', () => {
  const wrapper = shallowMount(DropdownInput, {
    props: {
      list: ['1', '2', '3'],
      shift: false,
    },
  })
  const options = wrapper.findAll('option')
  expect(options.length).toBe(3)
  expect(options.map((option) => option.text())).toEqual(['1', '2', '3'])
})

test('Object Options', () => {
  const wrapper = shallowMount(DropdownInput, {
    props: {
      list: ['1', '2', '3'].map((item) => ({
        text: item,
        value: parseInt(item, 10),
      })),
      shift: false,
      optionTextDifferentToValue: true,
    },
  })
  const options = wrapper.findAll('option')
  expect(options.length).toBe(3)
  expect(options.map((option) => option.text())).toEqual(['1', '2', '3'])
  expect(options.map((option) => option.element._value)).toEqual([1, 2, 3])
})
