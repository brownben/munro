interface LeagueBase {
  coordinator: string
  description: string
  dynamicEventResults: boolean
  moreInformation: string
  name: string
  numberOfCountingEvents: number
  numberOfEvents?: number
  scoringMethod: string
  website: string
  year: number
  leagueScoring?: string
  clubRestriction?: string
}

interface League extends LeagueBase {
  courses: string[]
}

interface LeagueForm extends LeagueBase {
  courses: string
  oldName: string
}
