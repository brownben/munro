import { it, expect } from 'vitest'
import { groupBy } from '../groupBy'

it('should group a list of objects with a singular key', () => {
  const list = [{ a: 1 }, { a: 2 }, { a: 1 }]
  expect(groupBy(list, (item) => item.a)).toEqual({
    1: [{ a: 1 }, { a: 1 }],
    2: [{ a: 2 }],
  })
})

it('should group everything together if the key is the same', () => {
  const list = [{ a: 1 }, { a: 2 }, { a: 1 }]
  expect(groupBy(list, () => 'key')).toEqual({
    key: [{ a: 1 }, { a: 2 }, { a: 1 }],
  })
})

it('should group with multiple fields', () => {
  const list = [
    { time: 37, course: 'red' },
    { time: 45, course: 'blue' },
    { time: 22, course: 'red' },
    { time: 37, course: 'blue' },
    { time: 45, course: 'red' },
    { time: 12, course: 'yellow' },
  ]
  expect(groupBy(list, (result) => result.course)).toEqual({
    red: [
      { time: 37, course: 'red' },

      { time: 22, course: 'red' },
      { time: 45, course: 'red' },
    ],
    blue: [
      { time: 45, course: 'blue' },
      { time: 37, course: 'blue' },
    ],
    yellow: [{ time: 12, course: 'yellow' }],
  })
})
