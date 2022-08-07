import { EventResult, LeagueResult, Competitor } from '~/api-types'

type Gender = 'M' | 'W' | ''

export interface EventResultWithAgeGender extends EventResult {
  age: number
  gender: Gender
}

export interface LeagueResultWithAgeGender extends LeagueResult {
  age: number
  gender: Gender
}

export interface CompetitorWithAgeGender extends Competitor {
  age: number
  gender: Gender
}

const femaleIdentifyingCharacters = ['W', 'F', 'D']
const maleIdentifyingCharacters = ['M', 'H']

const getGender = (ageClass?: string): Gender => {
  const firstLetter = ageClass?.toUpperCase().match(/[MHWFD]|$/)?.[0] ?? ''
  if (femaleIdentifyingCharacters.includes(firstLetter)) return 'W'
  else if (maleIdentifyingCharacters.includes(firstLetter)) return 'M'
  else return ''
}
export const getAgeGenderFromAgeClass = (
  ageClass?: string
): { age: number; gender: Gender } => {
  const gender = getGender(ageClass)
  const age = Number(ageClass?.match(/\d+|$/)?.[0] || 21)

  return { age, gender }
}

export const eventResultWithAgeGender = (
  result: EventResult
): EventResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result.age_class)
  return { ...result, age, gender } as EventResultWithAgeGender
}

export const leagueResultWithAgeGender = (
  result: LeagueResult
): LeagueResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result?.age_class)
  return { ...result, age, gender } as LeagueResultWithAgeGender
}

export const competitorWithAgeGender = (
  competitor: Competitor
): CompetitorWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(competitor?.age_class)
  return { ...competitor, age, gender } as CompetitorWithAgeGender
}
