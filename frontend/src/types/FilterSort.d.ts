declare enum SortablePropertiesEvent {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  time = 'time',
  points = 'points',
}

declare enum SortablePropertiesLeague {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  totalPoints = 'totalPoints',
  points = 'points',
  course = 'course',
}

declare enum SortablePropertiesCompetitor {
  name = 'name',
  ageClass = 'ageClass',
  club = 'club',
  id = 'id',
  course = 'course',
}

interface FilterPreferences {
  name: string
  club: string
  minAge: number
  maxAge: number
  male: boolean
  female: boolean
}

interface SortPreferencesEvent {
  ascending: boolean
  by: SortablePropertiesEvent
}

interface SortPreferencesLeague {
  ascending: boolean
  by: SortablePropertiesLeague
  event?: number
}

interface SortPreferencesCompetitor {
  ascending: boolean
  by: SortablePropertiesCompetitor
}
