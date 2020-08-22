import { sendRequest } from './fetch'
import { RequestConfig } from './RequestConfigs'

export const getData = <T>(config: RequestConfig): Promise<T | null> =>
  sendRequest<T>(config.apiLocation, { method: 'GET' }, config)

export const postData = <T>(config: RequestConfig): Promise<T | null> =>
  sendRequest<T>(
    config.apiLocation,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: config.data,
    },
    config
  )

export const putData = <T>(config: RequestConfig): Promise<T | null> =>
  sendRequest<T>(
    config.apiLocation,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: config.data,
    },
    config
  )

export const deleteData = <T>(config: RequestConfig): Promise<T | null> =>
  sendRequest<T>(config.apiLocation, { method: 'DELETE' }, config)