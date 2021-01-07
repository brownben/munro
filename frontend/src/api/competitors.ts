import { getData, postData, putData } from './requests'

export const getCompetitor = (id: string): Promise<Competitor | null> =>
  getData<Competitor | null>({
    apiLocation: `/api/competitors/${id}`,
    customErrorMessage: 'Problem Fetching Competitor Details',
  })

export const getCompetitors = (): Promise<Competitor[] | null> =>
  getData<Competitor[]>({
    apiLocation: '/api/competitors',
    customErrorMessage: 'Problem Fetching Competitors',
  })

export const getLeagueCompetitors = (
  league: string
): Promise<Competitor[] | null> =>
  getData<Competitor[]>({
    apiLocation: `/api/leagues/${league}/competitors`,
    customErrorMessage: 'Problem Fetching Competitors',
  })

export const createCompetitor = (
  data: Competitor
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/competitors`,
    data,
    customErrorMessage: 'Problem Creating Competitor',
    customSuccessMessage: `Competitor \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateCompetitor = (
  data: Competitor
): Promise<ServerMessage | null> =>
  putData<ServerMessage>({
    apiLocation: `/api/competitors/${data.id}`,
    data,
    customErrorMessage: 'Problem Updating Competitor',
    customSuccessMessage: `Competitor \`${data.name}\` Updated`,
    customErrorHandler: true,
  })

export const mergeCompetitors = (
  data: MergeCompetitors
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/competitors/merge`,
    data,
    customErrorMessage: 'Problem Merging Competitor',
    customSuccessMessage: `Competitors Merged`,
    customErrorHandler: true,
  })
