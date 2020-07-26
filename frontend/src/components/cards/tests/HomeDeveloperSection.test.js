import { mount } from '@vue/test-utils'
import HomeDeveloperSection from '@/components/cards/HomeDeveloperSection'

test('Is a Vue Instance', () => {
  const wrapper = mount(HomeDeveloperSection, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(HomeDeveloperSection, { stubs: ['router-link'] })
  expect(wrapper.element).toMatchSnapshot()
})
