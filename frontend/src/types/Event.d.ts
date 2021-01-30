interface LeagueEvent {
  id: string
  name: string
  date: string
  website: string
  organiser: string
  moreInformation: string
  league: string

  resultUploaded: boolean
  results: string
  winsplits: string
  routegadget: string
  userSubmittedResults: boolean
  uploadKey?: string

  secondaryLeague?: string
}
