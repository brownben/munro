import { mount } from '@vue/test-utils'
import ResultTransfer from '@/views/ResultTransfer'

test('Is a Vue Instance', () => {
  const wrapper = mount(ResultTransfer)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(ResultTransfer)
  expect(wrapper.element).toMatchSnapshot()
})

