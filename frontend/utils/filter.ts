import type {
  EventResultWithAgeGender,
  LeagueResultWithAgeGender,
  CompetitorWithAgeGender,
} from './ageClass'

export interface Filters {
  name: string
  club: string
  minAge: string
  maxAge: string
  male: boolean
  female: boolean
}

const resultMatchesGender = (
  result:
    | EventResultWithAgeGender
    | LeagueResultWithAgeGender
    | CompetitorWithAgeGender,
  filterPreferences: Filters,
): boolean =>
  (filterPreferences.male && filterPreferences.female) ||
  (filterPreferences.male && result.gender === 'M') ||
  (filterPreferences.female && result.gender === 'W') ||
  (!filterPreferences.female && !filterPreferences.male && result.gender === '')

const resultMatchesAge = (
  result:
    | EventResultWithAgeGender
    | LeagueResultWithAgeGender
    | CompetitorWithAgeGender,
  filterPreferences: Filters,
): boolean => {
  const maxAge = Number(filterPreferences.maxAge)
  const minAge = Number(filterPreferences.minAge)
  return (
    (maxAge >= 100 && minAge === 0) ||
    (minAge <= result.age && result.age <= maxAge)
  )
}

const newRegex = (pattern: string): RegExp => {
  try {
    return new RegExp(pattern, 'i')
  } catch {
    return /.*/i
  }
}

export const matchingResults = (filterPreferences: Filters) => {
  const nameRegex = newRegex(filterPreferences.name)
  const clubRegex = newRegex(filterPreferences.club)
  return (
    result:
      | EventResultWithAgeGender
      | LeagueResultWithAgeGender
      | CompetitorWithAgeGender,
  ): boolean | null =>
    result.name.match(nameRegex) &&
    result.club.match(clubRegex) &&
    resultMatchesGender(result, filterPreferences) &&
    resultMatchesAge(result, filterPreferences)
}
