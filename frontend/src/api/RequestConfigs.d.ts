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
  data?: object
}

export interface ServerMessage {
  message: string
}
