import {
  EventResultWithAgeGender,
  LeagueResultWithAgeGender,
} from '/@/api/results'
import {
  SortPreferencesEvent,
  SortPreferencesLeague,
  SortPreferencesCompetitor,
  SortablePropetiesLeague,
} from './FilterSort.d'
import { Competitor } from '/@/api/competitors'

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

export const sortCompetitors = (sortPreferences: SortPreferencesCompetitor) => (
  a: Competitor,
  b: Competitor
): number =>
  sortComparison(
    sortPreferences.ascending,
    a[sortPreferences.by],
    b[sortPreferences.by]
  )

export const sortLeagueResults = (sortPreferences: SortPreferencesLeague) => {
  if (sortPreferences.by === SortablePropetiesLeague.points)
    return sortLeagueResultsByPoints(sortPreferences)
  else return sortLeagueResultsByProperty(sortPreferences)
}

export const sortEventResults = (sortPreferences: SortPreferencesEvent) =>
  sortEventResultsByProperty(sortPreferences)
