import {
  EventResult,
  EventResultWithAgeGender,
  LeagueResult,
  LeagueResultWithAgeGender,
} from '/@/api/results'
import {
  FilterPreferences,
  SortPreferencesEvent,
  SortPreferencesLeague,
  SortablePropetiesLeague,
} from './FilterSort.d'

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
  result: EventResultWithAgeGender | LeagueResultWithAgeGender,
  filterPreferences: FilterPreferences
): boolean =>
  (filterPreferences.male && filterPreferences.female) ||
  (filterPreferences.male && result.gender === 'M') ||
  (filterPreferences.female && result.gender === 'W') ||
  (!filterPreferences.female && !filterPreferences.male && result.gender === '')

const resultMatchesAge = (
  result: EventResultWithAgeGender | LeagueResultWithAgeGender,
  filterPreferences: FilterPreferences
): boolean =>
  (filterPreferences.maxAge >= 100 && filterPreferences.minAge === 0) ||
  (filterPreferences.minAge <= result.age &&
    result.age <= filterPreferences.maxAge)

export const filterResults = (
  result: EventResultWithAgeGender | LeagueResultWithAgeGender,
  filterPreferences: FilterPreferences
) =>
  result.name.match(new RegExp(filterPreferences.name, 'i')) &&
  result.club.match(new RegExp(filterPreferences.club, 'i')) &&
  resultMatchesGender(result, filterPreferences) &&
  resultMatchesAge(result, filterPreferences)

/* Sort */

const sortComparison = (ascending: boolean, a: any, b: any): 0 | 1 | -1 => {
  const aIsLess = ascending ? -1 : 1
  const bIsLess = ascending ? 1 : -1

  if (a === b) return 0
  else if (a === null || a === undefined || a === '') return aIsLess
  else if (b === null || b === undefined || b === '') return bIsLess
  else if (a < b) return bIsLess
  else return aIsLess
}

const sortEventResultsByProperty = (sortPreferences: SortPreferencesEvent) => (
  a: EventResultWithAgeGender,
  b: EventResultWithAgeGender
) =>
  sortComparison(
    sortPreferences.ascending,
    a[sortPreferences.by],
    b[sortPreferences.by]
  )

const sortLeagueResultsByProperty = (
  sortPreferences: SortPreferencesLeague
) => (a: LeagueResultWithAgeGender, b: LeagueResultWithAgeGender) =>
  sortComparison(
    sortPreferences.ascending,
    a[sortPreferences.by],
    b[sortPreferences.by]
  )

const sortLeagueResultsByPoints = (sortPreferences: SortPreferencesLeague) => (
  a: LeagueResultWithAgeGender,
  b: LeagueResultWithAgeGender
): number =>
  sortComparison(
    sortPreferences.ascending,
    a.points[sortPreferences.event ?? 0]?.score || 0,
    b.points[sortPreferences.event ?? 0]?.score || 0
  )

export const sortLeagueResults = (sortPreferences: SortPreferencesLeague) => {
  if (sortPreferences.by === SortablePropetiesLeague.points)
    return sortLeagueResultsByPoints(sortPreferences)
  else return sortLeagueResultsByProperty(sortPreferences)
}

export const sortEventResults = (sortPreferences: SortPreferencesEvent) =>
  sortEventResultsByProperty(sortPreferences)

/* Get Age and Gender */
const getAgeGenderFromAgeClass = (ageClass: string | undefined) => {
  let gender = ''
  let age = 0
  if (ageClass) {
    const regexMatch = ageClass.match(/([MWmwfFDH])[^0-9]*([0-9]*)/)
    if (['M', 'H'].includes(regexMatch?.[1]?.toUpperCase() ?? '')) gender = 'M'
    else if (['W', 'F', 'D'].includes(regexMatch?.[1]?.toUpperCase() ?? ''))
      gender = 'W'
    else gender = ''
    age = parseInt(regexMatch?.[2] ?? '0', 10)
  }
  return { age, gender }
}

export const eventResultWithAgeGender = (
  result: EventResult
): EventResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result?.ageClass)
  return { ...result, age, gender } as EventResultWithAgeGender
}

export const leagueResultWithAgeGender = (
  result: LeagueResult
): LeagueResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result?.ageClass)
  return { ...result, age, gender } as LeagueResultWithAgeGender
}
