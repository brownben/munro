import { getData, postData, putData, deleteData } from './requests'
import { useData, useDataList } from './useData'

const getLeague = (name: string): Promise<League | undefined> =>
  getData<League | undefined>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Fetching League Details',
    noToken: true,
  })

const getLeagueOverview = (name: string): Promise<LeagueOverview | undefined> =>
  getData<LeagueOverview | undefined>({
    apiLocation: `/api/leagues/${name}/overview`,
    customErrorMessage: 'Problem Fetching League Details',
    noToken: false,
  })

const getLeagues = (): Promise<League[] | undefined> =>
  getData<League[]>({
    apiLocation: '/api/leagues',
    customErrorMessage: 'Problem Fetching Leagues',
    noToken: true,
  })

export const useLeague = useData<League, typeof getLeague>(getLeague)
export const useLeagueOverview =
  useData<LeagueOverview, typeof getLeagueOverview>(getLeagueOverview)

export const useLeagues = useDataList<League, typeof getLeagues>(getLeagues)

export const createLeague = (
  data: League
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/leagues`,
    data,
    customErrorMessage: 'Problem Creating League',
    customSuccessMessage: `League \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateLeague = (
  data: League
): Promise<ServerMessage | undefined> =>
  putData<ServerMessage>({
    apiLocation: `/api/leagues/${data.name}`,
    data,
    customErrorMessage: 'Problem Updating League',
    customSuccessMessage: `League \`${data.name}\` Updated`,
    customErrorHandler: true,
  })

export const deleteLeague = (
  name: string
): Promise<ServerMessage | undefined> =>
  deleteData<ServerMessage>({
    apiLocation: `/api/leagues/${name}`,
    customErrorMessage: 'Problem Deleting League',
    customErrorHandler: true,
  })
