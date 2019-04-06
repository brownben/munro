import axios from 'axios'
import { mount } from '@vue/test-utils'
import Competitors from '@/views/Competitors'

jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
  axios.get.mockResolvedValue({ data: [] })
})

test('Is a Vue Instance', () => {
  const wrapper = mount(Competitors)
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = mount(Competitors)
  expect(wrapper.element).toMatchSnapshot()
})
