import { getData } from './requests'

export interface EventResult {
  id: number
  time: number
  position: number | ''
  points: number
  incomplete: boolean
  type: string | null
  event: string
  name: string
  ageClass: string
  club: string
  course: string
}

export interface LeagueResult {
  id: number
  name: string
  ageClass: string
  club: string

  totalPoints: number
  position: number | ''

  points: EventPoints[]
}

interface EventPoints {
  score: number | ''
  counting: boolean
  type: string
}

export interface EventResultWithAgeGender extends EventResult {
  age: number
  gender: string
}

export interface LeagueResultWithAgeGender extends LeagueResult {
  age: number
  gender: string
}

export const getEventResults = (
  eventId: string
): Promise<EventResult[] | null> =>
  getData<EventResult[]>({
    apiLocation: `/api/events/${eventId}/results`,
    customErrorMessage: 'Problem Fetching Results',
  })

export const getLeagueResults = (
  league: string,
  course: string
): Promise<LeagueResult[] | null> =>
  getData<LeagueResult[]>({
    apiLocation: `/api/leagues/${league}/results/${course}`,
    customErrorMessage: 'Problem Fetching Results',
  })

export const getCompetitorResults = (
  competitor: string
): Promise<EventResult[] | null> =>
  getData<EventResult[]>({
    apiLocation: `/api/competitors/${competitor}/results`,
    customErrorMessage: 'Problem Fetching Results',
  })
