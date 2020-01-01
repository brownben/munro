import { mount } from '@vue/test-utils'
import TextInput from '@/components/TextInput'

test('Is a Vue Instance', () => {
  const wrapper = mount(TextInput)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(TextInput, {
    propsData: {
      value: 'hello',
      label: 'Test',
      type: 'url',
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
