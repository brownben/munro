interface RequestConfig {
  apiLocation: string
  data?: object
  useServerErrorMessage?: boolean
  customErrorMessage?: string
  customSuccessMessage?: string
  customErrorHandler?: boolean
}

interface FetchConfig {
  method: string
  headers?: {
    'Content-Type'?: string
  }
  body?: string
}

interface ServerMessage {
  message: string
}
