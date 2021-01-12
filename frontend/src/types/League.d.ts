interface League {
  name: string
  year: number
  description: string
  moreInformation: string
  coordinator: string
  website: string

  courses: string[]
  leagueScoring?: string
  scoringMethod: string
  numberOfCountingEvents: number
  dynamicEventResults: boolean
  clubRestriction?: string

  numberOfEvents?: number
}

interface LeagueForm extends League {
  courses: string
  oldName: string
}
