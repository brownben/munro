import { mount } from '@vue/test-utils'
import Layout from '@/components/Layout.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(Layout)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Layout, {
    propsData: {
      title: 'Hello World!',
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})
