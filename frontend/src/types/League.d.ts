interface LeagueBase {
  name: string
  year: number
  description: string
  moreInformation: string
  coordinator: string
  website: string

  subLeagueOf?: string
  courses: string[] | string
  leagueScoring: string
  scoringMethod: string
  numberOfCountingEvents: number
  dynamicEventResults: boolean
  clubRestriction?: string
  additionalSettings?: string

  numberOfEvents?: number
}

interface League extends LeagueBase {
  courses: string[]
}

interface LeagueForm extends LeagueBase {
  courses: string
}
