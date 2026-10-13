import type { AdditionalLeagueCategory } from '~/api-types'

export const additionalLeagueCategoryLocation = (
  league: string,
  { class_name, age_class }: AdditionalLeagueCategory,
): string => {
  const match = /^([<>]?)([MW]?)(\d+)$/.exec(age_class)
  if (!match) return `/leagues/${league}/results/${class_name}`

  const [, direction, gender, age] = match
  const query = new URLSearchParams({
    male: String(gender !== 'W'),
    female: String(gender !== 'M'),
  })
  if (direction !== '<') query.set('minAge', age!)
  if (direction !== '>') query.set('maxAge', age!)

  return `/leagues/${league}/results/${class_name}?${query}`
}
