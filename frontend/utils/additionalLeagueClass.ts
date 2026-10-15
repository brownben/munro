import type { AdditionalLeagueCategory } from '~/api-types'

export const additionalLeagueCategoryLocation = (
  league: string,
  { class_name, gender, min_age, max_age }: AdditionalLeagueCategory,
): string => {
  const query = new URLSearchParams({
    male: String(gender !== 'W'),
    female: String(gender !== 'M'),
  })
  if (min_age !== null) query.set('minAge', String(min_age))
  if (max_age !== null) query.set('maxAge', String(max_age))

  return `/leagues/${league}/results/${class_name}?${query}`
}
