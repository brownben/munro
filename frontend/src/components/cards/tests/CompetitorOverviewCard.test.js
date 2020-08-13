import { shallowMount } from '@vue/test-utils'
import CompetitorOverviewCard from '@/components/cards/CompetitorOverviewCard.vue'

import axios from 'axios'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(CompetitorOverviewCard, {
    stubs: ['router-link'],
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(CompetitorOverviewCard, {
    propsData: {
      competitor: {
        name: 'Bob Jones',
        course: 'Red',
        ageClass: 'M40',
        club: 'HAT',
        id: 7,
      },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
