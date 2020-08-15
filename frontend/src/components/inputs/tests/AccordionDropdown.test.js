import { mount } from '@vue/test-utils'
import AccordionDropdown from '@/components/inputs/AccordionDropdown'

test('Renders Correctly', () => {
  const wrapper = mount(AccordionDropdown, {
    props: {
      title: 'Big Title',
    },
    slots: {
      default: 'Hello World',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('h2').text()).toBe('Big Title')
  expect(wrapper.find('svg').exists()).toBeTruthy()
  expect(wrapper.find('section').exists()).toBeTruthy()
  expect(wrapper.find('section').text()).toContain('Hello World')
})
