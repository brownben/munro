import { mount } from '@vue/test-utils'
import HomeLeaguesSection from '@/components/cards/HomeLeaguesSection.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(HomeLeaguesSection, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(HomeLeaguesSection, { stubs: ['router-link'] })
  expect(wrapper.element).toMatchSnapshot()
})
