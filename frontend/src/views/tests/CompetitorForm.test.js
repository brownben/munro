import { mount } from '@vue/test-utils'
import CompetitorForm from '@/views/CompetitorForm'

test('Is a Vue Instance', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '' },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Create', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '', params: { id: '' } },
    },
  })
  expect(wrapper.vm.create).toBeTruthy()
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders Correctly - Upload', () => {
  const wrapper = mount(CompetitorForm, {
    mocks: {
      $route: { path: '/competitors/1/edit', params: { id: '' } },
    },
  })
  expect(wrapper.vm.create).toBeFalsy()
  expect(wrapper.element).toMatchSnapshot()
})
