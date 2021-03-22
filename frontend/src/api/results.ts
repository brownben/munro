import { getData, postData, putData } from './requests'

export const getResults = (): Promise<EventResult[] | null> =>
  getData<EventResult[]>({
    apiLocation: `/api/results/`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

export const getEventResults = (
  eventId: string
): Promise<EventResult[] | null> =>
  getData<EventResult[]>({
    apiLocation: `/api/events/${eventId}/results`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

export const getLeagueResults = (
  league: string,
  course: string
): Promise<LeagueResult[] | null> =>
  getData<LeagueResult[]>({
    apiLocation: `/api/leagues/${league}/results/${course}`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

export const getCompetitorResults = (
  competitor: string
): Promise<EventResult[] | null> =>
  getData<EventResult[]>({
    apiLocation: `/api/competitors/${competitor}/results`,
    customErrorMessage: 'Problem Fetching Results',
    noToken: true,
  })

export const hideResult = (
  id: number,
  hide: boolean
): Promise<ServerMessage | null> =>
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
): Promise<ServerMessage | null> =>
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
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/results/manual`,
    data,
    customErrorMessage: 'Problem Creating Result',
    customSuccessMessage: `Result Created`,
    customErrorHandler: true,
  })

export const transferResult = (
  data: TransferResult
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/results/transfer`,
    data,
    customErrorMessage: 'Problem Transfering Result',
    customSuccessMessage: `Result Transfered`,
    customErrorHandler: true,
  })
