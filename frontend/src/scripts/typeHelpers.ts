import { LocationQueryValue } from 'vue-router'

export const toSingleString = (
  string: string | string[] | undefined | LocationQueryValue[]
): string => {
  if (Array.isArray(string)) return string?.[0] ?? ''
  else if (string) return string
  else return ''
}
