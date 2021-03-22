interface RequestConfig {
  apiLocation: string
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
