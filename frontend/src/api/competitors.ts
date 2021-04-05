import { getData, postData, putData } from './requests'
import { useData, useDataList } from './useData'

const getCompetitor = (id: string): Promise<Competitor | undefined> =>
  getData<Competitor | undefined>({
    apiLocation: `/api/competitors/${id}`,
    customErrorMessage: 'Problem Fetching Competitor Details',
    noToken: true,
  })

const getCompetitors = (): Promise<Competitor[] | undefined> =>
  getData<Competitor[]>({
    apiLocation: '/api/competitors',
    customErrorMessage: 'Problem Fetching Competitors',
    noToken: true,
  })

const getLeagueCompetitors = (
  league: string
): Promise<Competitor[] | undefined> =>
  getData<Competitor[]>({
    apiLocation: `/api/leagues/${league}/competitors`,
    customErrorMessage: 'Problem Fetching Competitors',
    noToken: true,
  })

export const useCompetitor = useData<Competitor, typeof getCompetitor>(
  getCompetitor
)
export const useCompetitors = useDataList<Competitor, typeof getCompetitors>(
  getCompetitors
)
export const useLeagueCompetitors = useDataList<
  Competitor,
  typeof getLeagueCompetitors
>(getLeagueCompetitors)

export const createCompetitor = (
  data: Competitor
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/competitors`,
    data,
    customErrorMessage: 'Problem Creating Competitor',
    customSuccessMessage: `Competitor \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateCompetitor = (
  data: Competitor
): Promise<ServerMessage | undefined> =>
  putData<ServerMessage>({
    apiLocation: `/api/competitors/${data.id}`,
    data,
    customErrorMessage: 'Problem Updating Competitor',
    customSuccessMessage: `Competitor \`${data.name}\` Updated`,
    customErrorHandler: true,
  })

export const mergeCompetitors = (
  data: MergeCompetitors
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/competitors/merge`,
    data,
    customErrorMessage: 'Problem Merging Competitor',
    customSuccessMessage: `Competitors Merged`,
    customErrorHandler: true,
  })
