interface RequestConfig {
  apiLocation: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: object
  useServerErrorMessage?: boolean
  customErrorMessage?: string
  customSuccessMessage?: string
  customErrorHandler?: boolean
  noToken?: boolean
}

type FetchConfig = RequestInit

interface ServerMessage {
  message: string
}
