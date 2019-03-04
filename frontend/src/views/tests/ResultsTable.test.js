/*
  Results Table View Unit Tests
*/

import { mount } from '@vue/test-utils'
import ResultsTable from '@/views/ResultsTable'

test('Is a Vue Instance', () => {
  const wrapper = mount(ResultsTable)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(ResultsTable)
  expect(wrapper.element).toMatchSnapshot()
})
