/*
  Not Found View Unit Tests
*/

import { mount } from '@vue/test-utils'
import NotFound from '@/views/NotFound'

test('Is a Vue Instance', () => {
  const wrapper = mount(NotFound, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(NotFound, {
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
  expect(wrapper.find('h1').text()).toBe("Sorry, I'm Lost")
})
