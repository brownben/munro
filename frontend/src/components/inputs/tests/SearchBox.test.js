import { shallowMount } from '@vue/test-utils'
import SearchBox from '../SearchBox'

const $route = { path: '/search/a', params: { query: 7 } }
const $router = { push: jest.fn() }

test('Renders Correctly', () => {
  const wrapper = shallowMount(SearchBox, {
    global: { mocks: { $route, $router } },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.find('label').text()).toBe('Search Query:')
  expect(wrapper.find('label').classes()).toContain('sr-only')
  expect(wrapper.find('input').exists()).toBeTruthy()
  expect(wrapper.find('button').text()).toBe('Search')
  expect(wrapper.find('svg').exists()).toBeTruthy()
})

test('Focus Is Correctly Applied to Label', async () => {
  const wrapper = shallowMount(SearchBox, {
    global: { mocks: { $route, $router } },
  })
  expect(wrapper.find('svg').classes('text-main-500')).toBeFalsy()
  expect(wrapper.find('svg').classes('text-gray-400')).toBeTruthy()
  await wrapper.find('input').trigger('focus')
  expect(wrapper.find('svg').classes('text-main-500')).toBeTruthy()
  expect(wrapper.find('svg').classes('text-gray-400')).toBeFalsy()
  await wrapper.find('input').trigger('blur')
  expect(wrapper.find('svg').classes('text-main-500')).toBeFalsy()
  expect(wrapper.find('svg').classes('text-gray-400')).toBeTruthy()
})

test('Triggers Search', async () => {
  const wrapper = shallowMount(SearchBox, {
    global: { mocks: { $route, $router } },
  })
  await wrapper.find('input').setValue('a')
  await wrapper.find('button').trigger('click')
  expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
  await wrapper.find('input').setValue('b')
  await wrapper.find('button').trigger('click')
  expect(wrapper.vm.$router.push).toHaveBeenCalled()
  expect(wrapper.vm.$router.push).toHaveBeenLastCalledWith('/search/b')
})
