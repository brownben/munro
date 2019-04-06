import { mount } from '@vue/test-utils'
import CompetitorMerge from '@/views/CompetitorMerge'

test('Is a Vue Instance', () => {
  const wrapper = mount(CompetitorMerge)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(CompetitorMerge)
  expect(wrapper.element).toMatchSnapshot()
})

