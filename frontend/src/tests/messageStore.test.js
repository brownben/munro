/*
  Unit Tests for /frontend/src/messageStore.js
*/

import messages from '../messageStore'

beforeEach(() => {
  jest.useFakeTimers()
  messages.messages = []
  messages.id = 0
})

test('Add Message', () => {
  messages.addMessage('This is an Message')
  expect(messages.messages).toEqual([{ id: 0, text: 'This is an Message' }])
})

test('Add Message and Check it is Remove after 15s', () => {
  messages.addMessage('This is an Message')
  jest.advanceTimersByTime(15000)
  expect(messages.messages).toEqual([])
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000, expect.any(Number))
})

test('Add Messages', () => {
  messages.addMessage('This is a Message')
  messages.addMessage('This is an Error')
  messages.addMessage('This is a Warning')
  messages.addMessage('This is a 2nd Message')
  expect(messages.messages).toEqual([
    { id: 0, text: 'This is a Message' },
    { id: 1, text: 'This is an Error' },
    { id: 2, text: 'This is a Warning' },
    { id: 3, text: 'This is a 2nd Message' },
  ])
})

test('Add Messages and Check all are Removed after 15s', () => {
  messages.addMessage('This is a Message')
  messages.addMessage('This is an Error')
  messages.addMessage('This is a Warning')
  messages.addMessage('This is a 2nd Message')
  jest.advanceTimersByTime(15000)
  expect(messages.messages).toEqual([])
  expect(setTimeout).toHaveBeenCalledTimes(4)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000, expect.any(Number))
})

test('Remove First Message', () => {
  messages.messages = [
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ]
  messages.removeMessage(0)
  expect(messages.messages).toEqual([
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ])
})

test('Remove Message', () => {
  messages.messages = [
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ]
  messages.removeMessage(1)
  expect(messages.messages).toEqual([
    { id: 0, text: 'Message 0' },
    { id: 2, text: 'Message 2' },
  ])
})

test('Remove Last Message', () => {
  messages.messages = [
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ]
  messages.removeMessage(2)
  expect(messages.messages).toEqual([
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
  ])
})

test('Remove All Messages', () => {
  messages.messages = [
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ]
  messages.removeMessage(0)
  messages.removeMessage(1)
  messages.removeMessage(2)
  expect(messages.messages).toEqual([])
})

test('Clear Messages', () => {
  messages.messages = [
    { id: 0, text: 'Message 0' },
    { id: 1, text: 'Message 1' },
    { id: 2, text: 'Message 2' },
  ]
  messages.clearMessages()
  expect(messages.messages).toEqual([])
})

test('Clear Empty Messages', () => {
  messages.clearMessages()
  expect(messages.messages).toEqual([])
})
