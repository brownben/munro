import { useUser, useLoggedIn } from './auth'

const base = 'https://munroleagues.com/api/'

export const useData = <Type>(location: string) =>
  useFetch<Type>(`${base}${location}`, { key: location })

export const useRestrictedData = <Type>(
  location: string,
): ReturnType<typeof useData<Type>> =>
  useFetch<Type>(`${base}${location}`, {
    key: location,
    headers: { Authorization: `bearer ${useUser().value?.idToken}` },
  })

export const useRestrictedDataIfLoggedIn = <Type>(
  location: string,
  authLocation: string,
): ReturnType<typeof useData<Type>> => {
  const loggedIn = useLoggedIn()
  if (loggedIn.value) return useRestrictedData<Type>(authLocation)
  else return useData<Type>(location)
}

export const useGet = <T>(location: string) => $fetch<T>(`${base}${location}`)
export const usePost = <T>(location: string, data: Record<string, any>) => {
  return $fetch<T>(`${base}${location}`, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${useUser().value?.idToken}`,
    },
  })
}
export const useDelete = <T>(location: string) =>
  $fetch<T>(`${base}${location}`, {
    method: 'DELETE',
    headers: { Authorization: `bearer ${useUser().value?.idToken}` },
  })
export const usePut = <T>(location: string, data: Record<string, any>) =>
  $fetch<T>(`${base}${location}`, {
    method: 'PUT',
    body: data,

    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${useUser().value?.idToken}`,
    },
  })
export const usePatch = <T>(location: string, data: Record<string, any>) =>
  $fetch<T>(`${base}${location}`, {
    method: 'PATCH',
    body: data,

    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${useUser().value?.idToken}`,
    },
  })
