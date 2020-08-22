export interface FilterPreferences {
  name: string
  club: string
  minAge: number
  maxAge: number
  male: boolean
  female: boolean
}

export interface SortPreferences {
  ascending: boolean
  by: SortablePropeties
}

export enum SortablePropeties {
  name = 'name',
  age = 'age',
  position = 'position',
  club = 'club',
  time = 'time',
  points = 'points',
}
