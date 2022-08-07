import { describe, it, expect } from 'vitest'
import { queryToString } from '../string'

describe('Query Parameter to String', () => {
  it('should get the first element of an array', () => {
    expect(queryToString(['hello'])).toBe('hello')
  })

  it('should keep values if they are a string', () => {
    expect(queryToString('hello')).toBe('hello')
  })
})
