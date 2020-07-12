import { mount } from '@vue/test-utils'
import NoResultsCard from '@/components/cards/NoResultsCard'

test('Is a Vue Instance', () => {
  const wrapper = mount(NoResultsCard)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(NoResultsCard)
  expect(wrapper.element).toMatchSnapshot()
})
