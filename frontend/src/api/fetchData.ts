import store from '/@/store'

interface TypedResponse<T = any> extends Response {
  json: <P = T>() => Promise<P>
}

class FetchDataConfig {
  public apiLocation = ''
  public requestMethod?: string = 'GET'

  public useServerErrorMessage?: boolean = true
  public customErrorMessage?: string = ''

  public useServerSuccessMessage?: boolean = true
  public customSuccessMessage?: string = ''

  public customErrorHandler?: boolean = false
}

const myFetch = <T>(
  location: string,
  options: object
): Promise<TypedResponse<T>> => fetch(location, options)

const checkFailedRequest = (response: TypedResponse): TypedResponse => {
  if (!response.ok) throw Error(response.statusText)
  else return response
}
const parseRequest = (response: TypedResponse) => response.json()

const addMessage = (text: string) => store.dispatch('createMessage', text)

export const getData = <T>(config: FetchDataConfig): Promise<T> =>
  myFetch<T>(config.apiLocation, { method: 'GET' })
    .then(checkFailedRequest)
    .then(parseRequest)
    .then((data) => {
      if (config.useServerSuccessMessage) addMessage(data.message)
      else if (config.customSuccessMessage)
        addMessage(config.customSuccessMessage)
      return data
    })
    .catch((error: Error) => {
      if (config.useServerErrorMessage) addMessage(error.message)
      else if (config.customErrorMessage) addMessage(config.customErrorMessage)

      if (config.customErrorHandler) throw error
      return false
    })
