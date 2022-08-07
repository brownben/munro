import type { Competitor } from '~~/api-types'

export const competitorToText = (competitor: Competitor) => {
  if (competitor.club && competitor.age_class)
    return `${competitor.name} (${competitor.age_class}, ${competitor.club}) [${competitor.id}]`
  else if (competitor.club)
    return `${competitor.name} (${competitor.club}) [${competitor.id}]`
  else if (competitor.age_class)
    return `${competitor.name} (${competitor.age_class}) [${competitor.id}]`
  else return `${competitor.name} [${competitor.id}]`
}
