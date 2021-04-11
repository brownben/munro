import { sendRequest, sendRequestText } from './fetch'
import { useAuthentication } from '../store/authentication'

export const getData = <T>(config: RequestConfig): Promise<T | undefined> => {
  const headers: HeadersInit = {}
  const auth = useAuthentication()

  if (!config?.noToken) headers.Authorization = `Bearer ${auth.userToken}`

  return sendRequest<T>(config.apiLocation, { method: 'GET', headers }, config)
}

export const getText = (config: RequestConfig): Promise<string | undefined> =>
  sendRequestText(config.apiLocation, { method: 'GET' }, config)

export const postData = <T>(config: RequestConfig): Promise<T | undefined> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  const auth = useAuthentication()

  if (!config?.noToken) headers.Authorization = `Bearer ${auth.userToken}`

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
  const auth = useAuthentication()

  if (!config.noToken) headers.Authorization = `Bearer ${auth.userToken}`

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
  const auth = useAuthentication()

  if (!config.noToken) headers.Authorization = `Bearer ${auth.userToken}`

  return sendRequest<T>(
    config.apiLocation,
    { method: 'DELETE', headers },
    config
  )
}
