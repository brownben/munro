/*
  Developers View Unit Tests
*/

import { mount } from '@vue/test-utils'
import Developers from '@/views/Developers.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(Developers, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Developers, {
    mocks: {
      $auth: { user: false },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
