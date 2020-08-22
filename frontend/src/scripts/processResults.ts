import { Result, ResultWithAgeGender } from '/@/api/results'
import { FilterPreferences, SortPreferences } from './FilterSort.d'

/* Display Time */
const twoDigits = (number: number): string => {
  if (number.toString().length < 2) return `0${number.toString()}`
  else return number.toString()
}

export const elapsedTime = (totalTimeInSeconds: number): string => {
  if (typeof totalTimeInSeconds !== 'number') return totalTimeInSeconds
  else if (totalTimeInSeconds === 0) return ''
  const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
  const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
  return `${twoDigits(timeInMinutes)}:${twoDigits(timeInSeconds)}`
}

/* Filter Result */
const resultMatchesGender = (
  filterPreferences: FilterPreferences,
  result: ResultWithAgeGender
): boolean =>
  (filterPreferences.male && filterPreferences.female) ||
  (filterPreferences.male && result.gender === 'M') ||
  (filterPreferences.female && result.gender === 'W') ||
  (!filterPreferences.female && !filterPreferences.male && result.gender === '')

const resultMatchesAge = (
  filterPreferences: FilterPreferences,
  result: ResultWithAgeGender
): boolean =>
  (filterPreferences.maxAge >= 100 && filterPreferences.minAge === 0) ||
  (filterPreferences.minAge <= result.age &&
    result.age <= filterPreferences.maxAge)

export const filterResults = (
  result: ResultWithAgeGender,
  filterPreferences: FilterPreferences
) =>
  result.name.match(new RegExp(filterPreferences.name, 'i')) &&
  result.club.match(new RegExp(filterPreferences.club, 'i')) &&
  resultMatchesGender(filterPreferences, result) &&
  resultMatchesAge(filterPreferences, result)

/* Sort */
export const sortResults = (sortPreferences: SortPreferences) => {
  const aIsLess = sortPreferences.ascending ? -1 : 1
  const bIsLess = sortPreferences.ascending ? 1 : -1

  return (a: ResultWithAgeGender, b: ResultWithAgeGender) => {
    if (a[sortPreferences.by] === b[sortPreferences.by]) return 0
    else if (
      a[sortPreferences.by] === null ||
      a[sortPreferences.by] === undefined ||
      a[sortPreferences.by] === ''
    )
      return aIsLess
    else if (
      b[sortPreferences.by] === null ||
      b[sortPreferences.by] === undefined ||
      b[sortPreferences.by] === ''
    )
      return bIsLess
    else if (a[sortPreferences.by] < b[sortPreferences.by]) return bIsLess
    else return aIsLess
  }
}
/* Get Age and Gender */
export const resultWithAgeGender = (result: Result): ResultWithAgeGender => {
  let gender = ''
  let age = 0
  if (result.ageClass) {
    const regexMatch = result.ageClass.match(/([MWmwfFDH])[^0-9]*([0-9]*)/)
    if (['M', 'H'].includes(regexMatch?.[1]?.toUpperCase() ?? '')) gender = 'M'
    else if (['W', 'F', 'D'].includes(regexMatch?.[1]?.toUpperCase() ?? ''))
      gender = 'W'
    else gender = ''
    age = parseInt(regexMatch?.[2] ?? '0', 10)
  }
  return { ...result, age, gender } as ResultWithAgeGender
}
