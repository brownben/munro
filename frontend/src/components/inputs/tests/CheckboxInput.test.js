import { shallowMount } from '@vue/test-utils'
import CheckboxInput from '@/components/inputs/CheckboxInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(CheckboxInput, {
    props: {
      label: '- Test Label',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('- Test Label')
  expect(wrapper.html()).toContain('<input')
  expect(wrapper.html()).toContain('type="checkbox"')
  expect(wrapper.find('svg').exists()).toBeTruthy()
})

test('Emits Data On Change', async () => {
  const wrapper = shallowMount(CheckboxInput)
  await wrapper.find('input').setValue(true)
  expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
  await wrapper.find('input').setValue(false)
  expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false])
})
