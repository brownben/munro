/*
  Upload View Unit Tests
*/

import { mount } from '@vue/test-utils'
import Upload from '@/views/Upload'

test('Is a Vue Instance', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Upload, {
    mocks: {
      $route: { params: { id: '' } },
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
