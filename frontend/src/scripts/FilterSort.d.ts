export interface FilterPreferences {
  name: string
  club: string
  minAge: number
  maxAge: number
  male: boolean
  female: boolean
}

export interface SortPreferencesEvent {
  ascending: boolean
  by: SortablePropetiesEvent
}

export interface SortPreferencesLeague {
  ascending: boolean
  by: SortablePropetiesLeague
  event?: number
}

export enum SortablePropetiesEvent {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  time = 'time',
  points = 'points',
}

export enum SortablePropetiesLeague {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  totalPoints = 'totalPoints',
  points = 'points',
}
