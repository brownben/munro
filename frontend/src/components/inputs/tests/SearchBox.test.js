import { mount } from '@vue/test-utils'
import SearchBox from '@/components/inputs/SearchBox.vue'

test('Is a Vue Instance', () => {
  const wrapper = mount(SearchBox, {
    stubs: ['router-link'],
    mocks: {
      $router: { push: jest.fn() },
      $route: { params: { query: '' } },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(SearchBox, {
    stubs: ['router-link'],
    mocks: {
      $router: { push: jest.fn() },
      $route: { params: { query: '' } },
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Go', () => {
  const wrapper = mount(SearchBox, {
    stubs: ['router-link'],
    mocks: {
      $router: { push: jest.fn() },
      $route: { path: 'NOT', params: { query: '' } },
    },
  })
  wrapper.vm.go('NOT')
  expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith('NOT')
  wrapper.vm.go('a')
  expect(wrapper.vm.$router.push).toHaveBeenCalledWith('a')
})
