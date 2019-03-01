/*
  Messages Component Unit Tests
*/

import { mount } from '@vue/test-utils'
import Messages from '../../components/Messages'

test('Is a Vue Instance', () => {
  const wrapper = mount(Messages, {
    mocks: {
      $messages: { messages: [] },
    },
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('Renders Correctly', () => {
  const messages = {
    messages: [
      { id: 0, text: 'Message 0' },
      { id: 1, text: 'Message 1' },
      { id: 2, text: 'Message 2' },
    ],
  }
  const wrapper = mount(Messages, {
    mocks: {
      $messages: messages,
    },
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Correct Number of Messages Displayed - 3 Messages', () => {
  const messages = {
    messages: [
      { id: 0, text: 'Message 0' },
      { id: 1, text: 'Message 1' },
      { id: 2, text: 'Message 2' },
    ],
  }
  const wrapper = mount(Messages, {
    mocks: {
      $messages: messages,
    },
  })
  expect(wrapper.findAll('p').length).toBe(3)
})

test('Correct Number of Messages Displayed - No Messages', () => {
  const messages = {
    messages: [],
  }
  const wrapper = mount(Messages, {
    mocks: {
      $messages: messages,
    },
  })
  expect(wrapper.findAll('p').length).toBe(0)
})

test('Clear Message when Clicked', () => {
  const removeMessage = jest.fn()
  const messages = {
    removeMessage: removeMessage,
    messages: [
      { id: 0, text: 'Message 0' },
    ],
  }
  const wrapper = mount(Messages, {
    mocks: {
      $messages: messages,
    },
  })
  wrapper.find('p').trigger('click')
  expect(removeMessage).toHaveBeenCalledTimes(1)
  expect(removeMessage).toHaveBeenLastCalledWith(expect.any(Number))
})
