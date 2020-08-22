import { getData } from './requests'

export interface Event {
  id: string
  name: string
  date: string
  resultUploaded: boolean
  organiser: string
  moreInformation: string
  website: string
  results: string
  winsplits: string
  routegadget: string
  userSubmittedResults: boolean
  league: string
}

export const getEvent = (id: string): Promise<Event | null> =>
  getData<Event>({
    apiLocation: `/api/events/${id}`,
    customErrorMessage: 'Problem Fetching Event Details',
  })

export const getEvents = (): Promise<Event[] | null> =>
  getData<Event[]>({
    apiLocation: '/api/events',
    customErrorMessage: 'Problem Fetching Events',
  })

export const getLeagueEvents = (
  league: string,
  uploadKey?: boolean
): Promise<Event[] | null> => {
  const apiLocation = uploadKey
    ? `/api/leagues/${league}/events/uploadKey`
    : `/api/leagues/${league}/events`

  return getData<Event[]>({
    apiLocation,
    customErrorMessage: 'Problem Fetching Events',
  })
}

export const getLatestResults = (): Promise<Event[] | null> =>
  getData<Event[]>({
    apiLocation: '/api/events/latest-results',
    customErrorMessage: 'Problem Fetching Events',
  })
