import { shallowMount } from '@vue/test-utils'
import InstructionCard from '@/components/InstructionCard'

import axios from 'axios'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(InstructionCard, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(InstructionCard, {
    propsData: {
      event: {
        number: 7,
      },
      league: { dynamicEventResults: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
