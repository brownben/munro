/*
  Upload InstructionsView Unit Tests
*/

import { mount } from '@vue/test-utils'
import UploadInstructions from '@/views/UploadInstructions'

test('Is a Vue Instance', () => {
  const wrapper = mount(UploadInstructions, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(UploadInstructions, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
