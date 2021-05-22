import { computed } from 'vue'
import { LocationQueryValue } from 'vue-router'

export const toSingleString = (
  string: string | string[] | undefined | null | LocationQueryValue[]
): string => {
  if (Array.isArray(string)) return string?.[0] ?? ''
  else if (string) return string
  else return ''
}

export const asyncComputed = async <T>(x: () => T) => computed(x)
