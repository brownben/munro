import { getData } from './requests'
import { useData } from './useData'

const getQuery = (query: string): Promise<SearchResult | undefined> =>
  getData<SearchResult | undefined>({
    apiLocation: `/api/search/${query}`,
    customErrorMessage: 'Problem Fetching Data',
    noToken: true,
  })

export const useQuery = useData<SearchResult, typeof getQuery>(getQuery)
