import { getData } from './requests'

export const getQuery = (query: string): Promise<SearchResult | null> =>
  getData<SearchResult | null>({
    apiLocation: `/api/search/${query}`,
    customErrorMessage: 'Problem Fetching Data',
  })
