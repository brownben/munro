export const toSingleString = (string: string | string[]) =>
  Array.isArray(string) ? string[0] : string
