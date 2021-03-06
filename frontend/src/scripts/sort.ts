type SortValue = string | number | null | undefined | (EventPoints | null)[]
const sortComparison = (
  ascending: boolean,
  a: SortValue,
  b: SortValue
): 0 | 1 | -1 => {
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

export const sortLeagueResults = (
  sortPreferences: SortPreferencesLeague
): ReturnType<
  typeof sortLeagueResultsByPoints | typeof sortLeagueResultsByProperty
> => {
  if (sortPreferences.by === SortablePropertiesLeague.points)
    return sortLeagueResultsByPoints(sortPreferences)
  else return sortLeagueResultsByProperty(sortPreferences)
}

export const sortEventResults = (
  sortPreferences: SortPreferencesEvent
): ReturnType<typeof sortEventResultsByProperty> =>
  sortEventResultsByProperty(sortPreferences)

export enum SortablePropertiesEvent {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  time = 'time',
  points = 'points',
}

export enum SortablePropertiesLeague {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  totalPoints = 'totalPoints',
  points = 'points',
  course = 'course',
}

export enum SortablePropertiesCompetitor {
  name = 'name',
  ageClass = 'ageClass',
  club = 'club',
  id = 'id',
  course = 'course',
}
