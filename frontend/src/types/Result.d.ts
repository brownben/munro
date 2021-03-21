interface EventResult {
  id: number
  time: number
  position: number | ''
  points: number
  incomplete: boolean
  type: string | null
  event: string
  name: string
  ageClass: string
  club: string
  course: string
  eventName?: string
}

interface LeagueResult {
  id: number
  name: string
  ageClass: string
  club: string
  course?: string

  totalPoints: number
  position: number | ''

  points: (EventPoints | null)[]
}

interface EventPoints {
  score: number | ''
  counting: boolean
  type: string
  event: string
}

interface EventResultWithAgeGender extends EventResult {
  age: number
  gender: string
}

interface LeagueResultWithAgeGender extends LeagueResult {
  age: number
  gender: string
}

interface ManualResult {
  competitor: number
  event: string
  points: number
}

interface TransferResult {
  competitor: number
  result: number
}
