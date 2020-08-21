import { getData } from './fetchData'

interface league {
  coordinator: string
  courses: string[]
  description: string
  dynamicEventResults: boolean
  moreInformation: string
  name: string
  numberOfCountingEvents: number
  numberOfEvents?: number
  scoringMethod: string
  website: string
  year: number
}

export const getLeagues = (): Promise<league[]> =>
  getData<league[]>({
    apiLocation: '/api/leagues',
    useServerErrorMessage: false,
    useServerSuccessMessage: false,
    customErrorMessage: 'Problem Fetching Leagues',
  })

export const getLeague = (name: string): Promise<league> =>
  getData<league>({
    apiLocation: `/api/leagues/${name}`,
    useServerErrorMessage: false,
    useServerSuccessMessage: false,
    customErrorMessage: 'Problem Fetching League Details',
  })
