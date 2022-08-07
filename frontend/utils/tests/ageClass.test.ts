import { describe, it, expect } from 'vitest'
import { getAgeGenderFromAgeClass } from '../ageClass'

describe('Get Age and Gender from Age Class', () => {
  it('should parse blank age class', () => {
    expect(getAgeGenderFromAgeClass('')).toEqual({ gender: '', age: 21 })
  })

  it('should parse just the gender', () => {
    expect(getAgeGenderFromAgeClass('M')).toEqual({ gender: 'M', age: 21 })
    expect(getAgeGenderFromAgeClass('W')).toEqual({ gender: 'W', age: 21 })
    expect(getAgeGenderFromAgeClass('D')).toEqual({ gender: 'W', age: 21 })
    expect(getAgeGenderFromAgeClass('F')).toEqual({ gender: 'W', age: 21 })
  })

  it('should parse just the age', () => {
    expect(getAgeGenderFromAgeClass('20')).toEqual({ gender: '', age: 20 })
    expect(getAgeGenderFromAgeClass('12')).toEqual({ gender: '', age: 12 })
    expect(getAgeGenderFromAgeClass('55')).toEqual({ gender: '', age: 55 })
    expect(getAgeGenderFromAgeClass('75')).toEqual({ gender: '', age: 75 })
    expect(getAgeGenderFromAgeClass('35')).toEqual({ gender: '', age: 35 })
  })

  it('should parse standard age classes', () => {
    expect(getAgeGenderFromAgeClass('M20')).toEqual({ gender: 'M', age: 20 })
    expect(getAgeGenderFromAgeClass('M12')).toEqual({ gender: 'M', age: 12 })
    expect(getAgeGenderFromAgeClass('M55')).toEqual({ gender: 'M', age: 55 })

    expect(getAgeGenderFromAgeClass('W20')).toEqual({ gender: 'W', age: 20 })
    expect(getAgeGenderFromAgeClass('W12')).toEqual({ gender: 'W', age: 12 })
    expect(getAgeGenderFromAgeClass('W55')).toEqual({ gender: 'W', age: 55 })
  })

  it('should parse age classes with extra characters', () => {
    expect(getAgeGenderFromAgeClass('MU20')).toEqual({ gender: 'M', age: 20 })
  })
})
