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
