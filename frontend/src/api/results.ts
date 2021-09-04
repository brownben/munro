import { getData, postData, putData } from './requests'
import { useData, useDataList } from './useData'

const getResults = (): Promise<EventResult[] | undefined> =>
  getData<EventResult[]>({
    apiLocation: `/api/results`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

const getEventResults = (eventId: string): Promise<EventResult[] | undefined> =>
  getData<EventResult[]>({
    apiLocation: `/api/events/${eventId}/results`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

const getLeagueResults = (
  league: string,
  course: string
): Promise<LeagueResults | undefined> =>
  getData<LeagueResults>({
    apiLocation: `/api/leagues/${league}/results/${course}`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

const getCompetitorResults = (
  competitor: string
): Promise<EventResult[] | undefined> =>
  getData<EventResult[]>({
    apiLocation: `/api/competitors/${competitor}/results`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

const getSITimingResults = (
  url: string
): Promise<SITimingResults | undefined> =>
  getData<SITimingResults>({
    apiLocation: `/api/sitiming/${url}`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

export const useResults = useDataList<EventResult, typeof getResults>(
  getResults
)
export const useEventResults = useDataList<EventResult, typeof getEventResults>(
  getEventResults
)
export const useLeagueResults = useData<LeagueResults, typeof getLeagueResults>(
  getLeagueResults
)
export const useCompetitorResults = useDataList<
  EventResult,
  typeof getCompetitorResults
>(getCompetitorResults)
export const useSITimingResults = useData<
  SITimingResults,
  typeof getSITimingResults
>(getSITimingResults)

export const hideResult = (
  id: number,
  hide: boolean
): Promise<ServerMessage | undefined> =>
  putData<ServerMessage>({
    apiLocation: `/api/results/${id}`,
    data: {
      type: hide ? 'hidden' : null,
    },
    customSuccessMessage: hide ? 'Result Hidden' : 'Result Included',
    customErrorMessage: 'Problem Updating Result',
  })

export const incompleteResult = (
  id: number,
  incomplete: boolean
): Promise<ServerMessage | undefined> =>
  putData<ServerMessage>({
    apiLocation: `/api/results/${id}`,
    data: {
      incomplete,
    },
    customSuccessMessage: incomplete
      ? 'Result Marked as Incomplete'
      : 'Result Marked as Complete',
    customErrorMessage: 'Problem Updating Result',
  })

export const createManualResult = (
  data: ManualResult
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/results/manual`,
    data,
    customErrorMessage: 'Problem Creating Result',
    customSuccessMessage: `Result Created`,
    customErrorHandler: true,
  })

export const transferResult = (
  data: TransferResult
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/results/transfer`,
    data,
    customErrorMessage: 'Problem Transfering Result',
    customSuccessMessage: `Result Transfered`,
    customErrorHandler: true,
  })
