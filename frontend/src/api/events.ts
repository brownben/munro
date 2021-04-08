import { getData, postData, putData, deleteData } from './requests'
import { useData, useDataList } from './useData'

const getEvent = (id: string): Promise<LeagueEvent | undefined> =>
  getData<LeagueEvent>({
    apiLocation: `/api/events/${id}`,
    customErrorMessage: 'Problem Fetching Event Details',
    noToken: true,
  })

const getEvents = (): Promise<LeagueEvent[] | undefined> =>
  getData<LeagueEvent[]>({
    apiLocation: '/api/events',
    customErrorMessage: 'Problem Fetching Events',
  })

const getLeagueEvents = (
  league: string,
  uploadKey?: boolean
): Promise<LeagueEvent[] | undefined> => {
  const apiLocation = uploadKey
    ? `/api/leagues/${league}/events/uploadKey`
    : `/api/leagues/${league}/events`

  return getData<LeagueEvent[]>({
    apiLocation,
    customErrorMessage: 'Problem Fetching Events',
  })
}

const getLatestResults = (): Promise<LeagueEvent[] | undefined> =>
  getData<LeagueEvent[]>({
    apiLocation: '/api/events/latest-results',
    customErrorMessage: 'Problem Fetching Events',
  })

export const useEvent = useData<LeagueEvent, typeof getEvent>(getEvent)
export const useEvents = useDataList<LeagueEvent, typeof getEvents>(getEvents)
export const useLeagueEvents = useDataList<LeagueEvent, typeof getLeagueEvents>(
  getLeagueEvents
)
export const useLatestResults = useDataList<
  LeagueEvent,
  typeof getLatestResults
>(getLatestResults)

export const createEvent = (
  data: LeagueEvent
): Promise<ServerMessage | undefined> =>
  postData<ServerMessage>({
    apiLocation: `/api/events/`,
    data,
    customErrorMessage: 'Problem Creating Event',
    customSuccessMessage: `Event \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateEvent = (
  data: LeagueEvent
): Promise<ServerMessage | undefined> =>
  putData<ServerMessage>({
    apiLocation: `/api/events/${data.id}`,
    data,
    customErrorMessage: 'Problem Updating Event',
    customSuccessMessage: `Event \`${data.name}\` Updated`,
    customErrorHandler: true,
  })

export const deleteEvent = (
  id: string,
  name: string
): Promise<ServerMessage | undefined> =>
  deleteData<ServerMessage>({
    apiLocation: `/api/events/${id}`,
    customErrorMessage: 'Problem Deleting Event',
    customSuccessMessage: `Event \`${name}\` Deleted`,
  })
