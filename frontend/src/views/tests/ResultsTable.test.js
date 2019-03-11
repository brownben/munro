/*
  Results Table View Unit Tests
*/

import { mount } from '@vue/test-utils'
import ResultsTable from '@/views/ResultsTable'

test('Is a Vue Instance', () => {
  const wrapper = mount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(ResultsTable, {
    mocks: {
      $route: { params: { name: '', course: '' } },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
