import { getData, deleteData } from './requests'

export interface Competitor {
  id: number
  name: string
  ageClass: string
  club: string
  course: string
  league: string
}

export const getCompetitor = (name: string): Promise<Competitor | null> =>
  getData<Competitor | null>({
    apiLocation: `/api/competitors/${name}`,
    customErrorMessage: 'Problem Fetching Competitor Details',
  })

export const getCompetitors = (): Promise<Competitor[] | null> =>
  getData<Competitor[]>({
    apiLocation: '/api/competitors',
    customErrorMessage: 'Problem Fetching Competitors',
  })

export const getLeagueCompetitors = (
  league: string
): Promise<Competitor[] | null> =>
  getData<Competitor[]>({
    apiLocation: `/api/leagues/${league}/competitors`,
    customErrorMessage: 'Problem Fetching Competitors',
  })
