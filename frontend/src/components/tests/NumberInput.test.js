import { mount } from '@vue/test-utils'
import NumberInput from '@/components/NumberInput'

test('Is a Vue Instance', () => {
  const wrapper = mount(NumberInput)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(NumberInput, {
    propsData: {
      value: 10,
      label: 'Test',
      max: 5,
      min: 10,
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
