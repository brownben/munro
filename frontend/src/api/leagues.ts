import { getData, postData, putData, deleteData } from './requests'

export const getLeague = (name: string): Promise<League | null> =>
  getData<League | null>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Fetching League Details',
    noToken: true,
  })

export const getLeagues = (): Promise<League[] | null> =>
  getData<League[]>({
    apiLocation: '/api/leagues',
    customErrorMessage: 'Problem Fetching Leagues',
    noToken: true,
  })

export const createLeague = (data: League): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/leagues`,
    data,
    customErrorMessage: 'Problem Creating League',
    customSuccessMessage: `League \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateLeague = (data: League): Promise<ServerMessage | null> =>
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
