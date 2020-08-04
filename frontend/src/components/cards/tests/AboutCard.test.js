import { mount } from '@vue/test-utils'
import AboutCard from '@/components/cards/AboutCard.vue'

beforeEach(() => localStorage.clear())

test('Is a Vue Instance', () => {
  const wrapper = mount(AboutCard)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(AboutCard)
  expect(wrapper.element).toMatchSnapshot()
})
