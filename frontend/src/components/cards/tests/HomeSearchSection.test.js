import { mount } from '@vue/test-utils'
import HomeSearchSection from '@/components/cards/HomeSearchSection.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(HomeSearchSection, {
    stubs: ['router-link'],
    mocks: {
      $router: { push: jest.fn() },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(HomeSearchSection, {
    stubs: ['router-link'],
    mocks: {
      $router: { push: jest.fn() },
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
