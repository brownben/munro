import { it, expect } from 'vitest'
import { elapsedTime } from '../time'

it('should display elapsed time correctly', () => {
  expect(elapsedTime(0)).toBe('')
  expect(elapsedTime(1)).toBe('00:01')
  expect(elapsedTime(10)).toBe('00:10')
  expect(elapsedTime(60)).toBe('01:00')
  expect(elapsedTime(90)).toBe('01:30')
  expect(elapsedTime(93)).toBe('01:33')
  expect(elapsedTime(3600)).toBe('60:00')
  expect(elapsedTime(3602)).toBe('60:02')
})
