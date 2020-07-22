import { mount } from '@vue/test-utils'
import Upload from '@/views/Upload'

test('Is a Vue Instance', () => {
  const wrapper = mount(Upload, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Upload, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
