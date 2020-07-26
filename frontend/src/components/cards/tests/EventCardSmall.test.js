import { shallowMount } from '@vue/test-utils'
import EventCardSmall from '@/components/cards/EventCardSmall'

beforeEach(() => {
  jest.resetAllMocks()
})

test('Is a Vue Instance', () => {
  const wrapper = shallowMount(EventCardSmall, { stubs: ['router-link'] })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly - Normal View', () => {
  const wrapper = shallowMount(EventCardSmall, {
    propsData: {
      event: {
        name: 'Test Event',
        date: '2001-01-01',
        organiser: 'John Doe',
        website: 'http://example.com',
        resultUploaded: true,
        moreInformation: 'Text',
        winsplits: 'http://winsplits',
        routegadget: 'http://routegadget',
        results: 'http://results',
      },
      league: { dynamicEventResults: true },
    },
    stubs: ['router-link'],
  })
  expect(wrapper.element).toMatchSnapshot()
})
