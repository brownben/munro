import { mount } from '@vue/test-utils'
import HomeUploadSection from '@/components/cards/HomeUploadSection.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(HomeUploadSection, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(HomeUploadSection, { stubs: ['router-link'] })
  expect(wrapper.element).toMatchSnapshot()
})
