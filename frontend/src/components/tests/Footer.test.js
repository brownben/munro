import { mount } from '@vue/test-utils'
import Footer from '@/components/Footer'

beforeEach(() => localStorage.clear())

test('Is a Vue Instance', () => {
  const wrapper = mount(Footer, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/' },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Footer, {
    mocks: {
      $auth: { user: false },
      $route: { path: '/' },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
