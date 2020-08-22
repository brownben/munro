export interface RequestConfig {
  apiLocation: string
  data?: object
  useServerErrorMessage?: boolean
  customErrorMessage?: string
  customSuccessMessage?: string
  customErrorHandler?: boolean
}

export interface FetchConfig {
  method: string
  headers?: {
    'Content-Type'?: string
  }
  body?: string
}

export interface ServerMessage {
  message: string
}
