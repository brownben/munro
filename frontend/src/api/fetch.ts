import store from '/@/store/index'
import { RequestConfig, FetchConfig } from './RequestConfigs'

export interface TypedResponse<T = any> extends Response {
  json: <P = T>() => Promise<P>
}

const Fetch = <T>(
  location: string,
  options: object
): Promise<TypedResponse<T>> => window.fetch(location, options)

export const sendRequest = <T>(
  apiLocation: string,
  fetchConfig: FetchConfig,
  responseConfig: RequestConfig
): Promise<T | null> =>
  Fetch<T>(apiLocation, fetchConfig)
    .then((response: TypedResponse<T>) => {
      if (!response.ok) throw Error(response.statusText)
      return response.json()
    })
    .then((data: T) => showSuccessMessage<T>(data, responseConfig))
    .catch((error: Error) => handleError(error, responseConfig))

const addMessage = (text: string) => store.dispatch('createMessage', text)

const showSuccessMessage = <T>(data: T, config: RequestConfig): T => {
  if (config.customSuccessMessage) addMessage(config.customSuccessMessage)

  return data
}

const handleError = (error: Error, config: RequestConfig): null => {
  if (config.useServerErrorMessage) addMessage(error.message)
  if (config.customErrorMessage) addMessage(config.customErrorMessage)
  if (config.customErrorHandler) throw error

  return null
}
