import { getData } from './requests'

export interface Result {
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

export interface ResultWithAgeGender extends Result {
  age: number
  gender: string
}

export const getEventResults = (eventId: string): Promise<Result[] | null> =>
  getData<Result[]>({
    apiLocation: `/api/events/${eventId}/results`,
    customErrorMessage: 'Problem Fetching Results',
  })
