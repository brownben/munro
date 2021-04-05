import { sendRequest, sendRequestText } from './fetch'
import store from '../store'

export const getData = <T>(config: RequestConfig): Promise<T | undefined> => {
  const headers: HeadersInit = {}
  if (!config?.noToken)
    headers.Authorization = `Bearer ${store.getters.userToken}`

  return sendRequest<T>(config.apiLocation, { method: 'GET', headers }, config)
}

export const getText = (config: RequestConfig): Promise<string | undefined> =>
  sendRequestText(config.apiLocation, { method: 'GET' }, config)

export const postData = <T>(config: RequestConfig): Promise<T | undefined> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (!config?.noToken)
    headers.Authorization = `Bearer ${store.getters.userToken}`

  return sendRequest<T>(
    config.apiLocation,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(config.data),
    },
    config
  )
}
export const putData = <T>(config: RequestConfig): Promise<T | undefined> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (!config.noToken)
    headers.Authorization = `Bearer ${store.getters.userToken}`

  return sendRequest<T>(
    config.apiLocation,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(config.data),
    },
    config
  )
}

export const deleteData = <T>(
  config: RequestConfig
): Promise<T | undefined> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (!config.noToken)
    headers.Authorization = `Bearer ${store.getters.userToken}`

  return sendRequest<T>(
    config.apiLocation,
    { method: 'DELETE', headers },
    config
  )
}
