import { it, expect } from 'vitest'
import { displayDate } from '../date'

it('should display dates correctly', () => {
  expect(displayDate('2020-01-01')).toBe('01/01/2020')
  expect(displayDate('2020-01-02')).toBe('02/01/2020')
  expect(displayDate('1955-05-01')).toBe('01/05/1955')
  expect(displayDate('1955-5-2')).toBe('2/5/1955')
})
