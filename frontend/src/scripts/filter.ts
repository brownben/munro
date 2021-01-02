import { FilterPreferences } from './FilterSort.d'

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

const newRegex = (pattern: string): RegExp => {
  try {
    return new RegExp(pattern, 'i')
  } catch {
    return /.*/i
  }
}

export const filterResults = (
  result: EventResultWithAgeGender | LeagueResultWithAgeGender,
  filterPreferences: FilterPreferences
) =>
  result.name.match(newRegex(filterPreferences.name)) &&
  result.club.match(newRegex(filterPreferences.club)) &&
  resultMatchesGender(result, filterPreferences) &&
  resultMatchesAge(result, filterPreferences)
