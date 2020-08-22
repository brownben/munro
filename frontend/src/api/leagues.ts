import { getData, deleteData } from './requests'
import { ServerMessage } from './RequestConfigs'

export interface League {
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

export const getLeague = (name: string): Promise<League | null> =>
  getData<League | null>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Fetching League Details',
  })

export const getLeagues = (): Promise<League[] | null> =>
  getData<League[]>({
    apiLocation: '/api/leagues',
    customErrorMessage: 'Problem Fetching Leagues',
  })

export const deleteLeague = (name: string): Promise<ServerMessage | null> =>
  deleteData<ServerMessage>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Deleting League',
    customErrorHandler: true,
  })
