import { getData, postData, putData, deleteData } from './requests'

export const getEvent = (id: string): Promise<Event | null> =>
  getData<Event>({
    apiLocation: `/api/events/${id}`,
    customErrorMessage: 'Problem Fetching Event Details',
  })

export const getEvents = (): Promise<Event[] | null> =>
  getData<Event[]>({
    apiLocation: '/api/events',
    customErrorMessage: 'Problem Fetching Events',
  })

export const getLeagueEvents = (
  league: string,
  uploadKey?: boolean
): Promise<Event[] | null> => {
  const apiLocation = uploadKey
    ? `/api/leagues/${league}/events/uploadKey`
    : `/api/leagues/${league}/events`

  return getData<Event[]>({
    apiLocation,
    customErrorMessage: 'Problem Fetching Events',
  })
}

export const getLatestResults = (): Promise<Event[] | null> =>
  getData<Event[]>({
    apiLocation: '/api/events/latest-results',
    customErrorMessage: 'Problem Fetching Events',
  })

export const createEvent = (data: Event): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/events`,
    data,
    customErrorMessage: 'Problem Creating Event',
    customSuccessMessage: `Event \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const updateEvent = (data: Event): Promise<ServerMessage | null> =>
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
): Promise<ServerMessage | null> =>
  deleteData<ServerMessage>({
    apiLocation: `/api/events/${id}`,
    customErrorMessage: 'Problem Deleting Event',
    customSuccessMessage: `Event \`${name}\` Deleted`,
  })
