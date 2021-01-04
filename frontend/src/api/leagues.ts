import { getData, postData, putData, deleteData } from './requests'

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
