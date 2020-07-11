import { shallowMount } from '@vue/test-utils'
import LeagueOverviewCard from '@/components/LeagueOverviewCard'

import axios from 'axios'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
  axios.get.mockRejectedValue()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(LeagueOverviewCard, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const wrapper = shallowMount(LeagueOverviewCard, {
    propsData: {
      event: {
        title: 'Title',
        description: 'Description',
        website: 'http://example.com',
        alternateLink: '/a',
        buttonText: 'Button',
      },
      league: { dynamicEventResults: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
