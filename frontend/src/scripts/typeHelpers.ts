export const toSingleString = (
  string: string | string[] | undefined
): string => {
  if (Array.isArray(string)) return string?.[0] ?? ''
  else if (string) return string
  else return ''
}
