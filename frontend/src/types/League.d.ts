interface LeagueBase {
  name: string
  year: number
  description: string
  moreInformation: string
  coordinator: string
  website: string

  courses: string[] | string
  leagueScoring?: string
  scoringMethod: string
  numberOfCountingEvents: number
  dynamicEventResults: boolean
  clubRestriction?: string

  numberOfEvents?: number
}

interface League extends LeagueBase {
  courses: string[]
}

interface LeagueForm extends LeagueBase {
  courses: string
}
