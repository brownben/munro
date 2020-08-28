import { getData, postData, putData, deleteData } from './requests'
import { ServerMessage } from './RequestConfigs'

interface LeagueBase {
  coordinator: string
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

export interface League extends LeagueBase {
  courses: string[]
}

export interface LeagueForm extends LeagueBase {
  courses: string
  oldName: string
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

export const createLeague = (data: LeagueForm): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/leagues`,
    data,
    customErrorMessage: 'Problem Creating League',
    customSuccessMessage: `League \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateLeague = (data: LeagueForm): Promise<ServerMessage | null> =>
  putData<ServerMessage>({
    apiLocation: `/api/leagues/${data.name}`,
    data,
    customErrorMessage: 'Problem Updating League',
    customSuccessMessage: `League \`${data.name}\` Updated`,
    customErrorHandler: true,
  })

export const deleteLeague = (name: string): Promise<ServerMessage | null> =>
  deleteData<ServerMessage>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Deleting League',
    customErrorHandler: true,
  })
