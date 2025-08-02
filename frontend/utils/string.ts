import type { LocationQueryValue } from 'vue-router'

export const queryToString = (
  value:
    | string
    | string[]
    | LocationQueryValue
    | LocationQueryValue[]
    | undefined,
): string => {
  if (value === undefined || value === null) return ''
  else if (Array.isArray(value)) return String(value[0])
  else return String(value)
}
