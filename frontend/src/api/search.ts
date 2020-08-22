import { getData } from './requests'

import { League } from './leagues'
import { Event } from './events'
import { Competitor } from './competitors'

export interface SearchResult {
  leagues: League[]
  events: Event[]
  competitors: Competitor[]
}

export const getQuery = (query: string): Promise<SearchResult | null> =>
  getData<SearchResult | null>({
    apiLocation: `/api/search?query=${query}`,
    customErrorMessage: 'Problem Fetching Data',
  })
