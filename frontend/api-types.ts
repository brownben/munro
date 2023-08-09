export interface Event {
  id: string
  name: string
  date: string

  competitor_pool: string

  organiser: string
  website: string
  more_information: string
  part_of?: string
  results_links: Record<string, string>

  results_uploaded: boolean
  results_uploaded_time?: string

  allow_user_submitted_results: boolean
  upload_key?: string

  group?: string
}

export interface Message {
  detail: string
}

export interface LeagueClass {
  name: string
  league: string

  standard_course?: string
  age_class_filter: string
  club_filter: string
  number_of_counting_events?: number
}

export interface LeagueGroup {
  name: string
  league: string

  min: number
  max: number
}

export interface League {
  name: string
  tagline: string
  year: number
  coordinator: string
  website: string
  more_information: string

  visible: boolean
  scoring_method: string
  number_of_counting_events: number
  competitor_pool: string
}

export interface LeagueOverview extends League {
  events: Event[]
  classes: LeagueClass[]
  groups: LeagueGroup[]
}

export interface LeagueEvent {
  id: number

  event: string
  league: string

  compulsory: boolean
  league_group?: string
  overridden_scoring_method?: string

  expected_courses?: Record<string, string>

  event_name?: string
}

export interface LeagueResultScore {
  event: string
  score: number
  counting: number
  type: string
}

export interface LeagueResult {
  id: number

  name: string
  club: string
  age_class: string

  total_points: number
  position: number

  points: (LeagueResultScore | null)[]
}

export interface LeagueResultsOverview {
  league: string
  class_name: string
  classes: string[]
  results: LeagueResult[]
  events: LeagueEvent[]
}

export interface EventResult {
  id: number
  name: string
  club: string
  age_class: string
  time: number
  course: string
  incomplete: boolean
  type: string
  competitor: number
  position?: number
  event: string
  visible: boolean
}

export interface EventResults {
  id?: string
  name: string
  league: string

  date?: string
  organiser?: string
  website?: string
  results_links: Record<string, string>

  results: EventResult[]
}

export interface EventResultWithEventName extends EventResult {
  event_name: string
}

export interface Competitor {
  id: number
  name: string
  age_class: string
  club: string
  competitor_pool: string
}

export interface CompetitorOverview extends Competitor {
  results: EventResultWithEventName[]
  league: string
}

export interface Search {
  leagues: League[]
  events: Event[]
  competitors: Competitor[]
}

export interface Home {
  leagues: number
  events: number
  results: number
  latestResults: Event[]
}

/* --- Types for MapRun Results API --- */

interface MapRunResult {
  Id: string
  Surname: string
  Firstname: string
  Gender: string
  YearOfBirth: string
  TrackStartDateTimeUTC: string
  StartPunchTimeLocal: string
  FinishPunchTimeLocal: string
  TotalTimehhmmss: string
  TotalTimeSecs: number
  Classifier: string
  ClubName: string
  GrossScore: number
  NetScore: number
  MapRunVersion: string
  Distance: number
  Pacemmss: string
  PaceMins: number
  punchControlIds: string[]
  punchTimeAfterStartSecs: number[]
}

interface MapRunResultWithAddedCourse extends MapRunResult {
  course: string
}

export interface MapRunResultsAPI {
  errorFlag: boolean
  statusMessage: string
  warningFlag: boolean
  warningMessage: string
  results: MapRunResultWithAddedCourse[]
}
