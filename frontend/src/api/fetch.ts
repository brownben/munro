import { useMessages } from '../store/messages'

export interface TypedResponse<T = any> extends Response {
  json: <P = T>() => Promise<P>
}

interface ServerMessage {
  message: string
}

const Fetch = async <T>(
  location: string,
  options: RequestInit
): Promise<TypedResponse<T>> => {
  if (!import.meta.env.SSR) return fetch(location, options)
  else {
    // Polyfill Fetch for SSR in Node
    // eslint-disable-next-line
    // @ts-ignore-nextline
    const fetch = (await import('node-fetch'))
      ?.default as typeof globalThis.fetch
    const api =
      location[0] !== '/' ? location : 'https://munroleagues.com' + location
    return fetch(api, options)
  }
}

export const sendRequest = <T>(
  apiLocation: string,
  fetchConfig: FetchConfig,
  responseConfig: RequestConfig
): Promise<T | undefined> =>
  Fetch<T>(apiLocation, fetchConfig)
    .then(async (response: TypedResponse<T>) => {
      if (!response.ok) {
        let message
        try {
          message = ((await response.json()) as ServerMessage)?.message
        } catch {
          message = ''
        }

        throw Error(message ?? response.statusText)
      }
      return response.json()
    })
    .then((data: T) => showSuccessMessage<T>(data, responseConfig))
    .catch((error: Error) => handleError(error, responseConfig))

export const sendRequestText = (
  apiLocation: string,
  fetchConfig: FetchConfig,
  responseConfig: RequestConfig
): Promise<string | undefined> =>
  Fetch<string>(apiLocation, fetchConfig)
    .then((response: TypedResponse<string>) => {
      if (!response.ok) throw Error(response.statusText)
      return response.text()
    })
    .catch((error: Error) => handleError(error, responseConfig))

const addMessage = (text: string) => {
  if (!import.meta.env.SSR) {
    // Messages not made on server
    const messages = useMessages()
    messages.create(text)
  }
}

const showSuccessMessage = <T>(data: T, config: RequestConfig): T => {
  if (config.customSuccessMessage) addMessage(config.customSuccessMessage)

  return data
}

const handleError = (error: Error, config: RequestConfig): undefined => {
  if (config.useServerErrorMessage) addMessage(error.message)
  if (config.customErrorMessage) addMessage(config.customErrorMessage)
  if (config.customErrorHandler) throw error

  return
}
